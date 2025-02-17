import { defineAction } from 'astro:actions';
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
          console.error(result);
          return;
        }

        return result.data;
      } catch (error) {
        console.error(error);
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
          console.error(result);
          return;
        }

        context.cookies.set('auth', result.data);

        return result.data;
      } catch (error) {
        console.error(error);
      }
    },
  }),
};
