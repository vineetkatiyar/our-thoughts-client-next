import { z } from 'zod';

export const createStorySchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  content: z.string()
    .min(1, 'Content is required')
    .refine((content) => {
      // Strip HTML tags and check text length
      const textContent = content.replace(/<[^>]*>/g, '');
      return textContent.length >= 50;
    }, 'Content must be at least 50 characters (excluding HTML)'),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
});

export type CreateStoryFormData = z.infer<typeof createStorySchema>;