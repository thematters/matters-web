import { useContext } from 'react'

import { ReactComponent as IconPaywall } from '@/public/static/icons/24px/paywall.svg'
import { CircleDigest, Icon, TextIcon, ViewerContext } from '~/components'
import { FooterActionsArticlePublicFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import DonationCount from './DonationCount'
import { fragments } from './gql'
import ReadTime from './ReadTime'
import styles from './styles.module.css'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsArticlePublicFragment
  hasReadTime?: boolean
  hasDonationCount?: boolean
  hasCircle?: boolean
  tag?: React.ReactNode
  includesMetaData?: boolean
} & FooterActionsControls

const FooterActions = ({
  article,
  hasReadTime,
  hasDonationCount,
  hasCircle,
  tag,
  includesMetaData = true,
  ...controls
}: FooterActionsProps) => {
  const {
    access: { circle },
  } = article
  const viewer = useContext(ViewerContext)

  return (
    <footer className={styles.footer}>
      {includesMetaData && (
        <section className={styles.left}>
          {hasReadTime && <ReadTime article={article} />}

          {hasDonationCount && <DonationCount article={article} />}

          {tag}

          {hasCircle && circle && (
            <TextIcon
              icon={
                article.access.type === 'paywall' ? (
                  <Icon icon={IconPaywall} color="grey" size={14} />
                ) : null
              }
              placement="left"
              spacing={4}
            >
              <CircleDigest.Title
                circle={circle}
                is="span"
                textSize={12}
                textWeight="normal"
              />
            </TextIcon>
          )}
        </section>
      )}

      <section className={styles.right}>
        {viewer.isAuthed && (
          <DropdownActions
            article={article}
            {...controls}
            size={22}
            inCard={true}
          />
        )}
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
