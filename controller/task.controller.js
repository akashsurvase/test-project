const apiController = require("../utility/apiController");
const sqlCmds = require("../utility/sqlcmds");
const taskValidation = require("../validations/task.validation");
const csv = require("csvtojson");
const path = require("path");

class Tasks {
  async addTasks(data) {
    try {
      const { error } = await taskValidation.addTaskValidation(data);
      if (error) {
        return apiController.respondBad(error.message);
      }
      let { title, due_date } = data;
      let { id } = data.userDetails;
      const params = [title, due_date, id];
      const taskSql = `insert into tasks (title,due_date,userId) values (?,?,?)`;
      const taskResult = await sqlCmds.addRecords(taskSql, params);
      return apiController.respondPost(taskResult);
    } catch (err) {
      return apiController.respondBad(err);
    }
  }

  async getUsersTasks(params) {
    try {
      let { skip, limit } = params;
      let { id } = params.userDetails;
      skip = skip ? skip : 0;
      limit = limit ? limit : 10;

      var query = `select * from tasks where userId = ${id}`;

      var countquery = `select count(re.id) as totalCount from (${query}) re`;
      var totalCount = await sqlCmds.getMany(countquery);
      query += ` order by id DESC `;
      query += `LIMIT ${skip}, ${limit}`;

      var data = await sqlCmds.getMany(query);

      let users = {
        total_count: totalCount[0].totalCount,
        data: data,
      };
      return apiController.respondGet(users);
    } catch (err) {
      return apiController.respondBad(err);
    }
  }

  async updateUsersTask(data) {
    try {
      let { id, title, due_date } = data;
      let select_sql = `select * from tasks where id = ${id}`;
      let taskResult = await sqlCmds.getOne(select_sql);
      if (!taskResult) {
        return apiController.respondBad("Id not found");
      }
      var updateSql = `update tasks set title=?,due_date=? where id=?`;

      var update_values = [
        title ? title : taskResult.title,
        due_date ? due_date : taskResult.due_date,
        id,
      ];
      var result = await sqlCmds.updateRecords(updateSql, update_values);
      return apiController.respondPut(result);
    } catch (err) {
      return apiController.respondBad(err);
    }
  }

  async deleteUsersTask(data) {
    try {
      let { id } = data;
      let select_sql = `select * from tasks where id = ${id}`;
      let taskResult = await sqlCmds.getOne(select_sql);
      if (!taskResult) {
        return apiController.respondBad("Id not found");
      }
      var sql = `delete from tasks where id=${id}`;
      var result = await sqlCmds.deleteRecords(sql);
      return apiController.respondDelete(result);
    } catch (err) {
      return apiController.respondBad(err);
    }
  }

  async addTaskUploadCSV(data) {
    try {
      let { id } = data.userDetails;
      let result = await csv().fromFile(
        path.resolve(__dirname, "taskdetails.csv")
      );
      let customer_payload = [];
      result.map((item) => {
        customer_payload.push([`${item.Taskname}`, `${item.duedate}`, `${id}`]);
      });
      var customer_sql = `insert into tasks (title,due_date,userId) values ? `;
      await sqlCmds.addRecords(customer_sql, [customer_payload]);
      return apiController.respondPost("Tasks added successfully");
    } catch (err) {
      return apiController.respondBad(err);
    }
  }
}

module.exports = new Tasks();
