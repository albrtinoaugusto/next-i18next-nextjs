import { useRouter } from 'next/router'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = {
  // Add custom props here
}

const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { t, i18n } = useTranslation('main')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clientSideLanguageChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
  }

  const changeTo = router.locale === 'en' ? 'de' : 'pt'
  // const changeTo = i18n.resolvedLanguage === 'en' ? 'de' : 'en'

  return (
    <>
      <main>
        <p>{t('WELCOME')}</p>
        {/* <Trans i18nKey="helpLocize" t={t}>
          With using
          <a href="https://locize.com" target="_new">
            locize
          </a>
          you directly support the future of
          <a href="https://www.i18next.com" target="_new">
            i18next
          </a>
          .
        </Trans> */}
      </main>
    </>
  )
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {...(await serverSideTranslations(locale ?? 'en', ['main']))} // You add more file names on this array
})

export default Homepage
