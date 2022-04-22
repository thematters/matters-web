import { useContext } from 'react'

import {
  Button,
  IconAvatarEmpty24,
  TagAdoptionDialog,
  TextIcon,
  Translate,
  UserDigest,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import { TagDetailPublic_node_Tag } from '../__generated__/TagDetailPublic'

const Owner = ({ tag }: { tag: TagDetailPublic_node_Tag }) => {
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
  }

  if (!tag) {
    return null
  }

  if (!tag.owner) {
    return (
      <section className="container">
        <section className="left">
          <TextIcon
            icon={<IconAvatarEmpty24 size="md" />}
            color="grey-dark"
            size="md-s"
            spacing="xtight"
          >
            <Translate
              zh_hant="此標籤目前無人主理"
              zh_hans="此标签目前無人主理"
              en="this tag has no manager currently"
            />
          </TextIcon>
        </section>
        <section className="right">
          <TagAdoptionDialog>
            {({ openDialog }) => (
              <Button
                size={['3rem', '1.5rem']}
                textColor="green"
                textActiveColor="white"
                bgActiveColor="green"
                borderColor="green"
                onClick={viewer.isFrozen ? forbid : openDialog}
              >
                <TextIcon weight="md" size="xs">
                  <Translate zh_hant="認領" zh_hans="认领" en="maintain" />
                </TextIcon>
              </Button>
            )}
          </TagAdoptionDialog>
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
          <Translate zh_hant="主理" zh_hans="主理" en="maintainer" />
        </TextIcon>
      </section>
      <section className="right">{/* editos */}</section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Owner
