import { useRouter } from 'next/router'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ReactComponent as SupporterListRocket } from '@/public/static/images/supporter-list-rocket.svg'
import { GUIDE_LINKS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Button, LanguageContext, TextIcon, useMutation } from '~/components'
import CREATE_DRAFT from '~/components/GQL/mutations/createDraft'
import { CreateDraftMutation } from '~/gql/graphql'

import styles from './styles.module.css'

const EmptyAnalytics = () => {
  const router = useRouter()
  const { lang } = useContext(LanguageContext)

  const intl = useIntl()
  const [putDraft] = useMutation<CreateDraftMutation>(CREATE_DRAFT, {
    variables: {
      title: intl.formatMessage({
        defaultMessage: 'Untitled',
      }),
    },
  })

  return (
    <section className={styles.content}>
      <p>
        <FormattedMessage
          defaultMessage="You haven‘t published any articles yet, so there is no data available. Create one now to introduce yourself!"
          description="src/views/Me/Analytics/EmptyAnalytics/index.tsx"
        />
      </p>
      <section className={styles.rocket}>
        <SupporterListRocket />
      </section>
      <Button
        size={['19.5rem', '3rem']}
        spacing={[0, 0]}
        bgColor="green"
        onClick={async () => {
          const result = await putDraft()
          const { slug = '', id } = result?.data?.putDraft || {}

          if (id) {
            const path = toPath({ page: 'draftDetail', slug, id })
            router.push(path.href)
          }
        }}
      >
        <TextIcon color="white" weight="md">
          <FormattedMessage defaultMessage="Start Creating" />
        </TextIcon>
      </Button>
      <section className={styles.tips}>
        <p>
          <FormattedMessage
            defaultMessage="Want to know more? Check the "
            description="src/views/Me/Analytics/EmptyAnalytics/index.tsx"
          />
          <a
            className="u-link-green"
            href={GUIDE_LINKS.authorToolbox[lang]}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage defaultMessage="tutorial" />
          </a>
        </p>
      </section>
    </section>
  )
}

export default EmptyAnalytics
