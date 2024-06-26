'use client'

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
import { RESET_PASSWORD_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface ResetPasswordFormProps {}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({}) => {
  const router = useRouter()
  const t = useTranslations('resetPassword')
  const FormSchema = z.object({
    email: z
      .string()
      .min(2, { message: t('form.validations.emailMinValidation') })
  })

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
        toast.success(t('form.successMessage'), {
          description: response.data.message
        })
        router.push('/change-password')
      } else {
        toast.error(t('form.errorMessage.default'), {
          description: response.data.message
        })
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error(t('form.errorMessage.default'), {
          description: error.response.data.message
        })
      } else if (error.response?.status === 422) {
        toast.error(t('form.errorMessage.default'), {
          description: t('form.errorMessage.validation')
        })
      } else {
        toast.error(t('form.errorMessage.default'), {
          description: t('form.errorMessage.network')
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
                <FormLabel>{t('form.emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.emailPlaceholder')}
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

export default ResetPasswordForm
