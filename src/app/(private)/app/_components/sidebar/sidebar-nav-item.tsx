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
  icon: React.ElementType
  label: string
  active?: boolean
  count?: number
  collapsed?: boolean
}

export function SidebarNavItem({
  icon,
  label,
  onClick,
  active,
  count,
  collapsed,
}: Props) {
  const Icon = icon
  return (
    <Tooltip delayDuration={0}>
      <li
        className={
          active
            ? 'rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90'
            : ''
        }
      >
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'flex w-full items-center justify-between ',
              active &&
                'rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:text-primary-foreground',
            )}
            variant="ghost"
            onClick={onClick}
          >
            <div className="flex items-center gap-2">
              <Icon
                className={cn(
                  'h-4 w-4',
                  active ? 'text-primary-foreground' : 'text-muted-foreground',
                )}
              />

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
          <TooltipContent side="right" className="z-50 flex items-center gap-4">
            {label}

            <Badge variant="secondary">{count}</Badge>
          </TooltipContent>
        )}
      </li>
    </Tooltip>
  )
}
