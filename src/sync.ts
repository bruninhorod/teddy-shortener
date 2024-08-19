import { sequelize, connectDB } from './config/database'

const syncDatabase = async () => {
    try {
        await connectDB()
        await sequelize.sync({ force: true })
        console.log('Database synchronized')
    } catch (error) {
        console.error('Error synchronizing database:', error)
    } finally {
        process.exit()
    }
}

syncDatabase()