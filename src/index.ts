import express from 'express'
import dotenv from 'dotenv'
import { connectDB, sequelize } from './config/database'
import authRoutes from './routes/auth'
import shortenerRoutes from './routes/shortener'
import redirectRoutes from './routes/redirect'


dotenv.config()

const app = express()

connectDB()

app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/shortener', shortenerRoutes)
app.use(redirectRoutes)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    try {
        await sequelize.sync({ alter: true })
        console.log(`Servidor rodando na porta ${PORT}`)
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error)
    }
})
