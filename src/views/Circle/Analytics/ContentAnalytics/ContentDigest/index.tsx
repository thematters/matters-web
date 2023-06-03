import React from 'react'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import {
  Card,
  DateTime,
  IconRead16,
  LinkWrapper,
  TextIcon,
  Tooltip,
} from '~/components'
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
      content={<FormattedMessage defaultMessage="Read Counts" description="" />}
      trigger="click"
    >
      <button type="button" className="count">
        <TextIcon icon={<IconRead16 />} size="xs" color="grey-dark">
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
      <section className="container">
        <section className="number">{index + 1}</section>

        <section className="article">
          <section className="content">
            <section className="title-wrap">
              <LinkWrapper {...path} textActiveColor="green">
                <h3 className="title">{title}</h3>
              </LinkWrapper>
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
