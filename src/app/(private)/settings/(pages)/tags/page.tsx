'use client'

import { useQuery } from '@tanstack/react-query'
import { Eye, Pen, Search, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { getTags } from '@/services/api/routes'

import { CreateTagDialog } from './_components/create-tag-dialog'

export default function Tags() {
  const [searchValue, setSearchValue] = useState('')
  const { push } = useRouter()

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: Infinity,
  })

  const filteredTags = tags?.filter((tag) =>
    tag.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <main className="flex flex-col gap-8">
      <Dialog>
        <div>
          <h1 className="text-xl">Tags</h1>
          <span className="text-sm text-muted-foreground">
            Manage your tags
          </span>
        </div>
        <Separator />
        <div>
          <span className="text-sm text-muted-foreground">
            Use tag and tag groups to help organize and filter issues in your
            workspace. Tag created in this section are available for all teams
            to use. To create tag or tag groups that only apply to certain
            teams, add them in the team-specific tag settings.
          </span>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by name..."
                  className="pl-8 shadow-none"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <div>
                <DialogTrigger asChild>
                  <Button size="sm">New tag</Button>
                </DialogTrigger>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {filteredTags?.map((tag) => (
                <Card
                  className="flex items-center justify-between rounded-sm border-border px-4 py-2 shadow-none"
                  key={tag.id}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', tag.color)} />
                    <span className="text-sm">{tag.name}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Eye
                      className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                      onClick={() =>
                        push(
                          `/app/${tag.name.replaceAll(' ', '-').toLocaleLowerCase()}`,
                        )
                      }
                    />
                    <Pen className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                    <Trash className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <CreateTagDialog />
      </Dialog>
    </main>
  )
}
