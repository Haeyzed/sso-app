'use client'

import { CustomSession } from '@/app/api/auth/[...nextauth]/authOptions'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { API_URL, TITLES_URL, USERS_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { type getDictionary } from '@/lib/dictionary'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber
} from 'react-phone-number-input'
import { PhoneInput } from '@/components/phone-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useImmer } from 'use-immer'

interface FormComponentProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
  className?: string
  setOpen: Dispatch<SetStateAction<boolean>>
  isDesktop?: boolean
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

const FormComponent: React.FC<FormComponentProps> = ({
  dictionary,
  className,
  setOpen,
  isDesktop
}) => {
  const { data } = useSession()
  const userSession = data as CustomSession
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      name: '',
      email: '',
      username: '',
      phone_number: '',
      gender: ''
    }
  })
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

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await myAxios.post(USERS_URL, data, {
        headers: {
          Authorization: `Bearer ${userSession.user?.token}`
        }
      })

      if (response?.status === 200) {
        toast.success(dictionary?.form?.successMessage, {
          description: response?.data?.message
        })
        setOpen(false)
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
        router.replace('/login')
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
      <form
        className={cn('grid items-start gap-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-2 gap-4'>
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
                    placeholder={dictionary['form']?.step1?.usernamePlaceholder}
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
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
                          ? genders.find(gender => gender.value === field.value)
                              ?.label
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
          /> */}
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary['form']?.step1?.genderLabel}</FormLabel>
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
          {/* <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {dictionary['form']?.step4?.passwordLabel}
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={dictionary['form']?.step4?.passwordPlaceholder}
                    autoComplete='current-password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
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
      </form>
    </Form>
  )
}

export default FormComponent
