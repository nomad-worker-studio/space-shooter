#!/bin/bash
# 新しいアプリプロジェクトの初期セットアップ
# 使い方: bash setup.sh

set -e

echo "=== Nomad Worker Studio — Claude 開発キット セットアップ ==="

# git 初期化チェック
if git rev-parse --git-dir > /dev/null 2>&1; then
  echo "✅ git リポジトリ: 既に初期化済み"
else
  echo "📦 git リポジトリを初期化します..."
  git init
  git add .
  git commit -m "initial: project template"
  echo "✅ git リポジトリ: 初期化完了"
fi

echo ""
echo "=== セットアップ完了 ==="
echo ""
echo "次のステップ:"
echo "  1. claude を起動: claude"
echo "  2. チャットで /build-app とアイデアを入力するだけ"
