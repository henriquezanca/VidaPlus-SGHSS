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

        // to generate a token
        return await auth.use('jwt').generate(user)
      })
      .use(middleware.guest())

    router
      .group(() => {
        router.get('/me', async ({ auth }) => {
          return auth.getUserOrFail()
        })

        router.resource('patients', PatientsController).apiOnly()
        router.resource('appointments', AppointmentsController).apiOnly()
      })
      .use(middleware.auth())
  })
  .prefix('api')
