const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 全ての野菜を取得してHTMLで表示
router.get("/", async (req, res) => {
  const vegetables = await prisma.vegetable.findMany();
  res.render("vegetables", { vegetables });
});

// 野菜を1つ取得
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const vegetable = await prisma.vegetable.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(vegetable);
});

// 新しい野菜を追加
router.post("/", async (req, res) => {
  const { name, price, description, stock } = req.body;
  const newVegetable = await prisma.vegetable.create({
    data: { name, price, description, stock },
  });
  res.json(newVegetable);
});

// 野菜を更新
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;
  const updatedVegetable = await prisma.vegetable.update({
    where: { id: parseInt(id) },
    data: { name, price, description, stock },
  });
  res.json(updatedVegetable);
});

// 野菜を削除
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.vegetable.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Vegetable deleted" });
});

module.exports = router;
