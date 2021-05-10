const db = require('../db');
const bcrypt = require('bcrypt');

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");



class User{
    static async authenticate(username, password){
        const result = await db.query(
            `select username,
                    password,
                    email,
                    photourl
            from users
            where username = $1`,
            [username]
        )

        const user = result.rows[0];
        if(user){
            const isValid = await bcrypt.compare(password , user.password);
            if(isValid){
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError('Invalid username / password')
    }


    static async register({username , password , email , photourl}){
        const checkDuplicate = await db.query(
            `select username from users where username = $1` , [username]
        )
        if(checkDuplicate.rows[0]){
            throw new BadRequestError('Duplicate Username')
        }

        const hashedPassword = await bcrypt.hash(password ,BCRYPT_WORK_FACTOR)

        const result = await db.query(
            `insert into users
            (username,
             password,
             email,
             photourl)
             values ($1 , $2 , $3 , $4)
             returning username , email` , 
             [
                 username,
                 hashedPassword,
                 email,
                 photourl,
             ]
        )
        const user = result.rows[0];
        return user
    }

    static async get(username){
        const result =await db.query(
            `select username,
                    email,
                    photourl
                    from users
            where username = $1`,
            [username]
        )
        const user = result.rows[0];
        if(!user) throw new NotFoundError('No user founded')
        return user
    }
}

module.exports = User;

