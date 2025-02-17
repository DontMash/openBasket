import type { Client } from 'openapi-fetch';
import type { paths as identityPaths } from '@/identity-api-schema';

declare global {
  namespace App {
    interface Locals {
      user: {
        userId?: string;
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: string;
      };
      api: {
        identity: Client<identityPaths>;
      };
    }
  }

  interface Window {
    Alpine: import('alpinejs').Alpine;
  }
}
