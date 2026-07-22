import * as React from 'react'
import { cn } from '@/lib/utils'
import { Controller, FormProvider, type Control, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'

type FormProps<T extends FieldValues> = UseFormReturn<T> & {
  children: React.ReactNode
}

function Form<T extends FieldValues>({ children, ...props }: FormProps<T>) {
  return <FormProvider {...props}>{children}</FormProvider>
}

type FormFieldProps<TFieldValues extends FieldValues> = {
  control?: Control<TFieldValues>
  name?: FieldPath<TFieldValues>
  render?: (props: { field: any; fieldState: any }) => React.ReactNode
  className?: string
  children?: React.ReactNode
}

function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  render,
  className,
  children,
}: FormFieldProps<TFieldValues>) {
  if (control && name && render) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => <>{render({ field, fieldState })}</>}
      />
    )
  }

  return <div className={cn('space-y-2', className)}>{children}</div>
}

type FormItemProps = {
  className?: string
  children: React.ReactNode
}

function FormItem({ className, children }: FormItemProps) {
  return <div className={cn('space-y-3', className)}>{children}</div>
}

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    return <label ref={ref} className={cn('form-label', className)} {...props} />
  },
)
FormLabel.displayName = 'FormLabel'

interface FormControlProps {
  className?: string
  children: React.ReactNode
}

function FormControl({ className, children }: FormControlProps) {
  return <div className={cn(className)}>{children}</div>
}

type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
function FormDescription({ className, ...props }: FormDescriptionProps) {
  return <p className={cn('text-sm text-[#777] mt-1', className)} {...props} />
}

type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>
function FormMessage({ className, children, ...props }: FormMessageProps) {
  return (
    <p className={cn('text-sm text-red-600 mt-1', className)} {...props}>
      {children}
    </p>
  )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage }
