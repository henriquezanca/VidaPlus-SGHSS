import type { HttpContext } from '@adonisjs/core/http'
import Appointment from '#models/appointment'

export default class AppointmentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Appointment.query().preload('patient')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    return Appointment.create(request.all())
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const appointment = await Appointment.findOrFail(params.id)
    await appointment.load('patient')
    return appointment
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const appointment = await Appointment.findOrFail(params.id)

    appointment.merge(request.all())
    return appointment.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const patient = await Appointment.findOrFail(params.id)
    return patient.delete()
  }
}
