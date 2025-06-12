import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import IconReadingTime from '@/public/static/icons/24px/reading-time.svg'
import { toPath } from '~/common/utils'
import { Card, DateTime, Icon, TextIcon, Tooltip } from '~/components'
import { CircleContentAnalyticsArticleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

interface CircleAnalyticsContentProps {
  article: CircleContentAnalyticsArticleFragment
  count: number
  index: number
}

const Count = ({ count }: { count: number }) => {
  return (
    <Tooltip
      content={<FormattedMessage defaultMessage="Read Counts" id="8KFsZN" />}
      trigger="click"
    >
      <button type="button" className={styles.count}>
        <TextIcon
          icon={<Icon icon={IconReadingTime} />}
          size={12}
          color="greyDark"
        >
          {count}
        </TextIcon>
      </button>
    </Tooltip>
  )
}

const ContentDigest = ({
  article,
  count,
  index,
}: CircleAnalyticsContentProps) => {
  const { title, createdAt } = article
  const path = toPath({
    page: 'articleDetail',
    article,
  })
  return (
    <Card {...path} spacing={[0, 0]}>
      <section className={styles.container}>
        <section className={styles.number}>{index + 1}</section>

        <section className={styles.article}>
          <section className={styles.content}>
            <section className={styles.titleWrap}>
              <Link {...path} className="u-link-active-green">
                <h3 className={styles.title}>{title}</h3>
              </Link>
            </section>

            <Count count={count} />
          </section>

          <DateTime date={createdAt} />
        </section>
      </section>
    </Card>
  )
}

ContentDigest.fragments = fragments

export default ContentDigest
