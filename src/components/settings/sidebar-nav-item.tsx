import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  onClick: () => void
  icon: React.ElementType
  label: string
  active?: boolean
}

export function SidebarNavItem({ icon, label, onClick, active }: Props) {
  const Icon = icon
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
          <Icon
            className={cn(
              'h-4 w-4',
              active ? 'text-primary-foreground' : 'text-muted-foreground',
            )}
          />

          <span className="text-sm">{label}</span>
        </div>
      </Button>
    </li>
  )
}
