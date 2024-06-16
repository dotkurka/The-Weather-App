import { PipeTransform, Injectable } from '@nestjs/common';
import { ParseParams, ZodError, ZodSchema } from 'zod';

import { ValidationBadRequestException } from 'src/features/common/exceptions';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(
    private schema: ZodSchema<T>,
    private options?: Partial<ParseParams>,
  ) {}

  async transform(value: T) {
    try {
      const result = await this.schema.parseAsync(value, this.options);
      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationBadRequestException(error, 'Validation failed');
      }
      throw error;
    }
  }
}
