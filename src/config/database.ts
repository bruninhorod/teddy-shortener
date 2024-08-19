import { Sequelize } from 'sequelize-typescript'
import { ShortenedUrl } from '../models/shortened-url'
import dotenv from 'dotenv'
import { User } from '../models/user'

dotenv.config()

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    models: [User, ShortenedUrl] 
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Banco de dados conectado')


        await sequelize.sync({ force: false })
        console.log('Tabelas sincronizadas com sucesso')
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error)
        process.exit(1)
    }
}

export { sequelize, connectDB }
