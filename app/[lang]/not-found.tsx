import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {/* <Image
        src="/404.svg"
        alt="404"
        width={500}
        height={500}
        className="object-contain"
      /> */}

      <Link href='/'>
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
