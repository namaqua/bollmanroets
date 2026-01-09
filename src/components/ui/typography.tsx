import * as React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const H1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        'text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
)
H1.displayName = 'H1'

export const H2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-2xl font-semibold tracking-tight text-foreground sm:text-3xl',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
)
H2.displayName = 'H2'

export const H3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold tracking-tight text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
)
H3.displayName = 'H3'

export const Body = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-base leading-relaxed text-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
)
Body.displayName = 'Body'

export const Small = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
)
Small.displayName = 'Small'

export const Mono = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('font-mono text-sm', className)}
      {...props}
    >
      {children}
    </span>
  )
)
Mono.displayName = 'Mono'
