import gql from 'graphql-tag'

import { Card, Icon, TextIcon } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

import { NoticeTag as NoticeTagType } from './__generated__/NoticeTag'

const NoticeTag = ({ tag }: { tag: NoticeTagType | null }) => {
  if (!tag) {
    return null
  }

  const path = toPath({
    page: 'tagDetail',
    id: tag.id || ''
  })

  return (
    <section className="tag-content">
      <Card
        {...path}
        bgColor="grey-lighter"
        spacing={['xtight', 'base']}
        borderRadius="xxtight"
      >
        <TextIcon
          className="tag"
          icon={<Icon.HashTag color="grey" />}
          weight="md"
          size="sm"
          spacing="xtight"
        >
          {tag.content}
        </TextIcon>
      </Card>
      <style jsx>{styles}</style>
    </section>
  )
}

NoticeTag.fragments = {
  tag: gql`
    fragment NoticeTag on Tag {
      id
      content
    }
  `
}

export default NoticeTag
