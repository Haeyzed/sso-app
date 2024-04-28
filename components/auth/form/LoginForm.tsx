'use client'

import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CHECK_CREDENTIALS } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { type getDictionary } from '@/lib/dictionary'
import { messaging } from '@/utils/firebase/firebaseConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { getToken, onMessage } from 'firebase/messaging'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface LoginFormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['login']
}

// const FormSchema = z.object({
//   email: z.string().min(2, { message: dictionary['form']?.validations?.emailMinValidation }),
//   password: z
//     .string()
//     .min(2, { message: dictionary['form']?.validations?.passwordMinValidation }),
//   fcm_token: z.string().optional()
// })

const LoginForm: React.FC<LoginFormProps> = ({ dictionary }) => {

  const { NEXT_PUBLIC_FIREBASE_VAPID_KEY } = process.env
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: NEXT_PUBLIC_FIREBASE_VAPID_KEY
        })
        if (token) {
          setToken(token)
        } else {
          toast.error('Token not registered', {
            description: 'No registration token available. Request permission to generate one.'
          })
        }
      } else if (permission === 'denied') {
        toast.warning('Notification Permission Denied', {
          description: 'You have denied permission for notifications.',
          action: {
            label: 'Request',
            onClick: () => requestPermission()
          }
        })
      }
    }

    requestPermission()
  }, [NEXT_PUBLIC_FIREBASE_VAPID_KEY])

  onMessage(messaging, payload => {
    toast.info(payload?.notification?.title, {
      description: payload?.notification?.body
    })
  })

  const FormSchema = z.object({
    email: z.string().min(2, { message: dictionary['form']?.validations?.emailMinValidation }),
    password: z
      .string()
      .min(2, { message: dictionary['form']?.validations?.passwordMinValidation }),
    fcm_token: z.string().optional()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      data.fcm_token = token ?? ''
      const response = await myAxios.post(CHECK_CREDENTIALS, data)

      if (response?.status === 200) {
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          fcm_token: data.fcm_token,
          redirect: true,
          callbackUrl: '/dashboard'
        })
        toast.success(dictionary?.form?.successMessage, {
          description: response?.data?.message
        })
      } else {
        toast.error(dictionary?.form?.errorMessage?.default, {
          description: response?.data?.message
        })
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error(dictionary?.form?.errorMessage?.default, {
          description: error.response?.data?.message
        })
      } else if (error.response?.status === 422) {
        toast.error(dictionary?.form?.errorMessage?.default, {
          description: dictionary?.form?.errorMessage?.validation
        })
      } else {
        toast.error(dictionary?.form?.errorMessage?.default, {
          description: dictionary?.form?.errorMessage?.network
        })
      }
    } finally {
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid w-full items-center gap-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary['form']?.emailLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={dictionary['form']?.emailPlaceholder}
                    autoComplete='email'
                    {...field}
                  />
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
                <FormLabel>{dictionary['form']?.passwordLabel}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={dictionary['form']?.passwordPlaceholder}
                    autoComplete='current-password'
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
                {dictionary['form']?.submittingButton}
              </>
            ) : (
              dictionary['form']?.submitButton
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
