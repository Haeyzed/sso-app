'use client'

import Step1Form from '@/components/auth/form/register/Step1Form'
import Step2Form from '@/components/auth/form/register/Step2Form'
import Step3Form from '@/components/auth/form/register/Step3Form'
import Step4Form from '@/components/auth/form/register/Step4Form'
import Step5Form from '@/components/auth/form/register/Step5Form'
import { RootState } from '@/redux/formSlice'
import { useSelector } from 'react-redux'

interface RegisterLayoutProps {}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({}) => {
  const currentStep = useSelector((state: RootState) => state.form.currentStep)

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form />
      case 2:
        return <Step2Form />
      case 3:
        return <Step3Form />
      case 4:
        return <Step4Form />
      case 5:
        return <Step5Form />
      default:
        return null
    }
  }

  return <div>{renderForm()}</div>
}

export default RegisterLayout
