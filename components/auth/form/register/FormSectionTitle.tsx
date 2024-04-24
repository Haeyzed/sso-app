import React from 'react'

interface FormSectionTitleProps {
  title: string
}

const FormSectionTitle: React.FC<FormSectionTitleProps> = ({ title }) => {
  return <>{title}</>
}

export default FormSectionTitle
