'use client'

import { useEffect, useState } from 'react'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RESET_PASSWORD_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/i18n.config'

const FormSchema = z.object({
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters.'
  })
})

export default function ResetPassword({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  })
  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await myAxios.post(RESET_PASSWORD_URL, data)

      if (response?.status === 200) {
        toast.success('Reset Password Successful', {
          description: response?.data?.message
        })
      } else {
        toast.error('Reset Password Failed', {
          description: response?.data?.message
        })
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Reset Password Failed', {
          description: error.response?.data?.message
        })
      } else if (error.response?.status === 422) {
        toast.error('Reset Password Failed', {
          description: 'Validation Error. Please check your inputs.'
        })
      } else {
        toast.error('Reset Password Failed', {
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
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Recover access to your account by resetting your forgotten password
            with a secure verification process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid w-full items-center gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your email'
                          autoComplete='email'
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
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                      Resetting password...
                    </>
                  ) : (
                    'Reset Password'
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
