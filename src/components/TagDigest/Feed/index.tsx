import { VisuallyHidden } from '@reach/visually-hidden'
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
import { TagDigestFeedTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type TagDigestFeedProps = {
  tag: TagDigestFeedTagFragment
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
      bgActiveColor="none"
      borderRadius="xtight"
      testId={TEST_ID.DIGEST_TAG_FEED}
      {...cardProps}
    >
      <section className={styles.container}>
        <header className={styles.header}>
          <Tag
            tag={tag}
            type="plain"
            iconProps={{ color: 'greyDarker' }}
            textIconProps={{ color: 'black', weight: 'md', size: 'sm' }}
          />

          <section className={styles.nums}>
            <TextIcon
              icon={<IconUser16 color="greyDark" size="xs" />}
              size="xs"
              spacing="xxtight"
              color="greyDark"
            >
              {numAbbr(tag.numAuthors)}
            </TextIcon>

            <TextIcon
              icon={<IconArticle16 color="greyDark" size="xs" />}
              size="xs"
              spacing="xxtight"
              color="greyDark"
            >
              {numAbbr(tag.numArticles)}
            </TextIcon>
          </section>
        </header>

        <section className={styles.content}>
          <ul className={styles.articles}>
            {articles?.map(({ node, cursor }) => (
              <li key={cursor}>
                <Link
                  {...toPath({ page: 'articleDetail', article: node })}
                  legacyBehavior
                >
                  <a className={styles.title} onClick={captureClicks}>
                    {node.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <section
            className={styles.cover}
            data-test-id={TEST_ID.DIGEST_TAG_FEED_COVER}
          >
            <Link {...path} legacyBehavior>
              <a>
                <VisuallyHidden>
                  <span>{tag.content}</span>
                </VisuallyHidden>
                <ResponsiveImage
                  url={tag.cover || IMAGE_TAG_COVER.src}
                  width={144}
                  height={144}
                />
              </a>
            </Link>
          </section>
        </section>
      </section>
    </Card>
  )
}

Feed.fragments = fragments

export default Feed
