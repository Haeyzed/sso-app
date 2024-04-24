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
  SiApple,
  SiBitbucket,
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiGoogle,
  SiInstagram,
  SiLinkedin,
  SiMicrosoft,
  SiTwitter,
  SiX
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
          <LoginForm dictionary={dictionary?.login} />
        </CardContent>
        <CardFooter className='grid gap-4'>
          <div className='grid grid-cols-2 gap-6'>
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href='/register'
            >
              {dictionary?.login?.nav?.register}
            </Link>
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href='/reset-password'
            >
              {dictionary?.login?.nav?.resetPassword}
            </Link>
          </div>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          <div className='grid grid-cols-5 gap-6'>
            <Button variant='outline' size='icon'>
              <SiGoogle className='h-4 w-4' style={{ color: '#4285F4' }} />
            </Button>
            <Button variant='outline' size='icon'>
              <SiFacebook className='h-4 w-4' style={{ color: '#0866FF' }} />
            </Button>
            <Button variant='outline' size='icon'>
              <SiX className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiLinkedin className='h-4 w-4' style={{ color: '#0A66C2' }} />
            </Button>
            <Button variant='outline' size='icon'>
              <SiGithub className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiInstagram className='h-4 w-4' style={{ color: '#E4405F' }} />
            </Button>
            <Button variant='outline' size='icon'>
              <SiApple className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <SiDiscord className='h-4 w-4' style={{ color: '#5865F2' }} />
            </Button>
            <Button variant='outline' size='icon'>
              <SiBitbucket className='h-4 w-4' style={{ color: '#0052CC' }} />
            </Button>
            <Button variant='outline' size='icon'>
              <SiMicrosoft className='h-4 w-4' />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
