import { cn } from '@/lib/utils'
import { Body, Small } from './typography'
import { ArrowRightIcon } from './icons'

interface ProcessStep {
  actor: string
  action: string
}

interface ProcessStepsProps {
  steps: readonly ProcessStep[]
  layout?: 'horizontal' | 'vertical'
  className?: string
}

export function ProcessSteps({
  steps,
  layout = 'horizontal',
  className,
}: ProcessStepsProps) {
  return (
    <div
      className={cn(
        'flex',
        layout === 'horizontal' && 'flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2',
        layout === 'vertical' && 'flex-col gap-4',
        className
      )}
    >
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              'flex flex-col items-center text-center',
              layout === 'horizontal' && 'px-4',
              layout === 'vertical' && 'flex-row text-left gap-4'
            )}
          >
            <div
              className={cn(
                'rounded-full bg-brass-gold text-white flex items-center justify-center font-bold',
                layout === 'horizontal' && 'w-12 h-12 mb-2',
                layout === 'vertical' && 'w-10 h-10 flex-shrink-0'
              )}
            >
              {index + 1}
            </div>
            <div className={layout === 'vertical' ? 'flex-1' : undefined}>
              <Small className="text-brass-gold font-medium mb-1 block">
                {step.actor}
              </Small>
              <Body
                className={cn(
                  'text-sm',
                  layout === 'horizontal' && 'max-w-[140px]'
                )}
              >
                {step.action}
              </Body>
            </div>
          </div>

          {/* Arrow between steps */}
          {index < steps.length - 1 && (
            <>
              {layout === 'horizontal' && (
                <ArrowRightIcon
                  size={20}
                  className="text-muted-foreground hidden sm:block"
                />
              )}
              {layout === 'vertical' && (
                <div className="w-10 flex justify-center">
                  <div className="h-4 w-px bg-border" />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

interface NumberedProcessProps {
  steps: readonly ProcessStep[]
  title?: string
  className?: string
}

export function NumberedProcess({
  steps,
  title,
  className,
}: NumberedProcessProps) {
  return (
    <div className={className}>
      {title && (
        <Body className="font-medium text-center mb-8">{title}</Body>
      )}
      <ProcessSteps steps={steps} layout="horizontal" />
    </div>
  )
}
