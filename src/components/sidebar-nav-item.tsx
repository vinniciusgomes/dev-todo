import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Props = {
  onClick: () => void
  icon: React.ElementType
  label: string
  active?: boolean
  count?: number
}

export function SidebarNavItem({ icon, label, onClick, active, count }: Props) {
  const Icon = icon
  return (
    <li
      className={
        active ? 'rounded-md bg-accent hover:text-accent-foreground' : ''
      }
    >
      <Button
        className="flex w-full items-center justify-between px-2"
        variant="ghost"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />

          <span className="text-sm">{label}</span>
        </div>
        {count && <Badge variant="outline">{count > 99 ? '99+' : count}</Badge>}
      </Button>
    </li>
  )
}
