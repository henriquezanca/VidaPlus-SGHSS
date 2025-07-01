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
 
  default: 'jwt',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
   
    jwt: jwtGuard({
      
      tokenExpiresIn: '1h',
      
      secret: env.get('JWT_SECRET'),
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
      
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

declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
