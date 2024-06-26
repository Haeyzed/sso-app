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
import { RootState, nextStep, setFormData } from '@/redux/formSlice'
import { messaging } from '@/utils/firebase/firebaseConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { getToken, onMessage } from 'firebase/messaging'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'
import FormNav from './FormNav'
import FormSectionTitle from './FormSectionTitle'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

interface Step4FormProps {}

const Step4Form: React.FC<Step4FormProps> = ({}) => {
  const t = useTranslations('register')
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
            description:
              'No registration token available. Request permission to generate one.'
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

  const dispatch = useDispatch()
  const currentStep = useSelector((state: RootState) => state.form.currentStep)
  const formData = useSelector((state: RootState) => state.form.formData)
  const updatedFormData = { ...formData, fcm_token: token ?? '' }
  const prevStep = useSelector((state: RootState) => state.form.prevStep)
  const delta = currentStep - prevStep

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    dispatch(setFormData(data))
    dispatch(nextStep())
  }

  const FormSchema = z
    .object({
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
      ...updatedFormData
    }
  })

  const isSubmitting = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <FormSectionTitle title={t('form.step4.titleLabel')} />
          <div className='grid w-full items-center gap-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.step4.passwordLabel')}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t('form.step4.passwordPlaceholder')}
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
                    {t('form.step4.passwordConfirmationLabel')}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t(
                        'form.step4.passwordConfirmationPlaceholder'
                      )}
                      autoComplete='new-password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormNav isSubmitting={isSubmitting} />
          </div>
        </motion.div>
      </form>
    </Form>
  )
}

export default Step4Form
