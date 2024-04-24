import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function LanguageToggle() {
  return (
    <Select>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Theme' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='light'>Light</SelectItem>
        <SelectItem value='dark'>Dark</SelectItem>
        <SelectItem value='system'>System</SelectItem>
      </SelectContent>
    </Select>
  )
}
