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

import { TEST_ID } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

import { TagDigestSidebarTag } from './__generated__/TagDigestSidebarTag'

export type TagDigestSidebarProps = {
  tag: TagDigestSidebarTag
} & CardProps

const fragments = {
  tag: gql`
    fragment TagDigestSidebarTag on Tag {
      id
      content
      description
      cover
      numArticles
      numAuthors
    }
  `,
}

const Sidebar = ({ tag, ...cardProps }: TagDigestSidebarProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  return (
    <Card
      {...path}
      spacing={['xtight', 'xtight']}
      bgColor="none"
      bgActiveColor="grey-lighter"
      borderRadius="xtight"
      {...cardProps}
      testId={TEST_ID.DIGEST_TAG_SIDEBAR}
    >
      <section className="container">
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

        <section className="content">
          <header>
            <Tag
              tag={tag}
              type="plain"
              iconProps={{ color: 'grey-darker' }}
              textIconProps={{ color: 'black', weight: 'md', size: 'sm' }}
            />
          </header>

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
        </section>

        <style jsx>{styles}</style>
      </section>
    </Card>
  );
}

Sidebar.fragments = fragments

export default Sidebar
