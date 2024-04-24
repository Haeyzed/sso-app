'use client'

import { RootState } from '@/redux/formSlice'
import { Check } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

interface Step {
  id: number
  label: string
}

const RegisterStepper: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.form.currentStep)

  const steps: Step[] = [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
    { id: 5, label: '5' }
  ]

  return (
    <div className='flex w-full items-center justify-between'>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              currentStep > index + 1
                ? 'bg-green-500 text-white'
                : currentStep === index + 1
                  ? 'bg-primary text-white'
                  : 'border-background'
            }`}
          >
            {currentStep > index + 1 ? (
              <Check className='h-4 w-4' />
            ) : (
              step.label
            )}
          </div>
          {index !== steps.length - 1 && (
            <div
              className={`h-0.5 w-8 ${
                currentStep > index + 1
                  ? 'bg-green-500'
                  : currentStep === index + 1
                    ? 'bg-primary'
                    : 'bg-background'
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default RegisterStepper
