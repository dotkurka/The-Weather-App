import { z } from 'zod';

import { Order } from 'src/features/common/enum';

export const githubSearchQuerySchema = z.object({
  name: z.string().min(1).max(100),
  order: z.nativeEnum(Order).default(Order.Asc),
});
