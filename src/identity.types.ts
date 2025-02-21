import { z } from 'astro:schema';

export const IDENTITY_JWT_PAYLOAD_SCHEMA = z
  .object({
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': z
      .string()
      .uuid(),
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': z.string(),
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': z
      .string()
      .email(),
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': z.string(),
  })
  .brand('identity-jwt-payload');
export type IdentityJwtPayload = z.infer<typeof IDENTITY_JWT_PAYLOAD_SCHEMA>;
