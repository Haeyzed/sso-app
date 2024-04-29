'use client'

import { Button } from '@/components/ui/button'
import { RootState, prevStep } from '@/redux/formSlice'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface FormNavProps {
  isSubmitting?: boolean
}

const FormNav: React.FC<FormNavProps> = ({ isSubmitting }) => {
  const t = useTranslations('register')
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
            {t('form.prevButton')}
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
                  {t('form.submittingButton')}
                </>
              ) : (
                <>
                  {t('form.submitButton')}
                  <ChevronRight className='ml-2 h-4 w-4' />
                </>
              )}
            </>
          ) : (
            <>
              {t('form.nextButton')}
              <ChevronRight className='ml-2 h-4 w-4' />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default FormNav
