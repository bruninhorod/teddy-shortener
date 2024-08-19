import { User } from '../models/user'

export class UserRepository {
  async createUser(username: string, password: string) {
    return await User.create({ username, password })
  }

  async findUserByUsername(username: string) {
    return await User.findOne({ where: { username } })
  }

  async findUserById(id: number) {
    return await User.findByPk(id)
  }

  async updateUser(id: number, updates: Partial<{ username: string; password: string }>) {
    const user = await User.findByPk(id)
    if (user) {
      return await user.update(updates)
    }
    return null
  }

  async deleteUser(id: number) {
    const user = await User.findByPk(id)
    if (user) {
      return await user.destroy()
    }
    return null
  }
}