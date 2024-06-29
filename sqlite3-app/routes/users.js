const express = require("express");
const router = express.Router();

const ps = require("@prisma/client");
const prisma = new ps.PrismaClient();

router.get("/", (req, res, next) => {
  const id = +req.query.id;
  if (!id) {
    prisma.user.findMany().then((users) => {
      const data = {
        title: "Users/Index",
        content: users,
      };
      res.render("users/index", data);
    });
  } else {
    prisma.user
      .findUnique({
        where: { id: id },
      })
      .then((usr) => {
        var data = {
          title: "Users/Index",
          content: [usr],
        };
        res.render("users/index", data);
      });
  }
});

module.exports = router;
