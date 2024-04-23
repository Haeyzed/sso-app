'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PasswordInput } from '@/components/password-input'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { Locale } from '@/i18n.config'
import { CHANGE_PASSWORD_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { cn } from '@/lib/utils'
import { Loader2, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.'
  }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters.' }),
  password_confirmation: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters.' })
})

export default function ChangePassword({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
      password: '',
      password_confirmation: ''
    }
  })
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await myAxios.post(CHANGE_PASSWORD_URL, data)

      if (response?.status === 200) {
        toast.success('Change Password Successful', {
          description: response?.data?.message
        })
      } else {
        toast.error('Change Password Failed', {
          description: response?.data?.message
        })
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Change Password Failed', {
          description: error.response?.data?.message
        })
      } else if (error.response?.status === 422) {
        toast.error('Change Password Failed', {
          description: 'Validation Error. Please check your inputs.'
        })
      } else {
        toast.error('Change Password Failed', {
          description: 'Something went wrong. Please try again.'
        })
      }
    } finally {
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your account password easily for enhanced security and
            control over your login credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid w-full items-center gap-4'>
                <FormField
                  control={form.control}
                  name='otp'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <div className='flex items-center gap-1'>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup className='space-x-1'>
                              <InputOTPSlot
                                className='rounded-md border bg-background'
                                index={0}
                              />
                              <InputOTPSlot
                                className='rounded-md border bg-background'
                                index={1}
                              />
                              <InputOTPSlot
                                className='rounded-md border bg-background'
                                index={2}
                              />
                              <InputOTPSlot
                                className='rounded-md border bg-background'
                                index={3}
                              />
                              <InputOTPSlot
                                className='rounded-md border bg-background'
                                index={4}
                              />
                              <InputOTPSlot
                                className='rounded-md border bg-background'
                                index={5}
                              />
                            </InputOTPGroup>
                          </InputOTP>
                          <Button variant='outline' size='icon'>
                            <RefreshCcw className='h-4 w-4' />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder='Enter your password'
                          autoComplete='new-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password_confirmation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Re-type Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder='Re-type your password'
                          autoComplete='new-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Changing
                      password...
                    </>
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
            href='/login'
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
