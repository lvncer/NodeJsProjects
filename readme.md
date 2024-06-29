# マルチプロジェクト Node.js リポジトリ

このリポジトリには複数の Node.js プロジェクトが含まれています。各プロジェクトは独立して動作しますが、共通の開発環境を共有します。

## プロジェクト一覧

- **node-app**: 基本的な伝言アプリケーション
- **mini_board**: ミニ掲示板アプリケーション
- **express-app**: Express を使用した Web アプリケーション
- **sqlite3-app**: SQlite3 を使用した ユーザ情報管理アプリケーション
- **ex-gen-app**: Prisma を使用して作成された本格的なユーザ管理アプリケーション

## 依存関係のインストール

各プロジェクトフォルダ内で依存関係をインストールする必要があります。以下のコマンドをそれぞれのプロジェクトディレクトリ内で実行してください。

```bash
cd node-app
npm install

cd ../mini_board
npm install

cd ../express-app
npm install

cd ../sqlite3-app
npm install

cd ../ex-gen-app
npm install
```

## 実行方法

- miniboard / node-app

```bash
node app
```

- express-app

```bash
node index
```

- sqlite3-app / ex-gen-app

```bash
node bin/www
npm start
npm run nodemon
```

## 表示方法

- node-app / miniboard / express-app

```uri
localhost:3000
```

- sqlite3-app

```uri
localhost:3000/hello
localhost:3000/hello/add
localhost:3000/hello/show?id=< 任意のidを入力する >
localhost:3000/hello/edit?id=< 任意のidを入力する >
localhost:3000/hello/delete?id=< 任意のidを入力する >
localhost:3000/hello/find
```

- ex-gen-app

```uri
localhost:3000/users
localhost:3000/users?id=< id >
```

## SQLite3 関連のパッケージ

```bash
npm install sqlite3
```

## prisma 関連のダウンロード

```bash
npm install prisma -g
prisma init
prisma migrate dev --name initial
prisma studio
```
