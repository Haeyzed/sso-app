'use client'

import { CustomSession } from '@/app/api/auth/[...nextauth]/authOptions'
import { PhoneInput } from '@/components/phone-input'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
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
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  API_URL,
  COUNTRIES_URL,
  TITLES_URL,
  USERS_URL
} from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { toast } from 'sonner'
import { useImmer } from 'use-immer'
import { z } from 'zod'

interface FormComponentProps {
  className?: string
  setOpen: Dispatch<SetStateAction<boolean>>
  isDesktop?: boolean
}

const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
] as const

const FormComponent: React.FC<FormComponentProps> = ({
  className,
  setOpen,
  isDesktop
}) => {
  const t = useTranslations('register')
  const { data } = useSession()
  const userSession = data as CustomSession
  const router = useRouter()
  const [titleData, setTitleData] = useImmer<TitleApiType[] | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL + TITLES_URL)
      .then(res => res.json())
      .then(data => {
        setTitleData(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching titles:', error)
      })
  }, [setTitleData])

  const [countryData, setCountriesData] = useImmer<CountryApiType[] | null>(
    null
  )
  const [isCountryLoading, setCountryLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL + COUNTRIES_URL)
      .then(res => res.json())
      .then(data => {
        setCountriesData(data.data)
        setCountryLoading(false)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [setCountriesData])

  const [selectedCountryId, setSelectedCountryId] = useImmer<string | null>(
    null
  )
  const [stateData, setStatesData] = useImmer<StateApiType[] | null>(null)
  const [isStateLoading, setStateLoading] = useState(true)

  useEffect(() => {
    if (selectedCountryId) {
      fetch(`${API_URL}/countries/${selectedCountryId}/states`)
        .then(res => res.json())
        .then(data => {
          setStatesData(data.data)
          setStateLoading(false)
        })
        .catch(error => {
          console.error('Error fetching states:', error)
        })
    }
  }, [selectedCountryId, setStatesData])

  const [selectedStateId, setSelectedStateId] = useImmer<string | null>(null)
  const [cityData, setCitiesData] = useImmer<CityApiType[] | null>(null)
  const [isCityLoading, setCityLoading] = useState(true)

  useEffect(() => {
    if (selectedStateId) {
      fetch(`${API_URL}/states/${selectedStateId}/cities`)
        .then(res => res.json())
        .then(data => {
          setCitiesData(data.data)
          setCityLoading(false)
        })
        .catch(error => {
          console.error('Error fetching cities:', error)
        })
    }
  }, [selectedStateId, setCitiesData])

  const FormSchema = z.object({
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
    image: z.string().optional()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      name: '',
      email: '',
      username: '',
      phone_number: '',
      gender: '',
      country_id: '',
      state_id: '',
      city_id: ''
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await myAxios.post(USERS_URL, data, {
        headers: {
          Authorization: `Bearer ${userSession.user?.token}`
        }
      })

      if (response?.status === 200) {
        toast.success(t('form.successMessage'), {
          description: response.data.message
        })
        setOpen(false)
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
        router.replace('/login')
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
      <form
        className={cn('grid items-start gap-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('form.step1.userTitleLabel')}</FormLabel>
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
                          : t('form.step1.userTitlePlaceholder')}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='p-0'>
                    <Command>
                      <CommandInput placeholder='Search title...' />
                      <CommandList>
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
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.step1.nameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.step1.namePlaceholder')}
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
                <FormLabel>{t('form.step1.emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.step1.emailPlaceholder')}
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
                <FormLabel>{t('form.step1.usernameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form.step1.usernamePlaceholder')}
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
                <FormLabel>{t('form.step1.phoneNumberLabel')}</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder={t('form.step1.phoneNumberPlaceholder')}
                    autoComplete='tel'
                    {...field}
                  />
                </FormControl>
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
                      <CommandList>
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
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='country_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('form.step2.countryLabel')}</FormLabel>
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
                          ? countryData?.find(
                              (country: CountryApiType) =>
                                country.id.toString() === field.value
                            )?.name
                          : t('form.step2.countryPlaceholder')}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='p-0'>
                    <Command>
                      <CommandInput placeholder='Search countries...' />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {(countryData ?? []).map(
                            (country: CountryApiType) => (
                              <CommandItem
                                value={country.name}
                                key={country.id}
                                onSelect={() => {
                                  form.setValue(
                                    'country_id',
                                    country.id.toString()
                                  )
                                  setSelectedCountryId(country.id.toString())
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    country.id.toString() === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {country.name}
                              </CommandItem>
                            )
                          )}
                          {(countryData ?? []).length === 0 && (
                            <CommandItem disabled value=''>
                              No country found.
                            </CommandItem>
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='state_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('form.step2.stateLabel')}</FormLabel>
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
                          ? stateData?.find(
                              (state: StateApiType) =>
                                state.id.toString() === field.value
                            )?.name
                          : t('form.step2.statePlaceholder')}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='p-0'>
                    <Command>
                      <CommandInput placeholder='Search states...' />
                      <CommandList>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                          {(stateData ?? []).map((state: StateApiType) => (
                            <CommandItem
                              value={state.name}
                              key={state.id}
                              onSelect={() => {
                                form.setValue('state_id', state.id.toString())
                                setSelectedStateId(state.id.toString())
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  state.id.toString() === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {state.name}
                            </CommandItem>
                          ))}
                          {(stateData ?? []).length === 0 && (
                            <CommandItem disabled value=''>
                              No state found.
                            </CommandItem>
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>{t('form.step2.cityLabel')}</FormLabel>
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
                          ? cityData?.find(
                              (city: CityApiType) =>
                                city.id.toString() === field.value
                            )?.name
                          : t('form.step2.cityPlaceholder')}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='p-0'>
                    <Command>
                      <CommandInput placeholder='Search cities...' />
                      <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                          {(cityData ?? []).map((city: CityApiType) => (
                            <CommandItem
                              value={city.name}
                              key={city.id}
                              onSelect={() => {
                                form.setValue('city_id', city.id.toString())
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  city.id.toString() === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {city.name}
                            </CommandItem>
                          ))}
                          {(cityData ?? []).length === 0 && (
                            <CommandItem disabled value=''>
                              No city found.
                            </CommandItem>
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
              {t('form.submittingButton')}
            </>
          ) : (
            t('form.saveButton')
          )}
        </Button>
      </form>
    </Form>
  )
}

export default FormComponent
