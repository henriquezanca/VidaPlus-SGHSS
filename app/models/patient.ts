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
  declare fullName: string

  @column.date()
  declare birthDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
