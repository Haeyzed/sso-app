'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type getDictionary } from '@/lib/dictionary'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormNav from './FormNav'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, nextStep, setFormData } from '@/redux/formSlice'
import FormSectionTitle from './FormSectionTitle'
import { motion } from 'framer-motion'
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber
} from 'react-phone-number-input'
import { PhoneInput } from '@/components/phone-input'
import { useImmer } from 'use-immer'
import { API_URL, TITLES_URL } from '@/lib/apiEndPoints'

interface Step1FormProps {
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
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' })
    .or(z.literal('')),
  gender: z.string({
    required_error: 'Please select a gender.'
  })
})

const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
] as const

const Step1Form: React.FC<Step1FormProps> = ({ dictionary }) => {
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

  const [titleData, setTitleData] = useImmer<TitleApiType[] | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL + TITLES_URL)
      .then(res => res.json())
      .then(data => {
        setTitleData(data.data)
        setLoading(false)
      })
  }, [setTitleData])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <motion.div
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <FormSectionTitle title={dictionary['form']?.step1?.titleLabel} />
          <div className='grid w-full items-center gap-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>
                    {dictionary['form']?.step1?.userTitleLabel}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? titleData?.find(
                                (title: TitleApiType) =>
                                  title.name === field.value
                              )?.name
                            : dictionary['form']?.step1?.userTitlePlaceholder}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='Search title...' />
                        <CommandEmpty>No title found.</CommandEmpty>
                        <CommandGroup>
                          {(titleData ?? []).map((title: TitleApiType) => (
                            <CommandItem
                              value={title.name}
                              key={title.id}
                              onSelect={() => {
                                form.setValue('title', title.name)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  title.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {title.name}
                            </CommandItem>
                          ))}
                          {(titleData ?? []).length === 0 && (
                            <CommandItem disabled value=''>
                              No title found.
                            </CommandItem>
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary['form']?.step1?.userTitleLabel}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            dictionary['form']?.step1?.userTitlePlaceholder
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem
                          disabled
                          value='__LOADING__'
                          className='flex items-center'
                        >
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                          Loading titles...
                        </SelectItem>
                      ) : titleData ? (
                        titleData.map((title: TitleApiType) => (
                          <SelectItem key={title.id} value={title.name}>
                            {title.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value='__CLEAR__'>
                          No titles available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary['form']?.step1?.nameLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dictionary['form']?.step1?.namePlaceholder}
                      autoComplete='name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary['form']?.step1?.emailLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dictionary['form']?.step1?.emailPlaceholder}
                      autoComplete='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary['form']?.step1?.usernameLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        dictionary['form']?.step1?.usernamePlaceholder
                      }
                      autoComplete='username'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary['form']?.step1?.phoneNumberLabel}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry='NG'
                      placeholder={
                        dictionary['form']?.step1?.phoneNumberPlaceholder
                      }
                      autoComplete='tel'
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    <div>
                      National: {field.value && formatPhoneNumber(field.value)}
                      International: {field.value && formatPhoneNumberIntl(field.value)}
                    </div>
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Gender</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? genders.find(
                                gender => gender.value === field.value
                              )?.label
                            : 'Select gender'}
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='Search gender...' />
                        <CommandEmpty>No gender found.</CommandEmpty>
                        <CommandGroup>
                          {genders.map(gender => (
                            <CommandItem
                              value={gender.label}
                              key={gender.value}
                              onSelect={() => {
                                form.setValue('gender', gender.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  gender.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {gender.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dictionary['form']?.step1?.genderLabel}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            dictionary['form']?.step1?.genderPlaceholder
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
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

export default Step1Form
