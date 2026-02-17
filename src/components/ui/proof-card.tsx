import { cn } from '@/lib/utils'
import { Card, CardContent } from './card'
import { H3, Body } from './typography'

interface ProofCardProps {
  title: string
  description: string
  className?: string
}

export function ProofCard({
  title,
  description,
  className,
}: ProofCardProps) {
  return (
    <Card className={cn('h-full transition-all hover:border-brass-gold/50 hover:shadow-md', className)}>
      <CardContent className="p-6">
        <H3 className="text-lg mb-2">{title}</H3>
        <Body className="text-muted-foreground">{description}</Body>
      </CardContent>
    </Card>
  )
}

interface ProofGridProps {
  items: readonly { title: string; description: string; timeline?: string; icon?: string }[]
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
        />
      ))}
    </div>
  )
}
