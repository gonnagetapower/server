const User = require('./../models/model')
const jwt = require('jsonwebtoken')

const generateJwt = (login) => {
    return jwt.sign({ login }, 'luckykey', { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        const { login, password } = req.body;
        User.push({
            login, password
        })
        return res.status(200).json({ message: 'Пользователь успешно создан' })
    }
    async login(req, res, next) {
        let userReq = req.body;
        let foundUser = User.find(usr => usr.login === userReq.login)
        if (!foundUser) {
            return res.status(400).json({ message: "Пользователь не найден" })
        }
        if (foundUser?.password === userReq.password) {
            const token = generateJwt(userReq.login)
            return res.json({ token })
        } else {
            return res.status(400).json({ message: "Указан неверный пароль" })
        }
    }
}

module.exports = new UserController()