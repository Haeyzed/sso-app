'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { type getDictionary } from '@/lib/dictionary'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormNav from './FormNav'
import { REGISTER_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/formSlice'
import FormSectionTitle from './FormSectionTitle'
import { motion } from 'framer-motion'

interface Step5FormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
}

export const FormSchema = z.object({
  // Define any specific fields needed for Step 5 (e.g., confirmation details)
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
    console.log('Form data:', data)
    try {
      const response = await myAxios.post(REGISTER_URL, data)

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
