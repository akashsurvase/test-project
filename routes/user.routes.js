const router = require("express").Router();
const { userController } = require("../controller");
const Auth = require("../middleware/AuthGuard");

router.post("/register", async (req, res) => {
  const resp = await userController.register(req.body);
  if (!resp.success) {
    return res.status(resp.code).send(resp);
  }
  return res.status(resp.code).send(resp);
});

router.post("/login", async (req, res) => {
  const resp = await userController.login(req.body);
  return res.status(resp.code).send(resp);
});

module.exports = router;
