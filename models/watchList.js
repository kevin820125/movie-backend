const db = require('../db');

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");

class WatchList{
    static async save(username , movieId){

        const duplicate = await db.query(
            `select username , movieId from watchlist where username = $1 and movieId = $2` , 
            [username , movieId]
        )
        if(duplicate.rows[0]) throw new BadRequestError(`it's already in your watchList`)
    
        const result = await db.query(
            `insert into watchlist
            (username , movieId)
            values($1 , $2)
            returning username,movieId`,
            [username , movieId]
        )
        const item = result.rows[0];
        return item
    }

    static async get(username){
        const result = await db.query(
            `select movieId
                from watchlist
            where username = $1`,
            [username]
        )
        return result.rows
    }
    static async delete(username , movieId){
        const result = await db.query(
            `delete from watchlist where username = $1 and movieId = $2 returning *`,
            [username , movieId]
        )
        if(!result.rows[0]) throw new NotFoundError('no such Movie')
        return result.rows[0]
    }
}


module.exports = WatchList;