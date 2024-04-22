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
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import {
  SiGoogle,
  SiFacebook,
  SiTwitter,
  SiLinkedin,
  SiGithub
} from '@icons-pack/react-simple-icons'
import { useState } from 'react'
import myAxios from '@/lib/axios.config'
import { CHECK_CREDENTIALS } from '@/lib/apiEndPoints'
import { signIn } from 'next-auth/react'

const FormSchema = z.object({
  email: z.string().min(2, { message: 'Email must be at least 2 characters.' }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters.' })
})

export default function Login() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true)
      const response = await myAxios.post(CHECK_CREDENTIALS, data)

      if (response?.status === 200) {
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: '/'
        })
        toast.success('Login Successful', {
          description: response?.data?.message
        })
      } else {
        toast.error('Login Failed', { description: response?.data?.message })
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Login Failed', {
          description: error.response?.data?.message
        })
      } else if (error.response?.status === 422) {
        toast.error('Login Failed', {
          description: 'Validation Error. Please check your inputs.'
        })
      } else {
        toast.error('Login Failed', {
          description: 'Something went wrong. Please try again.'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Sign in with your existing account to access personalized content
            and features securely.
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
                        <Input placeholder='Enter your email' {...field} />
                      </FormControl>
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
                        <Input placeholder='Enter your password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='flex justify-between'>
            <Link
              className={buttonVariants({ variant: 'secondary' })}
              href='/register'
            >
              Register
            </Link>
            <Link
              className={buttonVariants({ variant: 'secondary' })}
              href='/reset-password'
            >
              Reset Password
            </Link>
          </div>
          <div className='flex justify-between space-x-4'>
            <Button variant='outline' size='icon'>
              <SiGoogle className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiFacebook className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiTwitter className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiLinkedin className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiGithub className='h-4 w-4' />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
