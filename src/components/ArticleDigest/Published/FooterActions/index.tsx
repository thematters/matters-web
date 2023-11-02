import { numAbbr } from '~/common/utils'
import { TextIcon } from '~/components'
import {
  IconClap2V16,
  IconComment2V16,
  IconMoney16,
  IconUser2V16,
} from '~/components/Icon'
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

  return (
    <footer className={styles.footer}>
      <section className={styles.left}>
        <TextIcon icon={<IconUser2V16 />} spacing="basexxtight" size="sm">
          <span className={styles.count}>{numAbbr(readerCount)}</span>
        </TextIcon>

        <TextIcon icon={<IconClap2V16 />} spacing="basexxtight" size="sm">
          <span className={styles.count}>
            {numAbbr(appreciationsReceivedTotal)}
          </span>
        </TextIcon>

        <TextIcon icon={<IconComment2V16 />} spacing="basexxtight" size="sm">
          <span className={styles.count}>{numAbbr(commentCount)}</span>
        </TextIcon>

        <TextIcon icon={<IconMoney16 />} spacing="basexxtight" size="sm">
          <span className={styles.count}>{numAbbr(donationCount)}</span>
        </TextIcon>
      </section>

      <section className={styles.right}>
        <DropdownActions
          article={article}
          {...controls}
          size="mdM"
          inCard={true}
        />
      </section>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions
