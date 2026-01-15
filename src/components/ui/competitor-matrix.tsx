import { cn } from '@/lib/utils'
import { H3 } from './typography'
import { CheckIcon } from './icons'

interface CompetitorDimension {
  dimension: string
  competitor: string
  us: string
}

interface CompetitorMatrixProps {
  title?: string
  dimensions: readonly CompetitorDimension[]
  competitorLabel?: string
  usLabel?: string
  className?: string
}

export function CompetitorMatrix({
  title,
  dimensions,
  competitorLabel = 'Competitor',
  usLabel = 'B&R',
  className,
}: CompetitorMatrixProps) {
  return (
    <div className={className}>
      {title && <H3 className="mb-4">{title}</H3>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                Dimension
              </th>
              <th className="text-right p-3 text-sm font-medium text-muted-foreground">
                {competitorLabel}
              </th>
              <th className="text-right p-3 text-sm font-medium text-brass-gold bg-brass-gold/10 rounded-t">
                {usLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((row, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="p-3 text-sm font-medium">{row.dimension}</td>
                <td className="p-3 text-sm text-right text-muted-foreground">
                  {row.competitor}
                </td>
                <td className="p-3 text-sm text-right font-medium text-brass-gold bg-brass-gold/5">
                  <span className="inline-flex items-center gap-1.5">
                    {row.us}
                    <CheckIcon size={14} className="text-brass-gold" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface CompetitorComparisonProps {
  comparisons: Array<{
    title: string
    dimensions: readonly CompetitorDimension[]
    competitorLabel?: string
  }>
  usLabel?: string
  className?: string
}

export function CompetitorComparison({
  comparisons,
  usLabel = 'B&R',
  className,
}: CompetitorComparisonProps) {
  return (
    <div className={cn('grid gap-8 lg:grid-cols-2', className)}>
      {comparisons.map((comparison, index) => (
        <CompetitorMatrix
          key={index}
          title={comparison.title}
          dimensions={comparison.dimensions}
          competitorLabel={comparison.competitorLabel}
          usLabel={usLabel}
        />
      ))}
    </div>
  )
}
