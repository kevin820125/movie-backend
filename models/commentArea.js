const db = require('../db');

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");



class CommentArea{
    static async comment(username , movieId , comment){
        console.log(`this is comment ${comment}`)
        const result = await db.query(`
        insert into commentarea(username , movieId , comment)
        values($1,$2,$3) returning username , comment` , [username , movieId , comment])
        return result.rows[0]
    }

    static async delete(id){
        const result = await db.query(`delete from commentarea where id = $1 returning *` , [id])
        if(!result.rows[0]) throw new NotFoundError('no such Comment')
        return result.rows[0]
    }

    static async getCertainComment(comment){
        const result = await db.query(`select id , username , comment from commentarea where comment = $1` , [comment])
        return result.rows[0]
    }

    static async getUserComment(username){
        const result = await db.query(`select id , username , comment , movieId from commentarea where username = $1` , [username])
        return result.rows;
    }
    static async getMovieComment(movieId){
        const result = await db.query(`select username , comment from commentarea where movieId = $1` , [movieId])
        return result.rows;
    }
}


module.exports = CommentArea;