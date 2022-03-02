const router = require("express").Router();
const anim = require("./../animals/animalsUtils.js")
router.get("/animals", (req, res) => {
    res.send({ count: anim });
});

module.exports = router;
