# マルチプロジェクト Node.js リポジトリ

このリポジトリには複数の Node.js プロジェクトが含まれています。各プロジェクトは独立して動作しますが、共通の開発環境を共有します。

## プロジェクト一覧

- **node-app**: 基本的な Node.js アプリケーション
- **mini_board**: ミニ掲示板アプリケーション
- **express-app**: Express を使用した Web アプリケーション
- **ex-gen-app**: Express ジェネレータを使用して作成されたアプリケーション（sqlite3 を使用）

## 依存関係のインストール

各プロジェクトフォルダ内で依存関係をインストールする必要があります。以下のコマンドをそれぞれのプロジェクトディレクトリ内で実行してください。

```bash
cd node-app
npm install

cd ../mini_board
npm install

cd ../express-app
npm install

cd ../ex-gen-app
npm install
```

## ex-gen-app の補足

sqlite の設定は教科書を参照してください

ダウンロードページ
http://sqlitebrowser.org

スキーマ

```sql
CREATE TABLE "mydata" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"mail"	TEXT,
	"age"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
)
```
