import type { HttpContext } from '@adonisjs/core/http'
import Appointment from '#models/appointment'

export default class AppointmentsController {
  
  async index({}: HttpContext) {
    return Appointment.query().preload('patient')
  }

  async store({ request }: HttpContext) {
    return Appointment.create(request.all())
  }
  
  async show({ params }: HttpContext) {
    const appointment = await Appointment.findOrFail(params.id)
    await appointment.load('patient')
    return appointment
  }

  async update({ params, request }: HttpContext) {
    const appointment = await Appointment.findOrFail(params.id)

    appointment.merge(request.all())
    return appointment.save()
  }
  
  async destroy({ params }: HttpContext) {
    const patient = await Appointment.findOrFail(params.id)
    return patient.delete()
  }
}
