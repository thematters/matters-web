import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import {
  Button,
  IconAvatarEmpty24,
  TagAdoptionDialog,
  TextIcon,
  UserDigest,
  ViewerContext,
} from '~/components'
import { TagFragmentFragment } from '~/gql/graphql'

import styles from './styles.css'

const Owner = ({ tag }: { tag: TagFragmentFragment }) => {
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: (
            <FormattedMessage
              defaultMessage="You do not have permission to perform this operation"
              description=""
            />
          ),
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
            <FormattedMessage
              defaultMessage="This tag has no manager currently"
              description="src/views/TagDetail/Owner/index.tsx"
            />
          </TextIcon>
        </section>
        <section className="right">
          <TagAdoptionDialog id={tag.id}>
            {({ openDialog }) => (
              <Button
                spacing={['xtight', 'tight']}
                textColor="green"
                textActiveColor="white"
                bgActiveColor="green"
                borderColor="green"
                onClick={viewer.isFrozen ? forbid : openDialog}
                aria-haspopup="dialog"
              >
                <TextIcon weight="md" size="xs">
                  <FormattedMessage
                    defaultMessage="Maintain Tag"
                    description="src/views/TagDetail/Owner/index.tsx"
                  />
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
          <FormattedMessage
            defaultMessage="Maintain"
            description="src/views/TagDetail/Owner/index.tsx"
          />
        </TextIcon>
      </section>
      <section className="right">{/* editos */}</section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Owner
