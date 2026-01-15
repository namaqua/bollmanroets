import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'
import { H3, Body, Small } from './typography'

interface CaseStudyMetric {
  label: string
  value: string
  highlight?: boolean
}

interface CaseStudyCardProps {
  profile: string
  project: string
  metrics: CaseStudyMetric[]
  className?: string
}

export function CaseStudyCard({
  profile,
  project,
  metrics,
  className,
}: CaseStudyCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-6">
        <Small className="text-muted-foreground mb-2 block">{profile}</Small>
        <H3 className="mb-4">{project}</H3>
        <div className="space-y-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <Small className="text-muted-foreground">{metric.label}</Small>
              <Body
                className={cn(
                  'text-sm font-medium',
                  metric.highlight ? 'text-brass-gold' : 'text-foreground'
                )}
              >
                {metric.value}
              </Body>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface CaseStudyGridProps {
  studies: readonly {
    profile: string
    project: string
    earned: string
    effort: string
  }[]
  earnedLabel?: string
  effortLabel?: string
  className?: string
}

export function CaseStudyGrid({
  studies,
  earnedLabel = 'Earned',
  effortLabel = 'Effort',
  className,
}: CaseStudyGridProps) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {studies.map((study, index) => (
        <CaseStudyCard
          key={index}
          profile={study.profile}
          project={study.project}
          metrics={[
            { label: earnedLabel, value: study.earned, highlight: true },
            { label: effortLabel, value: study.effort },
          ]}
        />
      ))}
    </div>
  )
}
