'use client'

import Step1Form from '@/components/auth/form/register/Step1Form'
import Step2Form from '@/components/auth/form/register/Step2Form'
import Step3Form from '@/components/auth/form/register/Step3Form'
import Step4Form from '@/components/auth/form/register/Step4Form'
import Step5Form from '@/components/auth/form/register/Step5Form'
import { getDictionary } from '@/lib/dictionary'
import { RootState } from '@/redux/formSlice'
import { useSelector } from 'react-redux'

interface RegisterLayoutProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ dictionary }) => {
  const currentStep = useSelector((state: RootState) => state.form.currentStep)

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form dictionary={dictionary} />
      case 2:
        return <Step2Form dictionary={dictionary} />
      case 3:
        return <Step3Form dictionary={dictionary} />
      case 4:
        return <Step4Form dictionary={dictionary} />
      case 5:
        return <Step5Form dictionary={dictionary} />
      default:
        return null
    }
  }

  return <div>{renderForm()}</div>
}

export default RegisterLayout
