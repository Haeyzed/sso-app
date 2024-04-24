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
import { CHANGE_PASSWORD_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { type getDictionary } from '@/lib/dictionary'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface ChangePasswordFormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['changePassword']
}

export const FormSchema = z.object({
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

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  dictionary
}) => {
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
                    <Button variant='outline' size='icon'>
                      <RefreshCcw className='h-4 w-4' />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  {dictionary['form']?.otpDescription}
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
                <FormLabel>{dictionary['form']?.passwordLabel}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={dictionary['form']?.passwordPlaceholder}
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
                <FormLabel>
                  {dictionary['form']?.passwordConfirmationLabel}
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={
                      dictionary['form']?.passwordConfirmationPlaceholder
                    }
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

export default ChangePasswordForm
