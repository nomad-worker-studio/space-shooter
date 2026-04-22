# Space Shooter

A browser-based Space Invaders-style shooting game built with vanilla JavaScript and HTML5 Canvas.

🎮 **[Play the game](https://nomad-worker-studio.github.io/space-shooter/)**

## Features

- **3 Stages** — Progressive difficulty with unique enemy formations
- **Boss Battles** — Face challenging boss enemies at the end of each stage
- **Dynamic Gameplay** — Enemy dive attacks and varied firing patterns
- **Konami Code** — Unlock invincibility with the classic cheat code (↑↑↓↓←→←→BA)
- **Gamepad Support** — Play with keyboard or gamepad
- **No Dependencies** — Pure JavaScript, runs directly in any modern browser

## How to Play

### Controls

**Keyboard:**
- `←` / `→` or `A` / `D` — Move left / right
- `Space` — Fire
- `Enter` — Start game

**Gamepad:**
- Left stick / D-pad — Move
- A button — Fire
- START button — Pause

### Objective

- Destroy all enemy formations to advance to the next stage
- Defeat the boss to complete the stage
- Survive 3 stages to win the game
- Avoid enemy fire and dive attacks

### Scoring

- Type A Enemy: 30 points
- Type B Enemy: 20 points
- Type C Enemy: 10 points
- Boss: 500–1200 points (depending on stage)

## Technical Details

- **Framework:** None (Vanilla JavaScript)
- **Rendering:** HTML5 Canvas API
- **Input:** Keyboard Events + Gamepad API
- **Audio:** Web Audio API
- **Size:** Single HTML file (~23 KB)

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/nomad-worker-studio/space-shooter.git
   cd space-shooter
   ```

2. Open in browser:
   ```bash
   # Option 1: Direct file
   open docs/index.html
   
   # Option 2: Local server (if you have Python)
   python3 -m http.server 8000
   # Then visit http://localhost:8000/docs/
   ```

## Project Structure

```
space-shooter/
├── docs/
│   ├── index.html           ← GitHub Pages entry point
│   ├── concept/CONCEPT.md   ← Game concept
│   └── spec/SPEC.md         ← Game specification
└── src/
    ├── index.html           ← Game source (same as docs/index.html)
    └── style.css            ← Minimal styling
```

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- Gamepad API (optional, keyboard always works)

## License

Public domain. Feel free to fork, modify, and share!

## Credits

Built with ❤️ using Claude AI

---

# Space Shooter（日本語）

バニラ JavaScript と HTML5 Canvas で作られた、ブラウザで遊べるスペースインベーダー風シューティングゲーム。

🎮 **[ゲームをプレイする](https://nomad-worker-studio.github.io/space-shooter/)**

## 特徴

- **3つのステージ** — 異なる敵編隊配置で難易度が上昇
- **ボス戦** — 各ステージ終了時にボスと対戦
- **ダイナミックなゲームプレイ** — 敵の急降下攻撃と多彩な射撃パターン
- **コナミコマンド対応** — 古典的なチートコード（↑↑↓↓←→←→BA）で無敵になれる
- **ゲームパッド対応** — キーボードまたはゲームパッドでプレイ可能
- **依存関係なし** — 純粋な JavaScript、モダンブラウザなら直接実行可能

## 遊び方

### 操作方法

**キーボード:**
- `←` / `→` または `A` / `D` — 左右に移動
- `スペースキー` — 射撃
- `エンター` — ゲーム開始

**ゲームパッド:**
- 左スティック / 十字キー — 移動
- A ボタン — 射撃
- START ボタン — ポーズ

### ゲーム目標

- 敵編隊を全て撃破してステージをクリア
- ボスを倒すとステージ完了
- 3つのステージをクリアしたらゲーム勝利
- 敵の弾と急降下攻撃を避ける

### スコア

- A 型敵: 30 ポイント
- B 型敵: 20 ポイント
- C 型敵: 10 ポイント
- ボス: 500～1200 ポイント（ステージによって異なる）

## 技術仕様

- **フレームワーク:** なし（バニラ JavaScript）
- **描画:** HTML5 Canvas API
- **入力:** キーボードイベント + Gamepad API
- **音声:** Web Audio API
- **ファイルサイズ:** 単一 HTML ファイル（約 23 KB）

## ローカルで実行

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/nomad-worker-studio/space-shooter.git
   cd space-shooter
   ```

2. ブラウザで開く:
   ```bash
   # 方法1: ファイルを直接開く
   open docs/index.html
   
   # 方法2: ローカルサーバーで実行（Python がインストール済みの場合）
   python3 -m http.server 8000
   # その後 http://localhost:8000/docs/ にアクセス
   ```

## ディレクトリ構成

```
space-shooter/
├── docs/
│   ├── index.html           ← GitHub Pages のエントリーポイント
│   ├── concept/CONCEPT.md   ← ゲームコンセプト
│   └── spec/SPEC.md         ← ゲーム仕様
└── src/
    ├── index.html           ← ゲームソース（docs/index.html と同じ）
    └── style.css            ← 最小限のスタイリング
```

## ブラウザ互換性

以下をサポートするモダンブラウザなら動作します:
- HTML5 Canvas
- ES6 JavaScript
- Gamepad API（オプション、キーボードは常に動作）

## ライセンス

パブリックドメイン。自由にフォーク、改変、共有してください！

## クレジット

Claude AI を使用して ❤️ で制作しました
