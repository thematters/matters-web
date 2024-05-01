import { VisuallyHidden } from '@reach/visually-hidden'
import gql from 'graphql-tag'
import Link from 'next/link'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { ReactComponent as IconUser } from '@/public/static/icons/24px/user.svg'
import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import { TEST_ID } from '~/common/enums'
import { captureClicks, numAbbr, toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  Icon,
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
      spacing={[8, 8]}
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
            textIconProps={{ color: 'black', weight: 'medium', size: 14 }}
          />

          <section className={styles.nums}>
            <TextIcon
              icon={<Icon icon={IconUser} color="greyDark" size={12} />}
              size={12}
              spacing={4}
              color="greyDark"
            >
              {numAbbr(tag.numAuthors)}
            </TextIcon>

            <TextIcon
              icon={<Icon icon={IconDraft} color="greyDark" size={12} />}
              size={12}
              spacing={4}
              color="greyDark"
            >
              {numAbbr(tag.numArticles)}
            </TextIcon>
          </section>
        </header>

        <section className={styles.content}>
          <ul className={styles.articles}>
            {articles?.map(({ node, cursor }) => (
              <li key={node.id}>
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
                  disableAnimation={true}
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
