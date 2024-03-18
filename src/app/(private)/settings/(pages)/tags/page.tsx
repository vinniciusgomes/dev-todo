import { getTags } from '@/actions/tag/actions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { CreateTagDialog } from './_components/create-tag-dialog'
import { TagItem } from './_components/tag-item'

export default async function Tags() {
  const tags = await getTags()

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
            <div className="flex items-center justify-end">
              <div>
                <DialogTrigger asChild>
                  <Button size="sm">New tag</Button>
                </DialogTrigger>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {tags?.map((tag) => <TagItem key={tag.id} tag={tag} />)}
            </div>
          </div>
        </div>

        <CreateTagDialog />
      </Dialog>
    </main>
  )
}
