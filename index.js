const express = require('express')
const router = require('./routes/index')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Works!' })
})

const start = async () => {
    try {
        app.listen(5000, () => console.log(`Server has been started`))
    }
    catch (error) {
        console.log(error)
    }
}

start()