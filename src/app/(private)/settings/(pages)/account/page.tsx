import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/services/auth'

export default async function Account() {
  const session = await auth()

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl">Account</h1>
        <span className="text-sm text-muted-foreground">
          Manage your DevToDo account
        </span>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div>
          <p className="mb-2 text-sm font-medium">Profile picture</p>
          <Avatar className="h-20 w-20 md:h-36 md:w-36">
            {session?.user?.image && (
              <AvatarImage
                src={session?.user?.image}
                alt={session?.user?.name ?? ''}
              />
            )}
            <AvatarFallback>
              {session?.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-sm font-medium">Email</p>
          <span className="text-sm text-muted-foreground">
            {session?.user?.email}
          </span>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Full name</p>
          <div>
            <Input className="shadow-none" value={session?.user?.name ?? ''} />
            <span className="text-xs text-muted-foreground">
              This is the name that will be displayed on your profile and in
              emails.
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Username </p>

          <div className="relative flex items-center">
            <span className="absolute left-4 text-muted-foreground">@</span>
            <Input
              placeholder="Your username"
              className="pl-9 shadow-none"
              value={
                session?.user?.name?.replaceAll(' ', '').toLocaleLowerCase() ??
                ''
              }
            />
          </div>
          <span className="text-xs text-muted-foreground">
            This is the name that will be displayed on your profile and in
            emails.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button className="mt-4 w-max" size="default">
            Update account
          </Button>
          <Button
            className="mt-4 w-max text-red-600"
            size="default"
            variant="outline"
          >
            Delete account
          </Button>
        </div>
      </div>
    </main>
  )
}
