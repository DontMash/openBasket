import { defineMiddleware } from 'astro:middleware';
import createClient from 'openapi-fetch';
import type { paths as identityPaths } from '@/identity-api-schema';
import { IDENTITY_SERVER } from 'astro:env/server';

export const onRequest = defineMiddleware(async (context, next) => {
  const identity = createClient<identityPaths>({
    baseUrl: IDENTITY_SERVER,
  });
  context.locals.api = {
    identity,
  };
  
  const user = context.cookies.get('auth')?.json();
  if (!user) {
    return next();
  }

  const result = await identity.POST('/api/auth/refresh-token', {
    body: {
      userId: user.userId,
      refreshToken: user.refreshToken,
    },
  });
  
  if (result.error) {
    console.error(result);
    return next();
  }

  context.cookies.set('auth', result.data);
  context.locals.user = result.data;

  return next();
});
