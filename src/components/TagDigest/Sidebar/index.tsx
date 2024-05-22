import { VisuallyHidden } from '@reach/visually-hidden'
import gql from 'graphql-tag'
import Link from 'next/link'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { ReactComponent as IconUser } from '@/public/static/icons/24px/user.svg'
import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'
import { TEST_ID } from '~/common/enums'
import { numAbbr, toPath } from '~/common/utils'
import {
  Card,
  CardProps,
  Icon,
  ResponsiveImage,
  Tag,
  TextIcon,
} from '~/components'
import { TagDigestSidebarTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type TagDigestSidebarProps = {
  tag: TagDigestSidebarTagFragment
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
      spacing={[8, 8]}
      bgColor="none"
      bgActiveColor="none"
      borderRadius="xtight"
      {...cardProps}
      testId={TEST_ID.DIGEST_TAG_SIDEBAR}
    >
      <section className={styles.container}>
        <section
          className={styles.cover}
          data-test-id={TEST_ID.DIGEST_TAG_SIDEBAR_COVER}
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

        <section className={styles.content}>
          <header className={styles.header}>
            <Tag
              tag={tag}
              type="plain"
              iconProps={{ color: 'greyDarker' }}
              textIconProps={{ color: 'black', weight: 'medium', size: 14 }}
            />
          </header>

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
        </section>
      </section>
    </Card>
  )
}

Sidebar.fragments = fragments

export default Sidebar
