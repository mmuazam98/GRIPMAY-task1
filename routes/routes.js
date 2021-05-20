const express = require("express");
const Router = express.Router();
const mysql = require("mysql");
const util = require("util");
const uniqid = require("uniqid");
// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "gripmay",
// });
const con = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6413586",
  password: "j8dUyLhbtQ",
  database: "sql6413586",
});
const query = util.promisify(con.query).bind(con);

Router.get("/", (req, res) => {
  res.render("index", { page: "index" });
});
Router.get("/customers", (req, res) => {
  let getCustomers = `SELECT * FROM customers`;
  let getUsers = async function () {
    try {
      customers = await query(getCustomers);
    } finally {
      return customers;
    }
  };
  getUsers().then((val) => {
    res.render("customers", { page: "customers", customers: val });
  });
});
Router.get("/user/:id", (req, res) => {
  let uid = req.params.id;
  // console.log(uid);
  let getCustomer = `SELECT * FROM customers WHERE userID='${uid}'`;
  let getCustomers = `SELECT * FROM customers`;

  let getCust = async function () {
    try {
      customer = await query(getCustomer);
      customers = await query(getCustomers);
    } catch (e) {
      res.send(e);
    } finally {
      return [customer, customers];
    }
  };
  getCust().then((val) => {
    // console.log(val[1]);
    res.render("view", { page: "view", customer: val[0][0], customers: val[1] });
  });
});
Router.post("/transact", (req, res) => {
  console.log(req.body);
  let { userID, balance, receiver, amount, date, username, receivername } = req.body;
  let updateBalanceReceiver = `UPDATE customers SET balance = balance+${amount} WHERE userID = '${receiver}'`;
  let updateBalanceSender = `UPDATE customers SET balance = balance-${amount} WHERE userID = '${userID}'`;

  // console.log(updateBalance);
  let update = async () => {
    try {
      await query(updateBalanceReceiver);
      await query(updateBalanceSender);
      tid = uniqid();
      await query(
        `INSERT INTO transactions (userID,username,receiverID,receivername,transactionID,amount,transaction_time) VALUES ('${userID}','${username}','${receiver}','${receivername}','${tid}','${amount}','${date}')`
      );
      res.status(200).json({ msg: "Transaction successful!", tid: tid });
    } catch (error) {
      res.status(400).json({ msg: error });
    } finally {
      return tid;
    }
  };
  update().then((val) => {
    console.log("Transaction successful. Transaction ID is " + val);
  });
});
Router.get("/transactions", (req, res) => {
  let getTransactions = `SELECT * FROM transactions ORDER BY transaction_time DESC`;
  let getTransactions_ = async function () {
    try {
      transactions = await query(getTransactions);
    } catch (e) {
      console.log(e);
    } finally {
      return transactions;
    }
  };
  getTransactions_().then((val) => {
    // console.log(val);
    res.render("transactions", { page: "transactions", transactions: val });
  });
});
module.exports = Router;
