'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RootState, nextStep, setFormData } from '@/redux/formSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'
import FormNav from './FormNav'
import FormSectionTitle from './FormSectionTitle'
import { motion } from 'framer-motion'
import FileUpload from '@/components/file-upload'
import { useTranslations } from 'next-intl'

interface Step3FormProps {}

const Step3Form: React.FC<Step3FormProps> = ({}) => {
  const t = useTranslations('register')
  const dispatch = useDispatch()
  const currentStep = useSelector((state: RootState) => state.form.currentStep)
  const formData = useSelector((state: RootState) => state.form.formData)
  const prevStep = useSelector((state: RootState) => state.form.prevStep)
  const delta = currentStep - prevStep

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    dispatch(setFormData(data))
    dispatch(nextStep())
  }

  const FormSchema = z.object({
    image: z.string().optional()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...formData
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
          <FormSectionTitle title={t('form.step3.titleLabel')} />
          <div className='grid w-full items-center gap-4'>
            <FileUpload />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.step3.imageLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      placeholder={t('form.step3.imagePlaceholder')}
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

export default Step3Form
