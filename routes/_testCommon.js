"use strict";

const db = require("../db.js");

const User = require('../models/user');

const { createToken } = require("../helpers/tokens");



async function commonBeforeAll(){
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
    await User.register({
        username: "u3",
        email: "user1@user.com",
        password: "p1",
    })


    await User.register({
        username: "u4",
        email: "user2@user.com",
        password: "p2",
    })
}

async function commonBeforeEach() {
    await db.query("BEGIN");
  }
  
  async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
  
  async function commonAfterAll() {
    await db.end();
  }



  module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
  };