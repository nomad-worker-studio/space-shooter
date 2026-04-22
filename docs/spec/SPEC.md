# App Specification — Space Shooter

## MVP 機能一覧
| # | 機能名 | 説明 | 優先度 |
|---|--------|------|--------|
| 1 | プレイヤー操作 | 左右移動・長押し連射（キーボード＆ゲームパッド） | Must |
| 2 | 敵編隊 | グリッド状に並んだ敵が左右移動しながら徐々に降下 | Must |
| 3 | 弾の衝突判定 | プレイヤー弾が敵に当たると敵を消滅させる | Must |
| 4 | 敵の反撃 | 敵がランダムタイミングで弾を発射 | Must |
| 5 | スコア表示 | 敵撃破でスコア加算、画面上部に常時表示 | Must |
| 6 | ゲームオーバー | 敵弾に被弾 or 敵が最下段到達でゲームオーバー | Must |
| 7 | ゲームクリア | 全敵撃破でクリア表示 | Must |
| 8 | リスタート | ゲームオーバー・クリア後にリスタートできる | Must |

## データモデル
```
Player {
  x: number          // 横位置
  width: number
  speed: number
  fireRate: number   // 連射間隔（ms）
}

Enemy {
  x: number
  y: number
  width: number
  height: number
  alive: boolean
  points: number     // 撃破スコア
}

Bullet {
  x: number
  y: number
  speed: number
  isPlayerBullet: boolean
}

GameState {
  score: number
  status: 'playing' | 'gameover' | 'clear'
  enemies: Enemy[]
  playerBullets: Bullet[]
  enemyBullets: Bullet[]
}
```

## 画面一覧
| 画面名 | 説明 | 主要要素 |
|--------|------|---------|
| ゲーム画面 | メインのプレイ画面 | Canvas、スコア表示、ライフ表示 |
| ゲームオーバー画面 | 被弾 or 敵到達時 | 「GAME OVER」テキスト、スコア、リスタートボタン |
| クリア画面 | 全敵撃破時 | 「STAGE CLEAR」テキスト、スコア、リスタートボタン |

## 技術スタック
- Platform: Web（ブラウザ）
- Language: JavaScript（バニラ、フレームワークなし）
- Rendering: HTML5 Canvas API
- Input: Keyboard Events + Gamepad API
- Storage: なし（スコアはセッション内のみ）
- Build Tool: なし（単一 HTML ファイルで完結）

## ディレクトリ構造
```
src/
├── index.html        ← エントリポイント
├── style.css         ← 画面レイアウトのみ
└── game/
    ├── main.js       ← ゲームループ・初期化
    ├── player.js     ← プレイヤー移動・射撃ロジック
    ├── enemy.js      ← 敵編隊の移動・射撃ロジック
    ├── bullet.js     ← 弾の移動・衝突判定
    ├── input.js      ← キーボード・ゲームパッド入力の統合
    └── renderer.js   ← Canvas 描画処理
```

## 制約事項
- 外部ライブラリ・フレームワークは使用しない（バニラ JS のみ）
- index.html をブラウザで直接開くだけで動作すること
- Canvas サイズは 480×640px 固定
