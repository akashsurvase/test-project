const { userRoute } = require("../routes");
const { taskRoute } = require("../routes");
module.exports = (app) => {
  app.use("/api/users", userRoute);
  app.use("/api/tasks", taskRoute);
};
