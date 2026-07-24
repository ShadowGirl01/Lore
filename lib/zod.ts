import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES, MAX_FILE_SIZE, MAX_IMAGE_SIZE } from '@/lib/constants'

const isFile = (value: unknown): value is File =>
  typeof File !== 'undefined' && value instanceof File

export const UploadSchema = z.object({
  bookFile: z
    .any()
    .refine((file) => isFile(file), 'Book PDF is required')
    .refine((file) => isFile(file) && file.size <= MAX_FILE_SIZE, 'File size must be less than 50MB.')
    .refine((file) => isFile(file) && ACCEPTED_PDF_TYPES.includes(file.type), 'Only .pdf format is supported.'),
  coverImage: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true
      return isFile(file)
    }, 'Cover image must be a file')
    .refine((file) => {
      if (!file) return true
      return isFile(file) && file.size <= MAX_IMAGE_SIZE
    }, 'Image size must be less than 10MB.')
    .refine((file) => {
      if (!file) return true
      return isFile(file) && ACCEPTED_IMAGE_TYPES.includes(file.type)
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  author: z.string().min(1, 'Author name is required').max(100, 'Author name is too long'),
  persona: z.string().min(1, 'Please select a voice'),
})
