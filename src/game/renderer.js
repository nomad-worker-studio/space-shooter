export class Renderer {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  clear() {
    this.ctx.fillStyle = '#0a0a1a';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawHUD(score, invincible = false) {
    const ctx = this.ctx;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`SCORE: ${score}`, 12, 28);

    if (invincible) {
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('★ INVINCIBLE ★', this.width - 160, 28);
    }

    // 区切り線
    ctx.strokeStyle = '#333366';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.lineTo(this.width, 40);
    ctx.stroke();
  }

  drawOverlay(status, score) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.textAlign = 'center';

    if (status === 'paused') {
      ctx.fillStyle = '#00e5ff';
      ctx.font = 'bold 48px monospace';
      ctx.fillText('PAUSED', this.width / 2, this.height / 2 - 60);

      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('コナミコマンドを入力して無敵に！', this.width / 2, this.height / 2 - 10);
      ctx.fillText('↑↑↓↓←→←→BA', this.width / 2, this.height / 2 + 20);

      ctx.fillStyle = '#aaaaaa';
      ctx.font = '14px monospace';
      ctx.fillText('Escape / START で再開', this.width / 2, this.height / 2 + 60);
    } else if (status === 'gameover') {
      ctx.fillStyle = '#ff4444';
      ctx.font = 'bold 48px monospace';
      ctx.fillText('GAME OVER', this.width / 2, this.height / 2 - 40);
    } else if (status === 'clear') {
      ctx.fillStyle = '#00e5ff';
      ctx.font = 'bold 48px monospace';
      ctx.fillText('STAGE CLEAR', this.width / 2, this.height / 2 - 40);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '24px monospace';
    ctx.fillText(`SCORE: ${score}`, this.width / 2, this.height / 2 + 10);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '16px monospace';
    ctx.fillText('Press ENTER or START to restart', this.width / 2, this.height / 2 + 50);

    ctx.textAlign = 'left';
  }
}
