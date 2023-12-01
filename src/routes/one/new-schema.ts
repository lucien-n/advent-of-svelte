import { z } from 'zod';

export const newSchema = z.object({
	name: z
		.string()
		.min(2, 'The name must be at least 3 characters long')
		.max(80, 'The name cannot be longer than 80 characters'),
	tally: z
		.number()
		.min(-100, 'Price must be between -100 & 100')
		.max(100, 'Price must be between -100 & 100')
});

export type NewSchema = typeof newSchema;
