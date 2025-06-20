import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      nome: 'Henrique Zanca',
      email: 'hzanca@vidaplus.com.br',
      password: 'secret',
    })
  }
}
