import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type Props = {
  onClick: () => void
  label: string
  active?: boolean
  color?: string
  count?: number
  collapsed?: boolean
}

export function SidebarTag({
  label,
  onClick,
  active,
  count,
  color = 'bg-zinc-300',
  collapsed,
}: Props) {
  return (
    <li
      className={
        active
          ? 'rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90'
          : ''
      }
    >
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'flex w-full items-center justify-between',
              collapsed && 'justify-center',
              active &&
                'rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:text-primary-foreground',
            )}
            variant="ghost"
            onClick={onClick}
          >
            <div className="flex items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full', color)} />

              {collapsed ? (
                <span className="sr-only">{label}</span>
              ) : (
                <span className="text-sm">{label}</span>
              )}
            </div>

            {!collapsed && <Badge variant="secondary">{count}</Badge>}
          </Button>
        </TooltipTrigger>

        {collapsed && (
          <TooltipContent side="right" className="flex items-center gap-4">
            {label}

            <Badge variant="secondary">{count}</Badge>
          </TooltipContent>
        )}
      </Tooltip>
    </li>
  )
}
