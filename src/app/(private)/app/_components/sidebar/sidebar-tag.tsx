import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  onClick: () => void
  label: string
  active?: boolean
  color?: string
  count?: number
}

export function SidebarTag({
  label,
  onClick,
  active,
  count,
  color = 'bg-zinc-300',
}: Props) {
  return (
    <li
      className={
        active
          ? 'rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90'
          : ''
      }
    >
      <Button
        className={cn(
          'flex w-full items-center justify-between px-2',
          active &&
            'rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:text-primary-foreground',
        )}
        variant="ghost"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <span className={cn('h-2 w-2 rounded-full', color)} />
          <span className="text-sm">{label}</span>
        </div>

        <Badge variant="secondary">{count}</Badge>
      </Button>
    </li>
  )
}
