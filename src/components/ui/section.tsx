import * as React from 'react'
import { cn } from '@/lib/utils'
import { Container } from './container'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  containerClassName?: string
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn('py-16 sm:py-20 lg:py-24', className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
)
Section.displayName = 'Section'
