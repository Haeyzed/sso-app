'use client'

import { Form } from '@/components/ui/form'
import { REGISTER_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { RootState } from '@/redux/formSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { z } from 'zod'
import FormNav from './FormNav'
import FormSectionTitle from './FormSectionTitle'
import { useTranslations } from 'next-intl'
import { isValidPhoneNumber } from 'react-phone-number-input'

interface Step5FormProps {}

const Step5Form: React.FC<Step5FormProps> = ({}) => {
  const t = useTranslations('register')
  const formData = useSelector((state: RootState) => state.form.formData)

  const FormSchema = z
    .object({
      title: z.string({
        required_error: t('form.step1.validations.titleRequiredError')
      }),
      name: z.string().min(2, {
        message: t('form.step1.validations.nameMinValidation')
      }),
      email: z.string().email({
        message: t('form.step1.validations.emailMinValidation')
      }),
      username: z.string().min(3, {
        message: t('form.step1.validations.usernameMinValidation')
      }),
      phone_number: z
        .string()
        .refine(isValidPhoneNumber, {
          message: t('form.step1.validations.phoneNumberRefineValidation')
        })
        .or(z.literal('')),
      gender: z.string({
        required_error: t('form.step1.validations.genderRequiredError')
      }),
      country_id: z.string({
        required_error: t('form.step2.validations.countryIdRequiredError')
      }),
      state_id: z.string({
        required_error: t('form.step2.validations.stateIdRequiredError')
      }),
      city_id: z.string({
        required_error: t('form.step2.validations.cityIdRequiredError')
      }),
      image: z.string().optional(),
      password: z
        .string()
        .min(6, { message: t('form.step4.validations.passwordMinValidation') }),
      password_confirmation: z.string().min(6, {
        message: t('form.step4.validations.passwordConfirmationMinValidation')
      }),
      fcm_token: z.string().optional()
    })
    .refine(data => data.password === data.password_confirmation, {
      message: t('form.step4.validations.passwordMismatch'),
      path: ['password_confirmation']
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...formData
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await myAxios.post(REGISTER_URL, data)

      if (response?.status === 200) {
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: '/'
        })
        toast.success(t('form.successMessage'), {
          description: response?.data?.message
        })
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
        <FormSectionTitle title={t('form.step5.titleLabel')} />
        <div className='grid gap-2 sm:grid-cols-2'>
          <code>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </code>
        </div>
        <div className='grid w-full items-center gap-4'>
          <FormNav isSubmitting={isSubmitting} />
        </div>
      </form>
    </Form>
  )
}

export default Step5Form
