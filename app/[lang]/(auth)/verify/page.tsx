'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { Loader2, RefreshCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.'
  })
})

export default function Verify() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: ''
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast('You submitted the following values:', {
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Verify</CardTitle>
          <CardDescription>
            Confirm your email address or account ownership through a simple
            verification step for added security.
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
                <Button type='submit'>Verify</Button>
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
