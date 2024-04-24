'use client'

import { CustomSession } from '@/app/api/auth/[...nextauth]/authOptions'
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
import { SEND_OTP_URL, VERIFY_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { type getDictionary } from '@/lib/dictionary'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface VerifyFormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['verify']
}

export const FormSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.'
  })
})

const VerifyForm: React.FC<VerifyFormProps> = ({ dictionary }) => {
  const { data } = useSession()
  const userSession = data as CustomSession
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: ''
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await myAxios.post(VERIFY_URL, data)

      if (response?.status === 200) {
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
      const response = await myAxios.post(SEND_OTP_URL, null, {
        headers: {
          Authorization: `Bearer ${userSession.user?.token}`
        }
      })

      if (response?.status === 200) {
        toast.success(dictionary?.form?.otpSentMessage, {
          description: response?.data?.message
        })
        setIsTimerActive(true)
        setCountdown(30)
      } else {
        toast.error(dictionary?.form?.errorMessage?.default, {
          description: response?.data?.message
        })
      }
    } catch (error: any) {
      toast.error(dictionary?.form?.errorMessage?.default, {
        description: dictionary?.form?.errorMessage?.network
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
                <FormLabel>{dictionary['form']?.otpLabel}</FormLabel>
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
                <FormDescription>
                  {isTimerActive ? (
                    <>Resend OTP in {countdown} seconds</>
                  ) : (
                    dictionary['form']?.otpDescription
                  )}
                </FormDescription>
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

export default VerifyForm
