import { Button, IconEmptyAvatar, TextIcon, Translate, UserDigest } from '~/components'

import styles from './styles.css'

import { TagDetailPublic_node_Tag } from '../__generated__/TagDetailPublic'

const Owner = ({ tag }: { tag: TagDetailPublic_node_Tag }) => {
  if (!tag) {
    return null
  }

  if (!tag.owner) {
    return (
      <section className="container">
        <section className="left">
          <TextIcon
            icon={<IconEmptyAvatar size="md"/>}
            color="grey-dark"
            size="md-s"
            spacing="xtight"
          >
            <Translate
              zh_hant="此標籤目前無人主理"
              zh_hans="此标签目前無人主理"
            />
          </TextIcon>
        </section>
        <section className="right">
          <Button
            size={['3rem', '1.5rem']}
            textColor="green"
            textActiveColor="white"
            bgActiveColor="green"
            borderColor="green"
          >
            <TextIcon weight="md" size="xs">
              <Translate zh_hant="認領" zh_hans="认领" />
            </TextIcon>
          </Button>
        </section>
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <section className="container">
      <section className="left">
        <UserDigest.Mini
          user={tag.owner}
          avatarSize="md"
          hasAvatar
          hasDisplayName
        />

        <TextIcon size="sm" color="grey-dark">
          <Translate zh_hant="主理" zh_hans="主理" />
        </TextIcon>
      </section>
      <section className="right">{/* editos */}</section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Owner
