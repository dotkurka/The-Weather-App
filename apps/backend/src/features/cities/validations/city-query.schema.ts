import { z } from 'zod';

import { numberSchema } from 'src/features/common/validations';

export const cityQuerySchema = z
  .object({
    namePrefix: z.string().max(100),
    limit: numberSchema.default(10),
  })
  .partial();
