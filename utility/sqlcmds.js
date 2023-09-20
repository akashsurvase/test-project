const db = require("../startup/db");
class SqlCmds {
  async addRecords(sql, values) {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, rows, fields) => {
        if (err) {
          return reject(err);
        }
        resolve({
          message: rows.message,
          affectedRows: rows.affectedRows,
          LastInsertId: rows.insertId,
        });
      });
    });
  }

  async getOne(sql, values) {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, rows, fields) => {
        if (err) return reject(err);
        resolve(rows[0]);
      });
    });
  }

  async getMany(sql, values) {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, rows, fields) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  async updateRecords(sql, values) {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, rows, fields) => {
        if (err) return reject(err);
        resolve({
          message: rows.message,
          affectedRows: rows.affectedRows,
          changedRows: rows.changedRows,
        });
      });
    });
  }

  async deleteRecords(sql, values) {
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, rows, fields) => {
        if (err) return reject(err);
        resolve({
          affectedRows: rows.affectedRows,
          changedRows: rows.changedRows,
        });
      });
    });
  }
}

module.exports = new SqlCmds();
