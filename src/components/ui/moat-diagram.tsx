import { cn } from '@/lib/utils'
import { H3, Body, Small } from './typography'

interface MoatLayer {
  name: string
  mechanism: string
  impact: string
}

interface MoatDiagramProps {
  layers: readonly MoatLayer[]
  compoundingEffect?: string
  className?: string
}

export function MoatDiagram({
  layers,
  compoundingEffect,
  className,
}: MoatDiagramProps) {
  return (
    <div className={cn('relative max-w-4xl mx-auto', className)}>
      {/* Moat Layers - stacked with decreasing width */}
      <div className="space-y-3">
        {layers.map((layer, index) => {
          const width = 100 - (index * 8)
          return (
            <div
              key={index}
              className="mx-auto rounded-lg border border-brass-gold/30 bg-gradient-to-r from-brass-gold/5 to-brass-gold/10 p-4 transition-all hover:border-brass-gold/50 hover:shadow-md"
              style={{ width: `${width}%` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brass-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <H3 className="text-base">{layer.name}</H3>
                </div>
                <div className="sm:text-right pl-11 sm:pl-0">
                  <Body className="text-sm text-muted-foreground">{layer.mechanism}</Body>
                  <Small className="text-brass-gold font-medium">{layer.impact}</Small>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Compounding Effect */}
      {compoundingEffect && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brass-gold/10 border border-brass-gold/30">
            <span className="text-brass-gold">↻</span>
            <Body className="text-sm font-medium text-brass-gold">
              {compoundingEffect}
            </Body>
          </div>
        </div>
      )}
    </div>
  )
}

interface MoatLayerCardProps {
  layer: MoatLayer
  index: number
  className?: string
}

export function MoatLayerCard({ layer, index, className }: MoatLayerCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-brass-gold/30 bg-brass-gold/5 p-4',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-brass-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          {index + 1}
        </div>
        <div className="flex-1">
          <H3 className="text-base mb-1">{layer.name}</H3>
          <Body className="text-sm text-muted-foreground mb-1">{layer.mechanism}</Body>
          <Small className="text-brass-gold font-medium">{layer.impact}</Small>
        </div>
      </div>
    </div>
  )
}
