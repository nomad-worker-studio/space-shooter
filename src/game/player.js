export class Player {
  constructor(canvasWidth, canvasHeight) {
    this.width = 40;
    this.height = 24;
    this.x = canvasWidth / 2 - this.width / 2;
    this.y = canvasHeight - 56;
    this.speed = 4;
    this.canvasWidth = canvasWidth;

    this.FIRE_INTERVAL = 180;
    this._lastFired = 0;

    this.invincible = false;
    this._frame = 0;
  }

  // コナミコマンドで無敵化
  activateInvincible() {
    this.invincible = true;
  }

  update(input, now) {
    this._frame++;
    if (input.isLeft())  this.x = Math.max(0, this.x - this.speed);
    if (input.isRight()) this.x = Math.min(this.canvasWidth - this.width, this.x + this.speed);

    if (input.isFire() && now - this._lastFired >= this.FIRE_INTERVAL) {
      this._lastFired = now;
      return { x: this.x + this.width / 2, y: this.y };
    }
    return null;
  }

  draw(ctx) {
    // 無敵中は10フレーム周期で点滅し、金色で描画
    if (this.invincible && this._frame % 10 < 5) return;

    ctx.fillStyle = this.invincible ? '#ffd700' : '#00e5ff';
    ctx.fillRect(this.x + 14, this.y, 12, 16);
    ctx.fillRect(this.x, this.y + 10, 14, 8);
    ctx.fillRect(this.x + 26, this.y + 10, 14, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x + 18, this.y - 6, 4, 8);
  }
}
