import { cn } from '@/lib/utils'
import { H3 } from './typography'

interface RevenueTableColumn {
  key: string
  label: string
  highlight?: boolean
  align?: 'left' | 'right' | 'center'
}

interface RevenueTableProps<T extends Record<string, string | number>> {
  title?: string
  columns: RevenueTableColumn[]
  rows: readonly T[]
  highlightColumn?: string
  className?: string
}

export function RevenueTable<T extends Record<string, string | number>>({
  title,
  columns,
  rows,
  highlightColumn,
  className,
}: RevenueTableProps<T>) {
  return (
    <div className={className}>
      {title && <H3 className="mb-4">{title}</H3>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((col) => {
                const isHighlight = col.highlight || col.key === highlightColumn
                return (
                  <th
                    key={col.key}
                    className={cn(
                      'p-3 text-sm font-medium',
                      col.align === 'left' && 'text-left',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      !col.align && (col.key === columns[0]?.key ? 'text-left' : 'text-right'),
                      isHighlight
                        ? 'text-brass-gold bg-brass-gold/10 rounded-t'
                        : 'text-muted-foreground'
                    )}
                  >
                    {col.label}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-border/50">
                {columns.map((col) => {
                  const isHighlight = col.highlight || col.key === highlightColumn
                  const value = row[col.key as keyof T]
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        'p-3 text-sm',
                        col.align === 'left' && 'text-left',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                        !col.align && (col.key === columns[0]?.key ? 'text-left font-medium' : 'text-right'),
                        isHighlight
                          ? 'font-medium text-brass-gold bg-brass-gold/5'
                          : col.key === columns[0]?.key
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {value}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
