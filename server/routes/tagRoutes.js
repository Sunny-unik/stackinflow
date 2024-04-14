const express = require("express");
const {
  listTags,
  countTags,
  tagsPerPage
} = require("../controllers/tagController");

const router = express.Router();

router.get("/list", listTags);
router.get("/count", countTags);
router.get("/on-page", tagsPerPage);

module.exports = router;
