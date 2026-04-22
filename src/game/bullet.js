export class BulletManager {
  constructor() {
    this.playerBullets = [];
    this.enemyBullets = [];
  }

  addPlayerBullet(x, y) {
    this.playerBullets.push({ x, y, width: 4, height: 12, speed: 7 });
  }

  addEnemyBullet(x, y) {
    this.enemyBullets.push({ x: x - 2, y, width: 4, height: 10, speed: 4 });
  }

  update(canvasHeight) {
    this.playerBullets = this.playerBullets
      .map(b => ({ ...b, y: b.y - b.speed }))
      .filter(b => b.y + b.height > 0);

    this.enemyBullets = this.enemyBullets
      .map(b => ({ ...b, y: b.y + b.speed }))
      .filter(b => b.y < canvasHeight);
  }

  draw(ctx) {
    ctx.fillStyle = '#00e5ff';
    for (const b of this.playerBullets) {
      ctx.fillRect(b.x - b.width / 2, b.y, b.width, b.height);
    }
    ctx.fillStyle = '#ff4444';
    for (const b of this.enemyBullets) {
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }
  }

  // AABB衝突判定
  static hits(bullet, target) {
    return (
      bullet.x < target.x + target.width  &&
      bullet.x + bullet.width  > target.x &&
      bullet.y < target.y + target.height &&
      bullet.y + bullet.height > target.y
    );
  }
}
