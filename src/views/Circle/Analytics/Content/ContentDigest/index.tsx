import React from 'react'

import {
  Card,
  DateTime,
  IconRead16,
  TextIcon,
  Tooltip,
  Translate,
} from '~/components'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { CircleContentAnalyticsArticle } from './__generated__/CircleContentAnalyticsArticle'

interface CircleAnalyticsContentProps {
  article: CircleContentAnalyticsArticle
  count: number
  index: number
}

const Count = ({ count }: { count: number }) => {
  return (
    <Tooltip content={<Translate id="readCount" />} trigger="click">
      <button type="button" className="count">
        <TextIcon icon={<IconRead16 />} size="xs" color="grey-dark">
          {count}
        </TextIcon>
        <style jsx>{styles}</style>
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
              <p className="title">{title}</p>
            </section>
            <Count count={count} />
          </section>
          <DateTime date={createdAt} />
        </section>
      </section>
      <style jsx>{styles}</style>
    </Card>
  )
}

ContentDigest.fragments = fragments

export default ContentDigest
