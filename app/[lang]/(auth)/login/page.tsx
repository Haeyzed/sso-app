import LoginForm from '@/components/auth/form/LoginForm'
import { Button, buttonVariants } from '@/components/ui/button'
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
import {
    SiFacebook,
    SiGithub,
    SiGoogle,
    SiLinkedin,
    SiTwitter
} from '@icons-pack/react-simple-icons'
import Link from 'next/link'

export default async function Login({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{dictionary?.login?.title}</CardTitle>
          <CardDescription>{dictionary?.login?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm dictionary={dictionary?.login}/>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <div className='flex justify-between'>
            <Link
              className={buttonVariants({ variant: 'secondary' })}
              href='/register'
            >
              Register
            </Link>
            <Link
              className={buttonVariants({ variant: 'secondary' })}
              href='/reset-password'
            >
              Reset Password
            </Link>
          </div>
          <div className='flex justify-between space-x-4'>
            <Button variant='outline' size='icon'>
              <SiGoogle className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiFacebook className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiTwitter className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiLinkedin className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiGithub className='h-4 w-4' />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
