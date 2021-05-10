"use strict";


const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
  } = require("./_testCommon");

const db = require("../db.js");
const WatchList= require("./watchList.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



describe('save', function(){
    test('save success' , async function(){
        const result =await WatchList.save('u1' , '23')
        expect(result).toEqual({
            "username" : "u1",
            "movieid" : 23
        })
    })
})


describe('get userwatchList' , function(){
    test('get it !' , async function(){
        const result = await WatchList.get('u1')
        expect(result).toEqual([
            { username: 'u1', movieid: 1 }, 
            { username: 'u1', movieid: 2 } 
        ])
    })
})


describe('delete movie in watchlist' , function(){
    test('yeah , the movie is there ' , async function(){
        const result = await WatchList.delete('u1' , 1)
        expect(result).toEqual({
            "username" : "u1",
            "movieid" : 1
        })
    })

    test('No no no movie there' , async function (){
        const result = await expect(WatchList.delete('u1' ,100))
        .rejects
        .toThrow('no such Movie')
    })
})