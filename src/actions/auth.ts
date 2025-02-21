import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const auth = {
  register: defineAction({
    accept: 'form',
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
    }),
    handler: async (input, context) => {
      const { identity } = context.locals.api;

      try {
        const result = await identity.POST('/api/auth/register', {
          body: input,
        });

        if (result.error) {
          throw new ActionError({ code: 'BAD_REQUEST' });
        }

        return result.data;
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  }),
  login: defineAction({
    accept: 'form',
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    handler: async (input, context) => {
      const { identity } = context.locals.api;

      try {
        const result = await identity.POST('/api/auth/login', {
          body: input,
        });

        if (result.error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
          });
        }

        context.cookies.set('auth', result.data);
        return result.data;
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  }),
  logout: defineAction({
    accept: 'form',
    handler: async (_, context) => {
      const { identity } = context.locals.api;
      const user = context.locals.user;
      if (!user) {
        throw new ActionError({ code: 'UNAUTHORIZED' });
      }

      try {
        const result = await identity.POST('/api/auth/logout', {
          body: { userId: user.userId, refreshToken: user.refreshToken },
        });

        if (result.error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
          });
        }

        context.cookies.delete('auth');
        context.locals.user = undefined;
        return result.data;
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  }),
  changePassword: defineAction({
    accept: 'form',
    input: z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
    }),
    handler: async (input, context) => {
      const { identity } = context.locals.api;
      const user = context.locals.user;
      if (!user) {
        throw new ActionError({ code: 'UNAUTHORIZED' });
      }

      try {
        const result = await identity.POST('/api/auth/change-password', {
          body: { userId: user.userId, ...input },
        });

        if (result.error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
          });
        }

        context.cookies.delete('auth');
        context.locals.user = undefined;
        return result.data;
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }
    },
  }),
};
