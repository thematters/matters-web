import gql from 'graphql-tag'
import Link from 'next/link'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import { TEST_ID } from '~/common/enums'
import { captureClicks, numAbbr, toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  IconArticle16,
  IconUser16,
  ResponsiveImage,
  Tag,
  TextIcon,
} from '~/components'

import { TagDigestFeedTag } from './__generated__/TagDigestFeedTag'
import styles from './styles.css'

export type TagDigestFeedProps = {
  tag: TagDigestFeedTag
} & CardProps

const fragments = {
  tag: gql`
    fragment TagDigestFeedTag on Tag {
      id
      content
      cover
      numArticles
      numAuthors
      articles(input: { first: 3 }) {
        edges {
          cursor
          node {
            id
            title
            slug
            mediaHash
            author {
              id
              userName
            }
          }
        }
      }
    }
  `,
}

const Feed = ({ tag, ...cardProps }: TagDigestFeedProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const articles = tag.articles.edges

  return (
    <Card
      {...path}
      spacing={['xtight', 'xtight']}
      bgColor="none"
      bgActiveColor="grey-lighter"
      borderRadius="xtight"
      testId={TEST_ID.DIGEST_TAG_FEED}
      {...cardProps}
    >
      <section className="container">
        <header>
          <Tag
            tag={tag}
            type="plain"
            iconProps={{ color: 'grey-darker' }}
            textIconProps={{ color: 'black', weight: 'md', size: 'sm' }}
          />

          <section className="nums">
            <TextIcon
              icon={<IconUser16 color="grey-dark" />}
              size="xs"
              spacing="xxtight"
              color="grey-dark"
            >
              {numAbbr(tag.numAuthors)}
            </TextIcon>

            <TextIcon
              icon={<IconArticle16 color="grey-dark" />}
              size="xs"
              spacing="xxtight"
              color="grey-dark"
            >
              {numAbbr(tag.numArticles)}
            </TextIcon>
          </section>
        </header>

        <section className="content">
          <ul className="articles">
            {articles?.map(({ node, cursor }) => (
              <li key={cursor}>
                <Link
                  {...toPath({ page: 'articleDetail', article: node })}
                  legacyBehavior
                >
                  <a className="title" onClick={captureClicks}>
                    {node.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <section className="cover">
            <Link {...path} legacyBehavior>
              <a>
                <ResponsiveImage
                  url={tag.cover || IMAGE_TAG_COVER.src}
                  size="360w"
                />
              </a>
            </Link>
          </section>
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

Feed.fragments = fragments

export default Feed
