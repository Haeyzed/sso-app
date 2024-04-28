'use client'

import { Form } from '@/components/ui/form'
import { REGISTER_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { type getDictionary } from '@/lib/dictionary'
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

interface Step5FormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
}

export const FormSchema = z.object({
  title: z.string({
    required_error: 'Please select a title.'
  }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email format.' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' }),
  phone_number: z
    .string()
    .min(7, { message: 'Phone number must be at least 7 characters.' }),
  gender: z.string({
    required_error: 'Please select a gender.'
  }),
  country_id: z.string({
    required_error: 'Please select a country.'
  }),
  state_id: z.string({
    required_error: 'Please select a state.'
  }),
  city_id: z.string({
    required_error: 'Please select a city.'
  }),
  image: z.string().optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  password_confirmation: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
})

const Step5Form: React.FC<Step5FormProps> = ({ dictionary }) => {
  const formData = useSelector((state: RootState) => state.form.formData)
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
        <FormSectionTitle title={dictionary['form']?.step5?.titleLabel} />
        <div className='grid gap-2 sm:grid-cols-2'>
          <code>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </code>
        </div>
        <div className='grid w-full items-center gap-4'>
          <FormNav dictionary={dictionary} isSubmitting={isSubmitting} />
        </div>
      </form>
    </Form>
  )
}

export default Step5Form
