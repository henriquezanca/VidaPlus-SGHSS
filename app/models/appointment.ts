import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Patient from '#models/patient'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare patientId: number

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @column.date()
  declare dataHora: DateTime

  @column()
  declare peso: number

  @column()
  declare motivoConsulta: string | null

  @column()
  declare observacoes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
