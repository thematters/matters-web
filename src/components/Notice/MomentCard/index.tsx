import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { MOMENT_DIGEST_REFERRER } from '~/common/enums/moment'
import { sessionStorage, stripHtml, toPath } from '~/common/utils'
import { ResponsiveImage, useRoute } from '~/components'
import { MomentState, NoticeMomentTitleFragment } from '~/gql/graphql'

import { Media, MomentDetailDialog } from '../..'
import styles from './styles.module.css'

type MomentCardProps = {
  moment: NoticeMomentTitleFragment
}

const BaseMomentCard = ({ moment }: MomentCardProps) => {
  const content = moment.content
  const assets = moment.assets || []

  const cleanedContent = stripHtml(content || '')
  const assetCount = assets.length

  const hasContent = cleanedContent.length > 0
  const hasAssets = assetCount > 0
  const hasMoreAssets = assetCount > 3
  const hasAssetsOnly = !hasContent && hasAssets
  const hasContentOnly = hasContent && !hasAssets
  const hasBoth = hasContent && hasAssets

  const slicedAssets = hasMoreAssets ? assets.slice(0, 3) : assets

  return (
    <section className={styles.container}>
      {hasContentOnly && (
        <section
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: cleanedContent }}
        />
      )}

      {hasAssetsOnly && (
        <section className={styles.assets}>
          {slicedAssets.map((asset) => (
            <div key={asset.id} className={styles.item}>
              <ResponsiveImage
                url={asset.path || ''}
                width={40}
                height={40}
                loading="lazy"
                fetchPriority="high"
              />
            </div>
          ))}
        </section>
      )}

      {hasBoth && (
        <section className={styles.content}>
          <section
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          />
          <section className={styles.assets}>
            <div className={styles.item}>
              <ResponsiveImage
                url={assets[0]?.path || ''}
                width={40}
                height={40}
                loading="lazy"
                fetchPriority="high"
              />
            </div>
          </section>
        </section>
      )}
    </section>
  )
}

const MomentCard = ({ moment }: MomentCardProps) => {
  const { router } = useRoute()
  const path = toPath({
    page: 'momentDetail',
    moment,
  })

  const setReferrer = () => {
    sessionStorage.set(MOMENT_DIGEST_REFERRER, true)
  }

  const goToMomentDetail = () => {
    setReferrer()
    router.push(path.href)
  }

  if (moment.state === MomentState.Archived) {
    return (
      <section className={styles.container}>
        <section className={[styles.text, styles.strike].join(' ')}>
          <FormattedMessage defaultMessage="Moment deleted" id="5mu8HJ" />
        </section>
      </section>
    )
  }

  return (
    <>
      <Media lessThan="md">
        <a
          href={path.href}
          onClick={(e) => {
            e.preventDefault()
            goToMomentDetail()
          }}
        >
          <BaseMomentCard moment={moment} />
        </a>
      </Media>
      <Media greaterThanOrEqual="md">
        <MomentDetailDialog shortHash={moment.shortHash}>
          {({ openDialog }) => (
            <a
              href={path.href}
              onClick={(e) => {
                e.preventDefault()
                openDialog()
              }}
            >
              <BaseMomentCard moment={moment} />
            </a>
          )}
        </MomentDetailDialog>
      </Media>
    </>
  )
}

MomentCard.fragments = {
  moment: gql`
    fragment MomentCardMoment on Moment {
      id
      state
      content
      shortHash
      assets {
        id
        path
      }
    }
  `,
}

export default MomentCard
