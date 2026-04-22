const KONAMI_KB_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];
const KONAMI_KB_KEYS = new Set(KONAMI_KB_SEQUENCE);

// W3C 標準ゲームパッドマッピング（Xbox/PS などほぼ共通）
const GP = {
  A: 0, B: 1,
  SELECT: 8, START: 9,
  UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15,
};

// コナミコマンドのゲームパッドシーケンス（ボタンインデックス）
const KONAMI_GP_SEQUENCE = [
  GP.UP, GP.UP, GP.DOWN, GP.DOWN,
  GP.LEFT, GP.RIGHT, GP.LEFT, GP.RIGHT,
  GP.B, GP.A,
];
const KONAMI_GP_KEYS = new Set(KONAMI_GP_SEQUENCE);

// キーボードとGamepad APIを統一インターフェースで扱う
export class InputManager {
  constructor() {
    this.keys = {};
    this._konamiKbBuffer = [];
    this._konamiGpBuffer = [];
    this._konamiTriggered = false;
    // ゲームパッドの前フレーム状態（押下の瞬間を検出するため）
    this._prevGpButtons = [];
    this._prevAxes = [0, 0];
    // ポーズ/スタートの押下瞬間フラグ（消費型）
    this._pauseJustPressed = false;
    this._bindKeyboard();
  }

  _bindKeyboard() {
    window.addEventListener('keydown', e => {
      const wasUp = !this.keys[e.code];
      this.keys[e.code] = true;
      if (e.code === 'Space') e.preventDefault();

      // Escape の押下瞬間をポーズとして記録（リピートは無視）
      if (e.code === 'Escape' && wasUp) {
        this._pauseJustPressed = true;
      }

      // コナミシーケンス（キーボード）
      if (KONAMI_KB_KEYS.has(e.code)) {
        this._konamiKbBuffer.push(e.code);
        if (this._konamiKbBuffer.length > KONAMI_KB_SEQUENCE.length) {
          this._konamiKbBuffer.shift();
        }
        if (
          this._konamiKbBuffer.length === KONAMI_KB_SEQUENCE.length &&
          this._konamiKbBuffer.every((k, i) => k === KONAMI_KB_SEQUENCE[i])
        ) {
          this._konamiTriggered = true;
          this._konamiKbBuffer = [];
        }
      }
    });
    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });
  }

  // ゲームパッドの状態を毎フレーム更新する（main.js の _update 先頭で呼ぶ）
  update() {
    const pad = this._getGamepad();
    if (!pad) {
      this._prevGpButtons = [];
      this._prevAxes = [0, 0];
      return;
    }

    const curr = pad.buttons.map(b => b.pressed);
    const axes = [pad.axes[0] ?? 0, pad.axes[1] ?? 0];

    // START ボタンの押下瞬間を検出
    if (curr[GP.START] && !this._prevGpButtons[GP.START]) {
      this._pauseJustPressed = true;
    }

    // D-pad ボタン（標準マッピング: buttons[12-15]）によるコナミ入力
    for (const idx of KONAMI_GP_KEYS) {
      if (curr[idx] && !this._prevGpButtons[idx]) {
        this._pushGpKonami(idx);
      }
    }

    // D-pad がアナログ軸にマップされているゲームパッドへの対応
    // （axes[0]: 左=-1/右=+1、axes[1]: 上=-1/下=+1）
    if (axes[1] < -0.5 && !(this._prevAxes[1] < -0.5)) this._pushGpKonami(GP.UP);
    if (axes[1] >  0.5 && !(this._prevAxes[1] >  0.5)) this._pushGpKonami(GP.DOWN);
    if (axes[0] < -0.5 && !(this._prevAxes[0] < -0.5)) this._pushGpKonami(GP.LEFT);
    if (axes[0] >  0.5 && !(this._prevAxes[0] >  0.5)) this._pushGpKonami(GP.RIGHT);

    this._prevGpButtons = curr;
    this._prevAxes = [...axes];
  }

  _pushGpKonami(btnIdx) {
    this._konamiGpBuffer.push(btnIdx);
    if (this._konamiGpBuffer.length > KONAMI_GP_SEQUENCE.length) {
      this._konamiGpBuffer.shift();
    }
    if (
      this._konamiGpBuffer.length === KONAMI_GP_SEQUENCE.length &&
      this._konamiGpBuffer.every((k, i) => k === KONAMI_GP_SEQUENCE[i])
    ) {
      this._konamiTriggered = true;
      this._konamiGpBuffer = [];
    }
  }

  // コナミ入力を1回消費して返す
  consumeKonami() {
    const triggered = this._konamiTriggered;
    this._konamiTriggered = false;
    return triggered;
  }

  // Escape キーまたはゲームパッド START の押下瞬間を1回消費して返す
  isPauseJustPressed() {
    const v = this._pauseJustPressed;
    this._pauseJustPressed = false;
    return v;
  }

  _getGamepad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const pad of pads) {
      if (pad && pad.connected) return pad;
    }
    return null;
  }

  isLeft() {
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) return true;
    const pad = this._getGamepad();
    if (!pad) return false;
    return pad.axes[0] < -0.3 || pad.buttons[GP.LEFT]?.pressed;
  }

  isRight() {
    if (this.keys['ArrowRight'] || this.keys['KeyD']) return true;
    const pad = this._getGamepad();
    if (!pad) return false;
    return pad.axes[0] > 0.3 || pad.buttons[GP.RIGHT]?.pressed;
  }

  isFire() {
    if (this.keys['Space']) return true;
    const pad = this._getGamepad();
    if (!pad) return false;
    return pad.buttons[GP.A]?.pressed;
  }
}
