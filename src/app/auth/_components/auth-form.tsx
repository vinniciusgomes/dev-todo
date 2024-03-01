'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Icons } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, register } = useForm<SignInForm>()

  const onSubmit = async (data: SignInForm) => {
    if (!data.email)
      return toast.error('Invalid email', {
        description: 'Please enter a valid email.',
      })

    setIsLoading(true)

    try {
      await signIn('email', {
        email: data.email,
        redirect: false,
      })

      toast.success('Check your email', {
        description: 'We sent you a login link. Please check your email.',
      })
    } catch (err) {
      toast.error('Error', {
        description: 'Something went wrong.',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email')}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" disabled={isLoading}>
            <Icons.google className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
          <Button variant="outline" type="button" disabled={isLoading}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          disabled={isLoading}
        >
          <Icons.apple className="mr-2 h-4 w-4" />
          Login with Apple
        </Button>
      </div>
    </div>
  )
}
