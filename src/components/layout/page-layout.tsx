import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Footer } from './footer'
import { Header } from './header'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main
        id="main-content"
        className={cn('flex-1', className)}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
