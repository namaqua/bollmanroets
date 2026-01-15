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

export const TrendingUpIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
)
TrendingUpIcon.displayName = 'TrendingUpIcon'

export const SettingsIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
)
SettingsIcon.displayName = 'SettingsIcon'

export const ShieldCheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
)
ShieldCheckIcon.displayName = 'ShieldCheckIcon'

export const BrainCircuitIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
      <path d="M16 8V5c0-1.1.9-2 2-2" />
      <path d="M12 13h4" />
      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
      <path d="M12 8h8" />
      <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    </svg>
  )
)
BrainCircuitIcon.displayName = 'BrainCircuitIcon'

export const ClockIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
)
ClockIcon.displayName = 'ClockIcon'

export const UsersIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
)
UsersIcon.displayName = 'UsersIcon'

export const CalculatorIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
)
CalculatorIcon.displayName = 'CalculatorIcon'
