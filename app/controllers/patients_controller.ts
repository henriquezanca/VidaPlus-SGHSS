import type { HttpContext } from '@adonisjs/core/http'
import Patient from '#models/patient'

export default class PatientsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Patient.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    return Patient.create(request.all())
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Patient.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const user = await Patient.findOrFail(params.id)

    user.merge(request.all())
    return user.save()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const patient = await Patient.findOrFail(params.id)
    return patient.delete()
  }
}
