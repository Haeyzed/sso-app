'use client'

import { Button } from '@/components/ui/button'
import { getDictionary } from '@/lib/dictionary'
import { RootState, prevStep } from '@/redux/formSlice'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface FormNavProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
  isSubmitting?: boolean
}

const FormNav: React.FC<FormNavProps> = ({ dictionary, isSubmitting }) => {
  const dispatch = useDispatch()
  const currentStep = useSelector((state: RootState) => state.form.currentStep)
  const handlePrev = () => {
    dispatch(prevStep())
  }
  const isNotFirstStep = currentStep !== 1
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === 5
  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-2 gap-6'>
        {isNotFirstStep && (
          <Button type='submit' variant='outline' onClick={handlePrev}>
            <ChevronLeft className='mr-2 h-4 w-4' />
            {dictionary['form']?.prevButton}
          </Button>
        )}
        <Button
          type='submit'
          variant='default'
          disabled={isSubmitting}
          // className={isFirstStep ? 'ml-auto' : ''}
        >
          {isLastStep ? (
            <>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {dictionary['form']?.submittingButton}
                </>
              ) : (
                <>
                  {dictionary['form']?.submitButton}
                  <ChevronRight className='ml-2 h-4 w-4' />
                </>
              )}
            </>
          ) : (
            <>
              {dictionary['form']?.nextButton}
              <ChevronRight className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default FormNav
