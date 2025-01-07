import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginSchema, registerSchema } from '../schemas';

const app = new Hono()
  .post(
    '/login',
    // zValidatorの部分はmiddleware。z.objectはzodのスキーマ（バリデーション）。
    // loginSchemaはfeatures/auth/schemas.tsで定義されている。
    zValidator('json', loginSchema),
    async (c) => {
      const { email, password } = c.req.valid('json');
      return c.json({ email, password });
    }
  )
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { name, email, password } = c.req.valid('json');
    return c.json({ name, email, password });
  });

export default app;
