const router = require("express").Router();
const { taskController } = require("../controller");
const Auth = require("../middleware/AuthGuard");
const { user } = require("../utility/comnEnum").RoleEnum();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10 MB
  },
});
router.post("/add-task", Auth.AuthGuard([user]), async (req, res) => {
  req.body.userDetails = req.user;
  const resp = await taskController.addTasks(req.body);
  if (!resp.success) {
    return res.status(resp.code).send(resp);
  }
  return res.status(resp.code).send(resp);
});

router.put("/update-task", Auth.AuthGuard([user]), async (req, res) => {
  req.body.userDetails = req.user;
  const resp = await taskController.updateUsersTask(req.body);
  return res.status(resp.code).send(resp);
});

router.get("/get-tasks", Auth.AuthGuard([user]), async (req, res) => {
  req.query.userDetails = req.user;
  const resp = await taskController.getUsersTasks(req.query);
  return res.status(resp.code).send(resp);
});

router.delete("/delete-task", Auth.AuthGuard([user]), async (req, res) => {
  req.query.userDetails = req.user;
  const resp = await taskController.deleteUsersTask(req.query);
  return res.status(resp.code).send(resp);
});

router.post(
  "/add-task-csv",
  Auth.AuthGuard([user]),
  upload.single("file"),
  async (req, res) => {
    req.body.userDetails = req.user;
    const resp = await taskController.addTaskUploadCSV( req.body);
    if (!resp.success) {
      return res.status(resp.code).send(resp);
    }
    return res.status(resp.code).send(resp);
  }
);

module.exports = router;
