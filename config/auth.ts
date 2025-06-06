import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'
import { JwtGuardUser, BaseJwtContent } from '@maximemrf/adonisjs-jwt/types'
import User from '#models/user'
import env from '#start/env'
import { defineConfig } from '@adonisjs/auth'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'

interface JwtContent extends BaseJwtContent {
  email: string
}

const authConfig = defineConfig({
  // define the default authenticator to jwt
  default: 'jwt',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
    // add the jwt guard
    jwt: jwtGuard({
      // tokenExpiresIn can be a string or a number, it can be optional
      tokenExpiresIn: '1h',
      // secret is the secret used to sign the token, it can be optional, by default it uses the application key
      // you can use a env variable like JWT_SECRET or set it directly with a string
      // if you don't have specific needs, please discard this option
      secret: env.get('JWT_SECRET'),
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
      // content is a function that takes the user and returns the content of the token, it can be optional, by default it returns only the user id
      content: <T>(user: JwtGuardUser<T>): JwtContent => {
        return {
          userId: user.getId(),
          email: (user.getOriginal() as User).email,
        }
      },
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
