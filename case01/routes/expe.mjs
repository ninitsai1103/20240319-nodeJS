// var express = require('express');
// var router = express.Router();

import express from "express";
import moment from "moment";
import multer from "multer";
import connection from "../db3.mjs";
const router = express.Router();
const upload = multer();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const date = moment().format("YYYY-MM-DD");
  // res.send("導向今天的日期");
  res.redirect(`/expe/d/${date}`);
});

router.get("/d/:date", async (req, res, next) => {
  // res.send("讀取指定日期的所有消費")
  const date = req.params.date;
  let sql = 'SELECT * FROM `sort`';
  let [sorts] = await connection.execute(sql).catch(error => [undefined]);
  sql = "SELECT * FROM `expense` WHERE `date` = ?";
  let dataAry = [date];
  let [data] = await connection.execute(sql, dataAry).catch(error => [[]])
  // console.log(data);
  res.render("index", {date, sorts, data})
})

router.post("/", async (req, res, next) => {
  // res.send("新增指定日期的一筆消費")
  // let title = req.body.title;
  // let sort = 1;
  // let money = 30;
  // let date = "2024-03-18";
  const {title, sort, money, date} = req.body;
  let sql = "INSERT INTO `expense` (`id`, `title`, `sort`, `money`, `date`) VALUES (NULL, ?, ?, ?, ?)";
  let dataAry = [title, sort, money, date]
  let [results] = await connection.execute(sql, dataAry)
  // console.log(results);
  if (results && results.insertId){
    res.redirect(`/expe/d/${date}`);
  }else {
    res.status(500).send("寫入失敗")
  }
})

// ajax接api
router.put("/", upload.none(), async (req, res, next) => {
  console.log(req.body);
  const {title, money, sort, date, id} = req.body;
  let sql = "UPDATE `expense` SET `title` = ?, `sort` = ?, `money` = ?, `date` = ? WHERE `expense`.`id` = ?";
  let dataAry = [title, sort, money, date, id];
  console.log(dataAry);
  let result = await connection.execute(sql, dataAry).then((results) => {
    // results一定會是一個陣列，索引0是結果，索引值1是欄位
    // UPDATE不會回傳影響欄位，所以值是undefined
    console.log(results[0]);
    if(results[0].changedRows > 0){
      return true
    }else{
      return false
    }
  }).catch(error => {
    console.log(error);
    return false;
  });
  // console.log(result);
  // res.send("修改指定日期的一筆消費")
  // res.redirect(`/expe/d/${date}`);
  res.json({result});
})

router.delete("/", upload.none(), async (req, res, next) => {
  // res.send("刪除指定日期的一筆消費")
  const {id} = req.body;
  let sql = "DELETE FROM expense WHERE `expense`.`id` = ?";
  const dataAry = [id];
  const result = await connection.execute(sql, dataAry).then(results => {
    if(results[0].affectedRows > 0){
      return true;
    }else {
      return false;
    }
  }).catch(error => false);
  // console.log(results);
  res.json({result})
})

export default router;
