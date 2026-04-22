const COLS = 11;
const ROWS = 5;
const H_GAP = 48;
const V_GAP = 40;
const STEP = 16;          // 壁到達時の降下量
const DIVE_SPEED = 3.5;   // 体当たり速度
const RETURN_SPEED = 4;   // 隊列復帰速度
const DIVE_INTERVAL = 4000; // 体当たり発生間隔（ms）

export class EnemyManager {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.enemies = [];
    this._direction = 1; // 1: 右, -1: 左
    this._speed = 1;
    this._fireInterval = 1200;
    this._lastFired = 0;
    this._lastDive = 0;
    this._init();
  }

  _init() {
    const offsetX = 40;
    const offsetY = 60;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        this.enemies.push({
          x: offsetX + col * H_GAP,
          y: offsetY + row * V_GAP,
          width: 32,
          height: 24,
          alive: true,
          type: row < 1 ? 'A' : row < 3 ? 'B' : 'C',
          points: row < 1 ? 30 : row < 3 ? 20 : 10,
          // 体当たり用フィールド
          diving: false,
          diveState: null, // 'diving' | 'returning'
          slotX: 0,        // 隊列内のスロット位置（追従更新）
          slotY: 0,
          diveVx: 0,
          diveVy: 0,
        });
      }
    }
  }

  get aliveEnemies() {
    return this.enemies.filter(e => e.alive);
  }

  update(now, playerX, playerY) {
    const alive = this.aliveEnemies;
    if (alive.length === 0) return { shot: null };

    const total = COLS * ROWS;
    const ratio = 1 - alive.length / total;
    const currentSpeed = this._speed + ratio * 3;

    // 隊列内の敵（ダイバーを除く）
    const formation = alive.filter(e => !e.diving);

    // 隊列の移動量を計算
    let formDx = 0, formDy = 0;
    if (formation.length > 0) {
      const leftmost  = Math.min(...formation.map(e => e.x));
      const rightmost = Math.max(...formation.map(e => e.x + e.width));

      if (rightmost >= this.canvasWidth && this._direction === 1) {
        this._direction = -1;
        formDy = STEP;
      } else if (leftmost <= 0 && this._direction === -1) {
        this._direction = 1;
        formDy = STEP;
      } else {
        formDx = currentSpeed * this._direction;
      }
      formation.forEach(e => {
        e.x += formDx;
        e.y += formDy;
      });
    }

    // ダイバーのスロット位置を隊列に追従させる（よけた後に正しい位置へ戻れるよう）
    alive.filter(e => e.diving).forEach(e => {
      e.slotX += formDx;
      e.slotY += formDy;
    });

    // ダイバーの移動更新
    for (const e of alive.filter(e => e.diving)) {
      if (e.diveState === 'diving') {
        e.x += e.diveVx;
        e.y += e.diveVy;
        // 画面下を通過したらよけられたと判定 → 上から隊列に戻る
        if (e.y > this.canvasHeight + 40) {
          e.diveState = 'returning';
          e.x = e.slotX;
          e.y = -e.height - 10;
        }
      } else if (e.diveState === 'returning') {
        const dx = e.slotX - e.x;
        const dy = e.slotY - e.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= RETURN_SPEED) {
          // 隊列スロットに復帰
          e.x = e.slotX;
          e.y = e.slotY;
          e.diving = false;
          e.diveState = null;
        } else {
          e.x += (dx / dist) * RETURN_SPEED;
          e.y += (dy / dist) * RETURN_SPEED;
        }
      }
    }

    // 新しい体当たり開始（隊列にいる敵からランダムに選ぶ）
    if (now - this._lastDive >= DIVE_INTERVAL && formation.length > 0) {
      this._lastDive = now;
      const diver = formation[Math.floor(Math.random() * formation.length)];
      diver.diving = true;
      diver.diveState = 'diving';
      diver.slotX = diver.x;
      diver.slotY = diver.y;
      // プレイヤーの現在位置に向けて速度を設定
      const dx = playerX - (diver.x + diver.width / 2);
      const dy = playerY - diver.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      diver.diveVx = (dx / dist) * DIVE_SPEED;
      diver.diveVy = (dy / dist) * DIVE_SPEED;
    }

    // 敵がランダムに弾を発射
    let shot = null;
    if (now - this._lastFired >= this._fireInterval && alive.length > 0) {
      this._lastFired = now;
      const shooter = alive[Math.floor(Math.random() * alive.length)];
      shot = { x: shooter.x + shooter.width / 2, y: shooter.y + shooter.height };
    }

    return { shot };
  }

  draw(ctx) {
    for (const e of this.enemies) {
      if (!e.alive) continue;
      // ダイバーは色を変えて視認しやすくする
      if (e.type === 'A') {
        ctx.fillStyle = e.diving ? '#ff88ff' : '#ff4444';
      } else if (e.type === 'B') {
        ctx.fillStyle = e.diving ? '#ffee44' : '#ff9800';
      } else {
        ctx.fillStyle = e.diving ? '#ffffff' : '#ffeb3b';
      }
      ctx.fillRect(e.x + 8,  e.y,      16, 8);
      ctx.fillRect(e.x,      e.y + 8,  32, 8);
      ctx.fillRect(e.x + 4,  e.y + 16, 8,  8);
      ctx.fillRect(e.x + 20, e.y + 16, 8,  8);
    }
  }

  // ダイバーは画面外に出ることがあるので除外する
  hasReachedBottom(canvasHeight) {
    return this.aliveEnemies.filter(e => !e.diving).some(e => e.y + e.height >= canvasHeight - 64);
  }
}
