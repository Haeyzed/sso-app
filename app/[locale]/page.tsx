import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('page')

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>{t('home.title')}</h1>
        <p className='text-gray-500'>{t('home.description')}</p>
      </div>
    </section>
  )
}
