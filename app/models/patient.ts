import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Appointment from '#models/appointment'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Appointment)
  declare appointments: HasMany<typeof Appointment>

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @column()
  declare email: string

  @column()
  declare telefone: string

  @column.date()
  declare nascimento: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
