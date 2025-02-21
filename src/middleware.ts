import { BASKET_SERVER, IDENTITY_SERVER } from 'astro:env/server';
import { defineMiddleware } from 'astro:middleware';
import { jwtDecode } from 'jwt-decode';
import createClient from 'openapi-fetch';
import type { paths as basketPaths } from '@/basket-api-schema';
import type { paths as identityPaths } from '@/identity-api-schema';

export const onRequest = defineMiddleware(async (context, next) => {
  const identity = createClient<identityPaths>({
    baseUrl: IDENTITY_SERVER,
  });
  const basket = createClient<basketPaths>({
    baseUrl: BASKET_SERVER,
  });
  context.locals.api = {
    basket,
    identity,
  };

  if (context.cookies.has('auth')) {
    const auth = context.cookies.get('auth');
    if (auth) {
      context.locals.user = auth?.json();
    }
  }

  const user = context.locals.user;
  if (user) {
    const accessData = jwtDecode(user.accessToken);
    if (accessData?.exp && Date.now() < accessData.exp * 1000) {
      return next();
    }

    const result = await identity.POST('/api/auth/refresh-token', {
      body: { userId: user.userId, refreshToken: user.refreshToken },
    });

    if (result && result.error) {
      console.error(result, user);
      context.cookies.delete('auth');
      context.locals.user = undefined;
    }

    if (result && !result.error) {
      context.cookies.set('auth', result.data);
      context.locals.user = result.data;
    }
  }

  return next();
});
