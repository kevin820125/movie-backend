const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");



describe('create Token for user' , function(){
    test('works' , function(){
        const token = createToken({username:"kevin820125"})
        const decoded = jwt.verify(token , SECRET_KEY)
        expect(decoded).toEqual({
            exp : expect.any(Number),
            iat : expect.any(Number),
            user:"kevin820125"
        })
    })
})