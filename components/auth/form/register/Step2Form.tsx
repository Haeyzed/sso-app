'use client'

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { API_URL, COUNTRIES_URL } from '@/lib/apiEndPoints'
import { type getDictionary } from '@/lib/dictionary'
import { cn } from '@/lib/utils'
import { RootState, nextStep, setFormData } from '@/redux/formSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { z } from 'zod'
import FormNav from './FormNav'
import FormSectionTitle from './FormSectionTitle'

interface Step2FormProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
}

export const FormSchema = z.object({
  country_id: z.string({
    required_error: 'Please select a country.'
  }),
  state_id: z.string({
    required_error: 'Please select a state.'
  }),
  city_id: z.string({
    required_error: 'Please select a city.'
  })
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
              name='country_id'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>
                    {dictionary['form']?.step2?.countryLabel}
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
                            ? countryData?.find(
                                (country: CountryApiType) =>
                                  country.id.toString() === field.value
                              )?.name
                            : dictionary['form']?.step2?.countryPlaceholder}
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
                  <FormLabel>{dictionary['form']?.step2?.stateLabel}</FormLabel>
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
                            : dictionary['form']?.step2?.statePlaceholder}
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
                  <FormLabel>{dictionary['form']?.step2?.cityLabel}</FormLabel>
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
                            : dictionary['form']?.step2?.cityPlaceholder}
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
            <FormNav dictionary={dictionary} isSubmitting={isSubmitting} />
          </div>
        </motion.div>
      </form>
    </Form>
  )
}

export default Step2Form
