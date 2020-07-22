import gql from 'graphql-tag'

import { ArticleDigestTitle, Card, CardProps, Img, Tag } from '~/components'

import { analytics, toPath } from '~/common/utils'

import TAG_COVER from '@/public/static/images/tag-cover.png'

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
  })

  return (
    <section className="container">
      <Card {...path} spacing={[0, 0]} {...cardProps}>
        <header>
          <Img url={tag.cover || TAG_COVER} size="1080w" smUpSize="540w" />
          <Tag tag={tag} type="title" />
        </header>
      </Card>

      <ul>
        {(tag?.selectArticles?.edges || []).map(({ node, cursor }, i) => (
          <li key={cursor}>
            <Card
              spacing={[0, 'base']}
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'tag_detail_latest',
                  styleType: 'title',
                  contentType: 'article',
                  location: i,
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
