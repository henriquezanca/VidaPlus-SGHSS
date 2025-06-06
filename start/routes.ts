import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('login', async ({ request, auth }) => {
      const { email, password } = request.all()
      const user = await User.verifyCredentials(email, password)

      // to generate a token
      return await auth.use('jwt').generate(user)
    })

    router
      .group(() => {
        router.get('/', async ({ auth }) => {
          return auth.getUserOrFail()
        })
      })
      .use(middleware.auth())
  })
  .prefix('api')
