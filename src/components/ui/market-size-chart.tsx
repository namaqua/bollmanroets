import { cn } from '@/lib/utils'
import { Body, Small } from './typography'

interface MarketSize {
  label: string
  value: string
  description: string
}

interface MarketSizeChartProps {
  tam: MarketSize
  sam: MarketSize
  som: MarketSize
  variant?: 'circles' | 'funnel' | 'cards'
  className?: string
}

export function MarketSizeChart({
  tam,
  sam,
  som,
  variant = 'circles',
  className,
}: MarketSizeChartProps) {
  if (variant === 'cards') {
    return (
      <div className={cn('grid gap-6 sm:grid-cols-3', className)}>
        {[tam, sam, som].map((market, index) => (
          <MarketCard
            key={market.label}
            market={market}
            highlight={index === 2}
          />
        ))}
      </div>
    )
  }

  if (variant === 'funnel') {
    return (
      <div className={cn('flex flex-col items-center gap-2', className)}>
        {[tam, sam, som].map((market, index) => {
          const width = 100 - (index * 20)
          return (
            <div
              key={market.label}
              className={cn(
                'rounded-lg p-4 text-center transition-all',
                index === 2
                  ? 'bg-brass-gold text-white'
                  : 'bg-accent border'
              )}
              style={{ width: `${width}%` }}
            >
              <Small className={index === 2 ? 'text-white/70' : 'text-muted-foreground'}>
                {market.label}
              </Small>
              <Body className={cn(
                'text-2xl font-bold',
                index === 2 ? 'text-white' : 'text-foreground'
              )}>
                {market.value}
              </Body>
              <Small className={index === 2 ? 'text-white/70' : 'text-muted-foreground'}>
                {market.description}
              </Small>
            </div>
          )
        })}
      </div>
    )
  }

  // Default: concentric circles
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className="relative w-80 h-80">
        {/* TAM - Outer circle */}
        <div className="absolute inset-0 rounded-full border-2 border-border bg-accent/30 flex items-center justify-center">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
            <Small className="text-muted-foreground font-medium">{tam.label}</Small>
            <Body className="text-lg font-bold">{tam.value}</Body>
          </div>
        </div>

        {/* SAM - Middle circle */}
        <div className="absolute inset-12 rounded-full border-2 border-border bg-accent/50 flex items-center justify-center">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
            <Small className="text-muted-foreground font-medium">{sam.label}</Small>
            <Body className="text-lg font-bold">{sam.value}</Body>
          </div>
        </div>

        {/* SOM - Inner circle (highlighted) */}
        <div className="absolute inset-24 rounded-full bg-brass-gold text-white flex flex-col items-center justify-center">
          <Small className="text-white/80 font-medium">{som.label}</Small>
          <Body className="text-xl font-bold">{som.value}</Body>
          <Small className="text-white/70 text-center px-2">{som.description}</Small>
        </div>
      </div>
    </div>
  )
}

interface MarketCardProps {
  market: MarketSize
  highlight?: boolean
  className?: string
}

export function MarketCard({ market, highlight, className }: MarketCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6 text-center transition-all',
        highlight
          ? 'bg-brass-gold text-white border-brass-gold'
          : 'bg-accent border',
        className
      )}
    >
      <Small className={cn(
        'font-medium',
        highlight ? 'text-white/80' : 'text-muted-foreground'
      )}>
        {market.label}
      </Small>
      <Body className={cn(
        'text-3xl font-bold my-2',
        highlight ? 'text-white' : 'text-foreground'
      )}>
        {market.value}
      </Body>
      <Small className={highlight ? 'text-white/70' : 'text-muted-foreground'}>
        {market.description}
      </Small>
    </div>
  )
}
