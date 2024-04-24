import RegisterLayout from '@/components/auth/form/register/RegisterLayout'
import RegisterStepper from '@/components/auth/form/register/RegisterStepper'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function Register({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{dictionary?.register?.title}</CardTitle>
          <CardDescription>{dictionary?.register?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterStepper />
          <RegisterLayout dictionary={dictionary?.register} />
        </CardContent>
        <CardFooter>
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            href='/login'
          >
            {dictionary?.register?.nav?.login}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
