import { useRouter } from 'next/router'
import { useContext } from 'react'

import { ReactComponent as SupporterListRocket } from '@/public/static/images/supporter-list-rocket.svg'
import { GUIDE_LINKS } from '~/common/enums'
import { toPath, translate } from '~/common/utils'
import {
  Button,
  IconDonateBg24,
  LanguageContext,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import { CreateDraft } from '~/components/GQL/mutations/__generated__/CreateDraft'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'

import styles from './styles.css'

const EmptyAnalytics = () => {
  const router = useRouter()
  const { lang } = useContext(LanguageContext)

  const [putDraft] = useMutation<CreateDraft>(CREATE_DRAFT, {
    variables: { title: translate({ id: 'untitle', lang }) },
  })

  return (
    <section className="container">
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
          size={['19.5rem', '3rem']}
          spacing={[0, 0]}
          bgColor="green"
          onClick={async () => {
            const result = await putDraft()
            const { slug, id } = result?.data?.putDraft || {}

            if (slug && id) {
              const path = toPath({ page: 'draftDetail', slug, id })
              router.push(path.href)
            }
          }}
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
              rel="noreferrer"
            >
              <Translate zh_hant="教學指南" zh_hans="教学指南" en="tutorial" />
            </a>
            <Translate zh_hant="" zh_hans="" en="." />
          </p>
        </section>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default EmptyAnalytics
