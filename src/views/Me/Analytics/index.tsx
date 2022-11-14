import { useContext } from 'react'

import {
  Button,
  Card,
  Head,
  IconDonateBg24,
  LanguageContext,
  Layout,
  TextIcon,
  Translate,
} from '~/components'

import { GUIDE_LINKS, PATHS } from '~/common/enums'

import { ReactComponent as SupporterListRocket } from '@/public/static/images/supporter-list-rocket.svg'

import styles from './styles.css'

const BaseAnalytics = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <section className="container">
      <Card spacing={['loose', 'base']} bgColor="white" borderRadius="base">
        <section className="title">
          <TextIcon
            icon={<IconDonateBg24 size="md" />}
            weight="md"
            color="black"
            size="md"
          >
            <Translate id="supporterRankingList" />
          </TextIcon>
        </section>
        <section className="content">
          <p>
            <Translate id="analyticsNoArticle" />
          </p>
          <section className="rocket">
            <SupporterListRocket />
          </section>
            <Button
              size={['19.5rem', '2.25rem']}
              spacing={[0, 0]}
              bgColor="green"
              href={PATHS.HOME}
            >
              <TextIcon color="white" weight="md">
                <Translate
                  zh_hant="開始創作"
                  zh_hans="开始创作"
                  en="Start Creating"
                />
              </TextIcon>
            </Button>
          <section className="tips">
            <p>
              <Translate
                zh_hant="想了解更多？詳見 "
                zh_hans="想了解更多？详见 "
                en="Want to know more? Check the "
              />
              <a
                className="u-link-green"
                href={GUIDE_LINKS.authorToolbox[lang]}
                target="_blank"
              >
                <Translate
                  zh_hant="教學指南"
                  zh_hans="教学指南"
                  en="tutorial"
                />
              </a>
              <Translate zh_hant="" zh_hans="" en="." />
            </p>
          </section>
        </section>
      </Card>{' '}
      <style jsx>{styles}</style>
    </section>
  )
}

const MyAnalytics = () => (
  <Layout.Main bgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myAnalytics" />}
    />
    <Head title={{ id: 'myAnalytics' }} />
    <BaseAnalytics />
  </Layout.Main>
)

export default MyAnalytics
