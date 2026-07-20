import { z } from 'zod'

const MAX_PDF_SIZE = 50 * 1024 * 1024

const isFile = (value: unknown): value is File =>
  typeof File !== 'undefined' && value instanceof File

export const UploadSchema = z.object({
  file: z
    .any()
    .refine(isFile, 'PDF file is required')
    .refine((value) => isFile(value) && value.type === 'application/pdf', 'Only PDF files accepted')
    .refine((value) => isFile(value) && value.size <= MAX_PDF_SIZE, 'PDF must be 50MB or smaller'),
  cover: z
    .any()
    .optional()
    .refine(
      (value) =>
        !value || (isFile(value) && value.type.startsWith('image/')),
      'Cover image must be a valid image file',
    ),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author name is required'),
  voice: z.enum(['dave', 'daniel', 'chris', 'rachel', 'sarah']),
})
