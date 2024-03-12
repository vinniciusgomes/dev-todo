import { Eye, MoreVertical, Pen, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Tags() {
  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl">Tags</h1>
        <span className="text-sm text-muted-foreground">Manage your tags</span>
      </div>
      <Separator />
      <div>
        <span className="text-sm text-muted-foreground">
          Use tag and tag groups to help organize and filter issues in your
          workspace. Tag created in this section are available for all teams to
          use. To create tag or tag groups that only apply to certain teams, add
          them in the team-specific tag settings.
        </span>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by name..."
                className="pl-8 shadow-none"
              />
            </div>

            <div>
              <Button size="sm">New tag</Button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Card className="flex items-center justify-between rounded-sm border-border px-4 py-2 shadow-none">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="text-sm">Personal</span>
              </div>

              <div className="flex items-center gap-4">
                <Eye className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                <Pen className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                <MoreVertical className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
              </div>
            </Card>
            <Card className="flex items-center justify-between rounded-sm px-4 py-2 shadow-none">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span className="text-sm">Work</span>
              </div>

              <div className="flex items-center gap-4">
                <Eye className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                <Pen className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                <MoreVertical className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
              </div>
            </Card>
            <Card className="flex items-center justify-between rounded-sm px-4 py-2 shadow-none">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-sm">Family</span>
              </div>

              <div className="flex items-center gap-4">
                <Eye className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                <Pen className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                <MoreVertical className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
