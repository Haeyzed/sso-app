'use client'

import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
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
import { CHANGE_PASSWORD_URL, SEND_OTP_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useRouter } from '@/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

interface ChangePasswordFormProps {}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({}) => {
  const router = useRouter()
  const t = useTranslations('changePassword')
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [isLoading, setIsLoading] = useState(false)

  const FormSchema = z
    .object({
      otp: z.string().min(6, {
        message: t('form.validations.otpMinValidation')
      }),
      password: z
        .string()
        .min(6, { message: t('form.validations.passwordMinValidation') }),
      password_confirmation: z.string().min(6, {
        message: t('form.validations.passwordConfirmationMinValidation')
      })
    })
    .refine(data => data.password === data.password_confirmation, {
      message: t('form.validations.passwordMismatch'),
      path: ['password_confirmation']
    })

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
        toast.success(t('form.successMessage'), {
          description: response?.data?.message
        })
        router.push('/login')
      } else {
        toast.error(t('form.errorMessage.default'), {
          description: response?.data?.message
        })
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error(t('form.errorMessage.default'), {
          description: error.response?.data?.message
        })
      } else if (error.response?.status === 422) {
        toast.error(t('form.errorMessage.default'), {
          description: t('form.errorMessage?validation')
        })
      } else {
        toast.error(t('form.errorMessage.default'), {
          description: t('form.errorMessage?.network')
        })
      }
    } finally {
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTimerActive) {
      interval = setInterval(() => {
        setCountdown(prevCount => {
          if (prevCount === 1) {
            clearInterval(interval)
            setIsTimerActive(false)
          }
          return prevCount - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTimerActive])

  const handleSendOTP = async () => {
    setIsLoading(true)
    try {
      const response = await myAxios.post(SEND_OTP_URL, null)

      if (response?.status === 200) {
        toast.success(t('form.otpSentMessage'), {
          description: response?.data?.message
        })
        setIsTimerActive(true)
        setCountdown(30)
      } else {
        toast.error(t('form.errorMessage.default'), {
          description: response?.data?.message
        })
      }
    } catch (error: any) {
      toast.error(t('form.errorMessage.default'), {
        description: t('form.errorMessage.network')
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid w-full items-center gap-4'>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.otpLabel')}</FormLabel>
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
                    <Button
                      variant='outline'
                      size='icon'
                      disabled={isLoading || isTimerActive}
                      onClick={handleSendOTP}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className='h-4 w-4 animate-spin' />
                        </>
                      ) : (
                        <RefreshCcw className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>{t('form.otpDescription')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.passwordLabel')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t('form.passwordPlaceholder')}
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
                <FormLabel>{t('form.passwordConfirmationLabel')}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t('form.passwordConfirmationPlaceholder')}
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
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                {t('form.submittingButton')}
              </>
            ) : (
              t('form.submitButton')
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ChangePasswordForm
