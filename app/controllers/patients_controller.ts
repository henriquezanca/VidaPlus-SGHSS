import type { HttpContext } from '@adonisjs/core/http'
import Patient from '#models/patient'

export default class PatientsController {

  async index({}: HttpContext) {
    return Patient.query().preload('appointments')
  }


  async store({ request }: HttpContext) {
    return Patient.create(request.all())
  }


  async show({ params }: HttpContext) {
    const patient = await Patient.findOrFail(params.id)
    await patient.load('appointments')
    return patient
  }

  
  async update({ params, request }: HttpContext) {
    const patient = await Patient.findOrFail(params.id)

    patient.merge(request.all())
    return patient.save()
  }

  
  async destroy({ params }: HttpContext) {
    const patient = await Patient.findOrFail(params.id)
    return patient.delete()
  }
}
