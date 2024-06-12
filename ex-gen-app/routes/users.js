const express = require("express");
const router = express.Router();

const ps = require("@prisma/client");
const prisma = new ps.PrismaClient();

module.exports = router;
