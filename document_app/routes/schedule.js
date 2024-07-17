const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all schedules
router.get("/", async (req, res, next) => {
  try {
    const schedules = await prisma.schedule.findMany();
    const data = {
      title: "Schedules",
      schedules: schedules,
    };
    res.render("schedules/index", data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
