import * as React from 'react'
import { cn } from '@/lib/utils'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

const iconBase = 'inline-block stroke-current fill-none'
const defaultSize = 24
const defaultStroke = 1.5

export const MenuIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
)
MenuIcon.displayName = 'MenuIcon'

export const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
)
CloseIcon.displayName = 'CloseIcon'

export const GlobeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
)
GlobeIcon.displayName = 'GlobeIcon'

export const LockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
)
LockIcon.displayName = 'LockIcon'

export const HandshakeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <path d="M11 17a4 4 0 0 1-4-4V5" />
      <path d="M7 5l4 4 4-4" />
      <path d="M13 7a4 4 0 0 1 4 4v8" />
      <path d="M17 19l-4-4-4 4" />
    </svg>
  )
)
HandshakeIcon.displayName = 'HandshakeIcon'

export const ArrowRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
)
ArrowRightIcon.displayName = 'ArrowRightIcon'

export const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
)
CheckIcon.displayName = 'CheckIcon'

export const ChevronDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = defaultSize, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={defaultStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(iconBase, className)}
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
)
ChevronDownIcon.displayName = 'ChevronDownIcon'
