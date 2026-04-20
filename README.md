# Claude 開発キット v1.0

Claude Code（Claude AI）にアイデアを伝えるだけで、
設計→実装→テストまで高品質に自動で進む、自分専用の開発キットです。

---

## 基本的な使い方

```
/build-app
ToDoアプリをElectronで作りたい。タスクの追加・完了・削除ができて、
カテゴリ分けもできるようにしたい。
```

これだけで、Claude がコンセプト→仕様→設計→実装→テストまで自動で進めます。
各フェーズで確認を求められるので、OKか修正指示を出すだけです。

---

## セットアップ

### 1. グローバル設定（初回のみ）

`NomadWorker_Studio-claude/CLAUDE.md` を `~/.claude/CLAUDE.md` にコピーしてください。
すでに CLAUDE.md がある場合は内容をマージしてください。

```bash
cp /c/NomadWorker_Studio-claude/CLAUDE.md "$HOME/.claude/CLAUDE.md"
```

### 2. アプリを作る（一番シンプルな使い方）

1. このテンプレートを新しいフォルダにコピー
2. Claude Code でそのフォルダを開く（`claude` コマンドで起動）
3. アイデアを伝えるだけ：

```
/build-app
学習記録を可視化するWebアプリを作りたい。
毎日の学習内容と時間を記録して、週ごとにグラフで振り返れるようにしたい。
```

4. Claude が自動的にコンセプト → 仕様 → 設計 → 実装 → テストまで進めます
5. 各フェーズで確認を求められるので、OKか修正指示を出すだけ

### 3. 細かくコントロールしたい場合

コンセプトや仕様を自分で書きたい場合は：
1. `docs/concept/CONCEPT.md` にアプリのコンセプトを記入
2. `docs/spec/SPEC.md` に仕様を記入
3. チャットに `/init-project` と入力して実行

---

## ディレクトリ構成

```
project-root/
├── CLAUDE.md                    ← Claude が自動読み込み（全ルール統合済み）
├── README.md                    ← このファイル
│
├── .claude/                     ← Claude Code 専用ディレクトリ
│   ├── settings.json            ← 権限・ツール設定
│   ├── commands/                ← カスタムスラッシュコマンド
│   │   ├── build-app.md         ← `/build-app` で実行
│   │   ├── init-project.md      ← `/init-project` で実行
│   │   ├── plan.md              ← `/plan` で実行
│   │   └── review.md            ← `/review` で実行
│   └── skills/                  ← 専門手順（必要時に参照）
│       ├── ui-design/SKILL.md
│       ├── code-review/SKILL.md
│       ├── codebase-awareness/SKILL.md
│       └── parallel-dev/SKILL.md
│
├── docs/
│   ├── concept/CONCEPT.md       ← アプリのコンセプト（要記入）
│   └── spec/SPEC.md             ← 機能仕様（要記入）
│
└── templates/                   ← 自動生成ドキュメントの雛形
    ├── TASKS_TEMPLATE.md
    └── PROJECT_STATE_TEMPLATE.md
```

---

## ワークフロー一覧

| コマンド | 用途 |
|----------|------|
| `/build-app` | **メイン** — アイデアを伝えるだけで設計→実装→テストまで全自動 |
| `/init-project` | 既存のCONCEPT/SPECからプロジェクト初期化 |
| `/plan` | 特定機能の実装計画を作成（ハルシネーション対策） |
| `/review` | コードレビューを実行 |

---

## よくある問題と対処法

**Q: Claude がルールを無視する**
→ `.agent/rules/` にファイルが正しく配置されているか確認。
→ CLAUDE.md が `~/.claude/` にコピーされているか確認。
→ Claude に「現在のルールを教えて」と入力して確認。

**Q: 日本語で応答しない**
→ `~/.claude/CLAUDE.md` にグローバル設定がコピーされていることを確認。
→ チャットで「日本語で応答してください」と明示的に指示。

**Q: 存在しない関数やファイルを参照する（ハルシネーション）**
→ `codebase-awareness` スキルが配置されているか確認。
→ 実装前に `/plan` で計画を立てさせる。

**Q: スコープが勝手に広がる**
→ CLAUDE.md の「Scope Control」ルールが有効か確認。
→ 明示的に「MVP機能だけ実装して」と指示する。
