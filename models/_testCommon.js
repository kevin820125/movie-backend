const bcrypt = require("bcrypt");

const db = require("../db.js");

const { BCRYPT_WORK_FACTOR } = require("../config");



async function commonBeforeAll(){
    await db.query('delete from users')

    await db.query(`insert into users(
        username,
        password,
        email,
        photourl)
        values('u1' , $1 , 'u1@gmail.com' , 'photourl'),
              ('u2' , $2 , 'u2@gmail.com' , 'photourl2')
        returning username` , 
        [
            await bcrypt.hash('p1' , BCRYPT_WORK_FACTOR),
            await bcrypt.hash('p2' , BCRYPT_WORK_FACTOR)
        ])


    await db.query(`insert into watchlist(
      username,
      movieId
    )values('u1','1'),('u2','2'),('u1','2'),('u2','3')`)
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