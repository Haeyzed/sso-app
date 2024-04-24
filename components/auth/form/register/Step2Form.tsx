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

interface Step2FormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
}

export const FormSchema = z.object({
  country: z
    .string()
    .min(2, { message: 'Country must be at least 2 characters.' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' })
})

const Step2Form: React.FC<Step2FormProps> = ({ dictionary }) => {
  const dispatch = useDispatch()
  const currentStep = useSelector((state: RootState) => state.form.currentStep)
  const formData = useSelector((state: RootState) => state.form.formData)
  const prevStep = useSelector((state: RootState) => state.form.prevStep)
  const delta = currentStep - prevStep
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...formData
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
          <FormSectionTitle title={dictionary['form']?.step2?.titleLabel} />
          <div className='grid w-full items-center gap-4'>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary['form']?.step2?.countryLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        dictionary['form']?.step2?.countryPlaceholder
                      }
                      autoComplete='country'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary['form']?.step2?.stateLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dictionary['form']?.step2?.statePlaceholder}
                      autoComplete='state'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary['form']?.step2?.cityLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dictionary['form']?.step2?.cityPlaceholder}
                      autoComplete='city'
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

export default Step2Form
