import { InputManager } from './input.js';
import { Player }       from './player.js';
import { EnemyManager } from './enemy.js';
import { BulletManager } from './bullet.js';
import { Renderer }     from './renderer.js';

const CANVAS_W = 528;
const CANVAS_H = 640;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    canvas.width  = CANVAS_W;
    canvas.height = CANVAS_H;

    this.renderer = new Renderer(this.ctx, CANVAS_W, CANVAS_H);
    this.input    = new InputManager();
    this._pendingInvincible = false;

    this._bindRestart();
    this._reset();
    requestAnimationFrame(ts => this._loop(ts));
  }

  _reset() {
    this.player  = new Player(CANVAS_W, CANVAS_H);
    // コナミコードが先行入力されていれば即座に無敵を適用
    if (this._pendingInvincible) {
      this.player.activateInvincible();
      this._pendingInvincible = false;
    }
    this.enemies = new EnemyManager(CANVAS_W, CANVAS_H);
    this.bullets = new BulletManager();
    this.score   = 0;
    this.status  = 'playing'; // 'playing' | 'paused' | 'gameover' | 'clear'
  }

  _bindRestart() {
    // キーボード Enter はゲームオーバー/クリア時のリスタートのみ
    window.addEventListener('keydown', e => {
      if (e.code === 'Enter' && (this.status === 'gameover' || this.status === 'clear')) {
        this._reset();
      }
    });
    window.addEventListener('gamepadconnected', e => {
      console.log(`ゲームパッド接続: ${e.gamepad.id} (mapping: ${e.gamepad.mapping})`);
    });
  }

  _update(now) {
    // ゲームパッドの状態を毎フレーム更新（ボタン押下の瞬間を検出するため）
    this.input.update();

    // コナミコードはどの状態でも受け付ける
    if (this.input.consumeKonami()) {
      if (this.status === 'playing' || this.status === 'paused') {
        this.player.activateInvincible();
      } else {
        // ゲームオーバー/クリア中に入力した場合、次のゲームに持ち越す
        this._pendingInvincible = true;
      }
    }

    // Escape / START ボタンの処理（状態によって動作が変わる）
    if (this.input.isPauseJustPressed()) {
      if (this.status === 'playing') {
        this.status = 'paused';
      } else if (this.status === 'paused') {
        this.status = 'playing';
      } else if (this.status === 'gameover' || this.status === 'clear') {
        // ゲームパッドの START でリスタートも兼ねる
        this._reset();
      }
    }

    if (this.status !== 'playing') return;

    // プレイヤー更新・射撃
    const shot = this.player.update(this.input, now);
    if (shot) this.bullets.addPlayerBullet(shot.x, shot.y);

    // 敵更新・射撃（プレイヤー位置を渡して体当たりの向きを決める）
    const playerCenterX = this.player.x + this.player.width / 2;
    const { shot: enemyShot } = this.enemies.update(now, playerCenterX, this.player.y);
    if (enemyShot) this.bullets.addEnemyBullet(enemyShot.x, enemyShot.y);

    // 弾更新
    this.bullets.update(CANVAS_H);

    // 衝突判定：プレイヤー弾 vs 敵
    for (const b of this.bullets.playerBullets) {
      for (const e of this.enemies.enemies) {
        if (e.alive && BulletManager.hits(b, e)) {
          e.alive = false;
          b.y = -999;
          this.score += e.points;
        }
      }
    }

    // 衝突判定：敵弾 vs プレイヤー（無敵中は無効）
    if (!this.player.invincible) {
      for (const b of this.bullets.enemyBullets) {
        if (BulletManager.hits(b, this.player)) {
          this.status = 'gameover';
          return;
        }
      }
    }

    // 衝突判定：体当たりダイバー vs プレイヤー（無敵中は無効）
    if (!this.player.invincible) {
      for (const e of this.enemies.enemies) {
        if (e.alive && e.diving && e.diveState === 'diving' && BulletManager.hits(e, this.player)) {
          this.status = 'gameover';
          return;
        }
      }
    }

    // 敵が最下段到達（ダイバーは除外）
    if (this.enemies.hasReachedBottom(CANVAS_H)) {
      this.status = 'gameover';
      return;
    }

    // 全敵撃破
    if (this.enemies.aliveEnemies.length === 0) {
      this.status = 'clear';
    }
  }

  _draw() {
    this.renderer.clear();
    this.enemies.draw(this.ctx);
    this.player.draw(this.ctx);
    this.bullets.draw(this.ctx);
    this.renderer.drawHUD(this.score, this.player.invincible);
    if (this.status !== 'playing') {
      this.renderer.drawOverlay(this.status, this.score);
    }
  }

  _loop(now) {
    this._update(now);
    this._draw();
    requestAnimationFrame(ts => this._loop(ts));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  new Game(canvas);
});
