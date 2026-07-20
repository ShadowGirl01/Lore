import * as React from 'react'
import { cn } from '@/lib/utils'

type FormProps = React.FormHTMLAttributes<HTMLFormElement>
function Form({ className, ...props }: FormProps) {
  return <form className={cn('space-y-8', className)} {...props} />
}

type FormFieldProps = {
  className?: string
  children: React.ReactNode
}

function FormField({ className, children }: FormFieldProps) {
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
