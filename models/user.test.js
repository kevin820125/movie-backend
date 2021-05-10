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
const User = require("./user.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('test authenticate' , function(){
    test('user exsist' , async function(){
        const isexsist =await User.authenticate('u1' , 'p1')
        expect(isexsist).toEqual({
            username: 'u1', 
            email: 'u1@gmail.com', 
            photourl: 'photourl' 
        })
    })
    test('userNot exsist', async function(){
        try{
            const notExist = await User.authenticate('u3' , 'p1')
        }catch(e){
            expect(e instanceof Error).toBeTruthy();
        }
    })
    test('wrong password', async function(){
        const notExist = await expect(User.authenticate('u1' , 'p5'))
            .rejects
            .toThrow('Invalid username / password')
    })
})



describe('test register' , function(){
    let newUser = {
        username : "kevin",
        password : "s;ldfkgjkld;asfgu",
        email : "kevin@gmi.com",
        photourl : "balabala"
    };
    test('create user' , async function(){
        const newU = await User.register({...newUser});
        expect(newU).toEqual({
            username: 'kevin',
            email : 'kevin@gmi.com'
        })

    })
    test('duplicate user' , async function(){
        const duplicate = await expect(User.register({
            username : "u1",
            password : "s;ldfkgjkld;asfgu",
            email : "kevin@gmi.com",
            photourl : "balabala"
        })).rejects.toThrow('Duplicate Username')
    })
})



describe('get user' , function (){
    test('real user' ,async function (){
        const user = await User.get('u1')
        expect(user).toEqual({
            "email": "u1@gmail.com", 
            "username": "u1"
        })
    })

    test('not exsist' , async function(){
        const non = await expect(User.get('102'))
        .rejects
        .toThrow('No user founded')
    })
})