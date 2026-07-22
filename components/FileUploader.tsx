import React from 'react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

interface FileUploaderProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  acceptTypes: string[]
  icon: LucideIcon
  placeholder: string
  hint: string
  disabled?: boolean
}

function FileUploader<T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  icon: Icon,
  placeholder,
  hint,
  disabled,
}: FileUploaderProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedFile = field.value as File | undefined

        return (
          <FormItem>
            <FormLabel className="form-label">{label}</FormLabel>
            <FormControl>
              <div
                className={cn(
                  'upload-dropzone border border-dashed border-[#8B7355] bg-[#fff7eb] text-[#663820] p-4 min-h-[180px]',
                  selectedFile ? 'upload-dropzone-uploaded' : '',
                )}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-3">
                    <p className="upload-dropzone-text">{selectedFile.name}</p>
                    <button
                      type="button"
                      className="upload-dropzone-remove"
                      onClick={() => field.onChange(undefined)}
                      disabled={disabled}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label htmlFor={`${String(name)}-upload`} className="flex flex-col items-center justify-center h-full w-full gap-3 cursor-pointer">
                    <Icon className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">{placeholder}</p>
                    <p className="upload-dropzone-hint">{hint}</p>
                  </label>
                )}
                <input
                  id={`${String(name)}-upload`}
                  type="file"
                  accept={acceptTypes.join(',')}
                  className="hidden"
                  disabled={disabled}
                  onChange={(event) => {
                    field.onChange(event.target.files?.[0])
                  }}
                />
              </div>
            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}

export default FileUploader