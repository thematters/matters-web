import { useIntl } from 'react-intl'

import IconClap from '@/public/static/icons/24px/clap.svg'
import IconComment from '@/public/static/icons/24px/comment.svg'
import IconMoney from '@/public/static/icons/24px/money.svg'
import IconUser from '@/public/static/icons/24px/user.svg'
import { TEST_ID } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import { TextIcon } from '~/components'
import { Icon } from '~/components/Icon'
import { FooterActionsPublishedArticlePublicFragment } from '~/gql/graphql'

import DropdownActions, { DropdownActionsControls } from '../../DropdownActions'
import { fragments } from './gql'
import styles from './styles.module.css'

export type FooterActionsControls = DropdownActionsControls

export type FooterActionsProps = {
  article: FooterActionsPublishedArticlePublicFragment
} & FooterActionsControls

const FooterActions = ({ article, ...controls }: FooterActionsProps) => {
  const {
    readerCount,
    appreciationsReceivedTotal,
    commentCount,
    donationCount,
  } = article
  const intl = useIntl()

  return (
    <footer className={styles.footer}>
      <section className={styles.left}>
        <TextIcon
          icon={<Icon icon={IconUser} />}
          spacing={6}
          size={14}
          aria-label={intl.formatMessage({
            defaultMessage: 'Number of readers',
            id: 'hv1iYZ',
            description:
              'src/components/ArticleDigest/Published/FooterActions/index.tsx',
          })}
        >
          <span
            className={styles.count}
            data-test-id={TEST_ID.DIGEST_ARTICLE_PUBLISHED_READER_COUNT}
          >
            {numAbbr(readerCount)}
          </span>
        </TextIcon>

        <TextIcon
          icon={<Icon icon={IconClap} />}
          spacing={6}
          size={14}
          aria-label={intl.formatMessage({
            defaultMessage: 'Number of claps',
            id: 'C9jbHn',
            description:
              'src/components/ArticleDigest/Published/FooterActions/index.tsx',
          })}
        >
          <span
            className={styles.count}
            data-test-id={
              TEST_ID.DIGEST_ARTICLE_PUBLISHED_APPRECIATIONS_RECEIVED_TOTAL
            }
          >
            {numAbbr(appreciationsReceivedTotal)}
          </span>
        </TextIcon>

        <TextIcon
          icon={<Icon icon={IconComment} />}
          spacing={6}
          size={14}
          aria-label={intl.formatMessage({
            defaultMessage: 'Number of comments',
            id: 'J6f6iN',
            description:
              'src/components/ArticleDigest/Published/FooterActions/index.tsx',
          })}
        >
          <span
            className={styles.count}
            data-test-id={TEST_ID.DIGEST_ARTICLE_PUBLISHED_COMMENT_COUNT}
          >
            {numAbbr(commentCount)}
          </span>
        </TextIcon>

        <TextIcon
          icon={<Icon icon={IconMoney} />}
          spacing={6}
          size={14}
          aria-label={intl.formatMessage({
            defaultMessage: 'Number of supporters',
            id: 'NfCbnZ',
            description:
              'src/components/ArticleDigest/Published/FooterActions/index.tsx',
          })}
        >
          <span
            className={styles.count}
            data-test-id={TEST_ID.DIGEST_ARTICLE_PUBLISHED_DONATION_COUNT}
          >
            {numAbbr(donationCount)}
          </span>
        </TextIcon>
      </section>

      <section className={styles.right}>
        <DropdownActions
          article={article}
          {...controls}
          size={22}
          inCard={true}
        />
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
