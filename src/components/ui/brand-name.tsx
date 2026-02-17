import * as React from 'react'

interface BrandNameProps {
  prefix?: string
  className?: string
}

/**
 * Renders "Bollman & Roets" with the ampersand in brass-gold color.
 * Optionally accepts a prefix like "Why" or "Warum".
 */
export function BrandName({ prefix, className }: BrandNameProps) {
  return (
    <span className={className}>
      {prefix && <>{prefix} </>}
      <span className="text-midnight-navy">Bollman</span>
      {' '}
      <span className="text-brass-gold font-brand font-semibold">&amp;</span>
      {' '}
      <span className="text-midnight-navy">Roets</span>
    </span>
  )
}
