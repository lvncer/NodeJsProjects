var express = require("express");
var router = express.Router();

const MarkdownIt = require("markdown-it");
const markdown = new MarkdownIt();

const ps = require("@prisma/client");
const prisma = new ps.PrismaClient();

// ログインチェックの関数
function check(req, res) {
  if (req.session.login == undefined) {
    req.session.back = "/";
    return true;
  } else {
    return false;
  }
}

// ログインチェック
router.get("/check", function (req, res, next) {
  if (check(req, res)) {
    res.json({ result: false });
  } else {
    res.json({ result: req.session.login.name });
  }
});

// 全データ取得
router.get("/all", (req, res, next) => {
  if (check(req, res)) {
    res.json({});
    return;
  }
  prisma.Markdata.findMany({
    where: { accountId: +req.session.login.id },
    orderBy: [{ createdAt: "desc" }],
  }).then((mds) => {
    res.json(mds);
  });
});

// 指定IDのMarkdata取得
router.get("/mark/:id", (req, res, next) => {
  if (check(req, res)) {
    res.json([]);
    return;
  }
  prisma.Markdata.findMany({
    where: {
      id: +req.params.id,
      accountId: +req.session.login.id,
    },
    orderBy: [{ createdAt: "desc" }],
  }).then((models) => {
    const model =
      models != null ? (models[0] != null ? models[0] : null) : null;
    res.json(model);
  });
});

// Markdata新規作成
router.post("/add", (req, res, next) => {
  if (check(req, res)) {
    res.json({});
    return;
  }
  prisma.Markdata.create({
    data: {
      accountId: req.session.login.id,
      title: req.body.title,
      content: req.body.content,
    },
  }).then((model) => {
    res.json(model);
  });
});

// Markdataのコンテンツ更新
router.post("/mark/edit", (req, res, next) => {
  if (check(req, res)) {
    res.json({});
    return;
  }
  prisma.Markdata.update({
    where: { id: +req.body.id },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  }).then((model) => {
    res.json(model);
  });
});

// Markdataのレンダリング結果
router.post("/mark/render", (req, res, next) => {
  if (check(req, res)) {
    res.json({});
    return;
  }
  const source = req.body.source;
  const ren = markdown.render(source);
  const result = { render: ren };
  res.json(result);
});

module.exports = router;
