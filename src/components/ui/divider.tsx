import * as React from 'react'
import { cn } from '@/lib/utils'

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: 'default' | 'blueprint'
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        'border-0',
        variant === 'default' && 'h-px bg-border',
        variant === 'blueprint' &&
          'h-px bg-border relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:border before:border-border before:bg-background after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:border after:border-border after:bg-background',
        className
      )}
      {...props}
    />
  )
)
Divider.displayName = 'Divider'
