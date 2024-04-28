import React from 'react'

interface FormSectionTitleProps {
  title: string
}

const FormSectionTitle: React.FC<FormSectionTitleProps> = ({ title }) => {
  return <h2 className='py-4 text-lg font-semibold'>{title}</h2>
}

export default FormSectionTitle
