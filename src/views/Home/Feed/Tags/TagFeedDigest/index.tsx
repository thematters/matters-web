import classNames from 'classnames'
import gql from 'graphql-tag'

import {
  ArticleDigestTitle,
  Card,
  CardProps,
  ResponsiveImage,
  Tag,
} from '~/components'

import { analytics, toPath } from '~/common/utils'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

import { TagFeedDigestTag } from './__generated__/TagFeedDigestTag'

type TagFeedDigestProps = { tag: TagFeedDigestTag } & CardProps

const fragments = {
  tag: gql`
    fragment TagFeedDigestTag on Tag {
      id
      cover
      selectArticles: articles(input: { first: 5 }) {
        edges {
          cursor
          node {
            id
            title
            ...ArticleDigestTitleArticle
          }
        }
      }
      ...DigestTag
    }
    ${Tag.fragments.tag}
    ${ArticleDigestTitle.fragments.article}
  `,
}

const TagFeedDigest = ({ tag, ...cardProps }: TagFeedDigestProps) => {
  const path = toPath({
    page: 'tagDetail',
    id: tag.id,
    content: tag.content,
  })
  const maskClasses = classNames({ mask: !!tag.cover })

  return (
    <section className="container">
      <Card {...path} spacing={[0, 0]} {...cardProps}>
        <header>
          <ResponsiveImage url={tag.cover || IMAGE_TAG_COVER.src} size="360w" />

          <div className={maskClasses}>
            <Tag tag={tag} type="title" />
          </div>
        </header>
      </Card>

      <ul>
        {(tag?.selectArticles?.edges || []).map(({ node, cursor }, i) => (
          <li key={cursor}>
            <Card
              spacing={[0, 'base']}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'tags',
                  contentType: 'article',
                  location: i,
                  id: node.id,
                })
              }
            >
              <ArticleDigestTitle
                article={node}
                textSize="sm"
                is="h4"
                textWeight="normal"
              />
            </Card>
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </section>
  )
}

TagFeedDigest.fragments = fragments

export default TagFeedDigest
