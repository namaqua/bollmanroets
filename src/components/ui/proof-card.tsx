import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'
import { H3, Body, Small } from './typography'
import {
  HandshakeIcon,
  UsersIcon,
  CalculatorIcon,
  ClockIcon,
} from './icons'

type IconType = 'crm' | 'hr' | 'cpq' | 'default'

interface ProofCardProps {
  title: string
  description: string
  timeline: string
  icon?: IconType | string
  className?: string
}

const iconMap: Record<IconType, React.ComponentType<{ size?: number; className?: string }>> = {
  crm: HandshakeIcon,
  hr: UsersIcon,
  cpq: CalculatorIcon,
  default: ClockIcon,
}

export function ProofCard({
  title,
  description,
  timeline,
  icon = 'default',
  className,
}: ProofCardProps) {
  const IconComponent = iconMap[icon as IconType] || iconMap.default

  return (
    <Card className={cn('h-full transition-all hover:border-brass-gold/50 hover:shadow-md', className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-brass-gold/10 flex items-center justify-center flex-shrink-0">
            <IconComponent size={24} className="text-brass-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <H3 className="text-lg">{title}</H3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brass-gold/10 text-brass-gold whitespace-nowrap">
                {timeline}
              </span>
            </div>
            <Body className="text-muted-foreground">{description}</Body>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProofGridProps {
  items: readonly { title: string; description: string; timeline: string; icon: string }[]
  className?: string
}

export function ProofGrid({ items, className }: ProofGridProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((item, index) => (
        <ProofCard
          key={index}
          title={item.title}
          description={item.description}
          timeline={item.timeline}
          icon={item.icon}
        />
      ))}
    </div>
  )
}
