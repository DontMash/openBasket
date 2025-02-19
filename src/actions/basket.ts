import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const list = {
  create: defineAction({
    accept: 'form',
    input: z.object({
      displayName: z.string(),
    }),
    handler: async (input, context) => {
      const { basket } = context.locals.api;

      try {
        const result = await basket.POST('/api/list', {
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
  update: defineAction({
    accept: 'form',
    input: z.object({
      id: z.string().uuid(),
      displayName: z.string(),
    }),
    handler: async (input, context) => {
      const { basket } = context.locals.api;

      try {
        const result = await basket.PUT('/api/list', {
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
  delete: defineAction({
    accept: 'form',
    input: z.object({
      id: z.string().uuid(),
    }),
    handler: async (input, context) => {
      const { basket } = context.locals.api;

      try {
        const result = await basket.DELETE('/api/list/{id}', {
          params: { path: input },
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
  addItem: defineAction({
    accept: 'form',
    input: z.object({
      itemId: z.string().uuid(),
      quantity: z.number(),
      listId: z.string().uuid(),
    }),
    handler: async (input, context) => {
      const { basket } = context.locals.api;

      try {
        const result = await basket.POST('/api/list/additems', {
          body: {
            listId: input.listId,
            items: [{ id: input.itemId, quantity: input.quantity }],
          },
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
};

export const item = {
  create: defineAction({
    accept: 'form',
    input: z.object({
      displayName: z.string(),
      unit: z.string(),
    }),
    handler: async (input, context) => {
      const { basket } = context.locals.api;

      try {
        const result = await basket.POST('/api/listitem', {
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
  update: defineAction({
    accept: 'form',
    input: z.object({
      id: z.string().uuid(),
      displayName: z.string().optional(),
      unit: z.string().optional(),
    }),
    handler: async (input, context) => {
      const { basket } = context.locals.api;

      try {
        const result = await basket.PUT('/api/listitem', {
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
  delete: defineAction({
    accept: 'form',
    input: z.object({
      id: z.string().uuid(),
    }),
    handler: async (input, context) => {
      const { basket } = context.locals.api;

      try {
        const result = await basket.DELETE('/api/listitem/{id}', {
          params: { path: input },
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
};
