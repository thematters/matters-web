import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { DateTime, Expandable, LinkWrapper, useRoute } from '~/components'
import {
  MomentDigestMomentPrivateFragment,
  MomentDigestMomentPublicFragment,
} from '~/gql/graphql'

import Assets from './Assets'
import FooterActions from './FooterActions'
import styles from './styles.module.css'

export type MomentDigestProps = {
  moment: MomentDigestMomentPublicFragment &
    Partial<MomentDigestMomentPrivateFragment>
}

export const MomentDigest = ({ moment }: MomentDigestProps) => {
  const { content, createdAt, assets } = moment
  const { router } = useRoute()

  const momentDetailPath = toPath({
    page: 'momentDetail',
    moment,
  })

  const goToMomentDetail = () => {
    router.push(momentDetailPath.href)
  }

  return (
    <section className={styles.container}>
      <header>
        <LinkWrapper {...momentDetailPath}>
          <DateTime date={createdAt} color="grey" />
        </LinkWrapper>
      </header>
      {!!content && (
        <section
          className={styles.content}
          onClick={() => {
            // TODO: open moment detail dialog
            goToMomentDetail()
          }}
        >
          <Expandable
            content={content}
            limit={4}
            isRichShow={true}
            size={15}
            collapseable={false}
            isCommentOrMoment
            expandButton={
              <button
                onClick={() => {
                  // TODO: open moment detail dialog or navigate to moment detail page
                }}
              >
                <FormattedMessage
                  defaultMessage="More"
                  id="eoQN04"
                  description="src/components/MomentDigest/index.tsx"
                />
              </button>
            }
          >
            <section
              dangerouslySetInnerHTML={{
                __html: content || '',
              }}
            />
          </Expandable>
        </section>
      )}
      {!!assets && assets.length > 0 && <Assets moment={moment} />}
      <FooterActions moment={moment} />
    </section>
  )
}
