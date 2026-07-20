'use client'

import React, { useMemo, useState } from 'react'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadSchema } from '@/lib/zod'
import { BookUploadFormValues } from '@/types'
import { cn } from '@/lib/utils'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FileText, ImagePlus, X } from 'lucide-react'

const maleVoices = [
  { id: 'dave', label: 'Dave', description: 'Young male, British-Essex, casual & conversational' },
  { id: 'daniel', label: 'Daniel', description: 'Middle-aged male, British, authoritative but warm' },
  { id: 'chris', label: 'Chris', description: 'Male, casual & easy-going' },
] as const

const femaleVoices = [
  { id: 'rachel', label: 'Rachel', description: 'Young female, American, calm & clear' },
  { id: 'sarah', label: 'Sarah', description: 'Young female, American, soft & approachable' },
] as const

const UploadForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      file: undefined,
      cover: undefined,
      title: '',
      author: '',
      voice: 'rachel',
    },
  })

  const [selectedFile, selectedCover, selectedVoice] = useWatch({
    control,
    name: ['file', 'cover', 'voice'],
  }) as [File | undefined, File | undefined, string]

  const fileName = useMemo(() => selectedFile?.name || '', [selectedFile])
  const coverName = useMemo(() => selectedCover?.name || '', [selectedCover])

  const onSubmit = async (values: BookUploadFormValues) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setLoading(false)
    console.log('Upload values', values)
  }

  return (
    <div className="new-book-wrapper">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <FormField>
            <FormLabel htmlFor="file">Book PDF File</FormLabel>
            <FormItem>
              <FormControl>
                <Controller
                  name="file"
                  control={control}
                  render={({ field }) => (
                    <div
                      className={cn(
                        'upload-dropzone border border-dashed border-[#8B7355] bg-[#fff7eb] text-[#663820] p-4 min-h-[180px]',
                        field.value ? 'upload-dropzone-uploaded' : '',
                      )}
                    >
                      {field.value ? (
                        <div className="flex flex-col items-center gap-3">
                          <p className="upload-dropzone-text">{fileName}</p>
                          <button
                            type="button"
                            className="upload-dropzone-remove"
                            onClick={() => {
                              resetField('file')
                              field.onChange(undefined)
                            }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center h-full w-full gap-3 cursor-pointer">
                          <FileText className="upload-dropzone-icon" />
                          <p className="upload-dropzone-text">Click to upload PDF</p>
                          <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                        </label>
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0]
                          field.onChange(file)
                        }}
                      />
                    </div>
                  )}
                />
              </FormControl>
              {errors.file?.message && <FormMessage>{errors.file.message?.toString()}</FormMessage>}
            </FormItem>
          </FormField>

          <FormField>
            <FormLabel htmlFor="cover">Cover Image (Optional)</FormLabel>
            <FormItem>
              <FormControl>
                <Controller
                  name="cover"
                  control={control}
                  render={({ field }) => (
                    <div
                      className={cn(
                        'upload-dropzone border border-dashed border-[#8B7355] bg-[#fff7eb] text-[#663820] p-4 min-h-[180px]',
                        field.value ? 'upload-dropzone-uploaded' : '',
                      )}
                    >
                      {field.value ? (
                        <div className="flex flex-col items-center gap-3">
                          <p className="upload-dropzone-text">{coverName}</p>
                          <button
                            type="button"
                            className="upload-dropzone-remove"
                            onClick={() => {
                              resetField('cover')
                              field.onChange(undefined)
                            }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="cover-upload" className="flex flex-col items-center justify-center h-full w-full gap-3 cursor-pointer">
                          <ImagePlus className="upload-dropzone-icon" />
                          <p className="upload-dropzone-text">Click to upload cover image</p>
                          <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                        </label>
                      )}
                      <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0]
                          field.onChange(file)
                        }}
                      />
                    </div>
                  )}
                />
              </FormControl>
              {errors.cover?.message && <FormMessage>{errors.cover.message?.toString()}</FormMessage>}
            </FormItem>
          </FormField>

          <FormField>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormItem>
              <FormControl>
                <input
                  id="title"
                  placeholder="ex: Rich Dad Poor Dad"
                  className="form-input"
                  {...register('title')}
                />
              </FormControl>
              {errors.title?.message && <FormMessage>{errors.title.message}</FormMessage>}
            </FormItem>
          </FormField>

          <FormField>
            <FormLabel htmlFor="author">Author Name</FormLabel>
            <FormItem>
              <FormControl>
                <input
                  id="author"
                  placeholder="ex: Robert Kiyosaki"
                  className="form-input"
                  {...register('author')}
                />
              </FormControl>
              {errors.author?.message && <FormMessage>{errors.author.message}</FormMessage>}
            </FormItem>
          </FormField>

          <FormField>
            <FormLabel>Choose Assistant Voice</FormLabel>
            <FormItem>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#5b5043] mb-3">Male Voices</p>
                  <div className="voice-selector-options flex flex-wrap gap-4">
                    {maleVoices.map((voice) => (
                      <label
                        key={voice.id}
                        className={cn(
                          'voice-selector-option voice-selector-option-default w-full sm:w-[31%] max-w-[220px] justify-start gap-3 rounded-[18px] p-4',
                          selectedVoice === voice.id && 'voice-selector-option-selected',
                        )}
                      >
                        <input
                          type="radio"
                          value={voice.id}
                          className="sr-only"
                          {...register('voice')}
                        />
                        <span
                          className={cn(
                            'inline-flex h-4 w-4 shrink-0 rounded-full border border-[#8B7355] transition-all',
                            selectedVoice === voice.id ? 'bg-[#8B7355]' : 'bg-white',
                          )}
                        />
                        <div className="text-left">
                          <p className="font-semibold text-[#212a3b]">{voice.label}</p>
                          <p className="text-sm text-[#5b5043]">{voice.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#5b5043] mb-3">Female Voices</p>
                  <div className="voice-selector-options flex flex-wrap gap-4">
                    {femaleVoices.map((voice) => (
                      <label
                        key={voice.id}
                        className={cn(
                          'voice-selector-option voice-selector-option-default w-full sm:w-[48%] max-w-[260px] justify-start gap-3 rounded-[18px] p-4',
                          selectedVoice === voice.id && 'voice-selector-option-selected',
                        )}
                      >
                        <input
                          type="radio"
                          value={voice.id}
                          className="sr-only"
                          {...register('voice')}
                        />
                        <span
                          className={cn(
                            'inline-flex h-4 w-4 shrink-0 rounded-full border border-[#8B7355] transition-all',
                            selectedVoice === voice.id ? 'bg-[#8B7355]' : 'bg-white',
                          )}
                        />
                        <div className="text-left">
                          <p className="font-semibold text-[#212a3b]">{voice.label}</p>
                          <p className="text-sm text-[#5b5043]">{voice.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.voice?.message && <FormMessage>{errors.voice.message}</FormMessage>}
            </FormItem>
          </FormField>

          <div>
            <Button
              type="submit"
              className="form-btn w-full bg-[#663820] text-white font-serif py-4 text-lg"
              disabled={loading}
            >
              {loading ? 'Synthesis in progress...' : 'Begin Synthesis'}
            </Button>
          </div>
        </div>
      </Form>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="rounded-2xl bg-white px-8 py-6 text-center shadow-xl">
            <p className="text-xl font-semibold text-[#663820]">Preparing your book...</p>
            <p className="mt-2 text-sm text-[#5b5043]">This may take a moment while we process your PDF.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadForm
