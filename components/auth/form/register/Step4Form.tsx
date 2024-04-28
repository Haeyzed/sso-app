'use client'

import { PasswordInput } from '@/components/password-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { type getDictionary } from '@/lib/dictionary'
import { RootState, nextStep, setFormData } from '@/redux/formSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'
import FormNav from './FormNav'
import FormSectionTitle from './FormSectionTitle'
import { motion } from 'framer-motion'
import useFCM from '@/hooks/useFCM'

interface Step4FormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
}

export const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    password_confirmation: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    fcm_token: z.string().optional()
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'Password does not match',
    path: ['password_confirmation']
  })

const Step4Form: React.FC<Step4FormProps> = ({ dictionary }) => {
  const { messages, fcmToken } = useFCM()
  const dispatch = useDispatch()
  const currentStep = useSelector((state: RootState) => state.form.currentStep)
  const formData = useSelector((state: RootState) => state.form.formData)
  const updatedFormData = { ...formData, fcm_token: fcmToken ?? '' }
  const prevStep = useSelector((state: RootState) => state.form.prevStep)
  const delta = currentStep - prevStep
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...updatedFormData
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    dispatch(setFormData(data))
    dispatch(nextStep())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <FormSectionTitle title={dictionary['form']?.step4?.titleLabel} />
          <div className='grid w-full items-center gap-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary['form']?.step4?.passwordLabel}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={
                        dictionary['form']?.step4?.passwordPlaceholder
                      }
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
                    {dictionary['form']?.step4?.passwordConfirmationLabel}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={
                        dictionary['form']?.step4
                          ?.passwordConfirmationPlaceholder
                      }
                      autoComplete='new-password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormNav dictionary={dictionary} isSubmitting={isSubmitting} />
          </div>
        </motion.div>
      </form>
    </Form>
  )
}

export default Step4Form
