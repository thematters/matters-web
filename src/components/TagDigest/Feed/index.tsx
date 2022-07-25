import gql from 'graphql-tag'
import Link from 'next/link'

import {
  Card,
  CardProps,
  IconArticle16,
  IconUser16,
  ResponsiveImage,
  Tag,
  TextIcon,
} from '~/components'

import { captureClicks, numAbbr, toPath } from '~/common/utils'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

import { TagDigestFeedTag } from './__generated__/TagDigestFeedTag'

export type TagDigestFeedProps = {
  tag: TagDigestFeedTag
} & CardProps

const fragments = {
  tag: gql`
    fragment TagDigestFeedTag on TagSearchResult {
      id
      tag {
        id
        content
        cover
      }
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
    id: tag.id,
  })

  const articles = tag.articles.edges

  return (
    <Card
      {...path}
      spacing={['xtight', 'xtight']}
      bgColor="none"
      bgActiveColor="grey-lighter"
      borderRadius="xtight"
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
                <Link {...toPath({ page: 'articleDetail', article: node })}>
                  <a className="title" onClick={captureClicks}>
                    {node.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <section className="cover">
            <Link {...path}>
              <a>
                <ResponsiveImage
                  url={tag.tag.cover || IMAGE_TAG_COVER.src}
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
