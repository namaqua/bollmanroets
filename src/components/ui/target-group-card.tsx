import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'
import { H3, Body } from './typography'
import {
  TrendingUpIcon,
  SettingsIcon,
  ShieldCheckIcon,
  BrainCircuitIcon,
} from './icons'

type IconType = 'progress' | 'niche' | 'control' | 'ai'

interface TargetGroupCardProps {
  icon: IconType | string
  title: string
  description: string
  className?: string
}

const iconMap: Record<IconType, React.ComponentType<{ size?: number; className?: string }>> = {
  progress: TrendingUpIcon,
  niche: SettingsIcon,
  control: ShieldCheckIcon,
  ai: BrainCircuitIcon,
}

export function TargetGroupCard({
  icon,
  title,
  description,
  className,
}: TargetGroupCardProps) {
  const IconComponent = iconMap[icon as IconType] || TrendingUpIcon

  return (
    <Card className={cn('h-full transition-all hover:border-brass-gold/50 hover:shadow-md', className)}>
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 rounded-lg bg-brass-gold/10 flex items-center justify-center mb-4 mx-auto">
          <IconComponent size={24} className="text-brass-gold" />
        </div>
        <H3 className="text-lg mb-2">{title}</H3>
        <Body className="text-muted-foreground">{description}</Body>
      </CardContent>
    </Card>
  )
}

interface TargetGroupGridProps {
  cards: readonly { icon: string; title: string; description: string }[]
  className?: string
}

export function TargetGroupGrid({ cards, className }: TargetGroupGridProps) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {cards.map((card, index) => (
        <TargetGroupCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  )
}
