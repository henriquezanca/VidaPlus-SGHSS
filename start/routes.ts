import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from '#start/kernel'
const AppointmentsController = () => import('#controllers/appointments_controller')
const PatientsController = () => import('#controllers/patients_controller')

router
  .group(() => {
    router
      .post('login', async ({ request, auth }) => {
        const { email, password } = request.all()
        const user = await User.verifyCredentials(email, password)

       
        return await auth.use('jwt').generate(user)
      })
      .use(middleware.guest())

    router
      .group(() => {
        router.get('/me', async ({ auth }) => {
          return auth.getUserOrFail()
        })

        router.resource('pacientes', PatientsController).apiOnly()
        router.resource('consultas', AppointmentsController).apiOnly()
      })
      .use(middleware.auth())
  })
  .prefix('api')
