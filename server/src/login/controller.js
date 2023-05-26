const pool = require('../../db')
const queries = require('./queries')

const mockLogin = (req,res) => {
    console.log('login')
    
    const username = (req.params.username)
    const password = (req.params.password)
    console.log(username)
    console.log(password)
    if (password === "password"){
        res.status(200).json({restult : true})
    } else{
        res.status(200).json({restult : false})
    }

}

module.exports = {
    mockLogin
}