import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconAvatarEmpty } from '@/public/static/icons/24px/avatar-empty.svg'
import {
  Button,
  Icon,
  TagAdoptionDialog,
  TextIcon,
  toast,
  UserDigest,
  ViewerContext,
} from '~/components'
import { TagFragmentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const Owner = ({ tag }: { tag: TagFragmentFragment }) => {
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage
          defaultMessage="You do not have permission to perform this operation"
          id="5FO4vn"
        />
      ),
    })
  }

  if (!tag) {
    return null
  }

  if (!tag.owner) {
    return (
      <section className={styles.container}>
        <section className={styles.left}>
          <TextIcon
            icon={<Icon icon={IconAvatarEmpty} size={24} />}
            color="greyDark"
            size={15}
            spacing={8}
          >
            <FormattedMessage
              defaultMessage="This tag has no manager currently"
              id="63HuBz"
              description="src/views/TagDetail/Owner/index.tsx"
            />
          </TextIcon>
        </section>
        <section className={styles.right}>
          <TagAdoptionDialog id={tag.id}>
            {({ openDialog }) => (
              <Button
                spacing={[8, 12]}
                textColor="green"
                textActiveColor="white"
                bgActiveColor="green"
                borderColor="green"
                onClick={viewer.isFrozen ? forbid : openDialog}
                aria-haspopup="dialog"
              >
                <TextIcon weight="medium" size={12}>
                  <FormattedMessage
                    defaultMessage="Maintain Tag"
                    id="KMcrz8"
                    description="src/views/TagDetail/Owner/index.tsx"
                  />
                </TextIcon>
              </Button>
            )}
          </TagAdoptionDialog>
        </section>
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <section className={styles.left}>
        <UserDigest.Mini
          user={tag.owner}
          avatarSize={24}
          hasAvatar
          hasDisplayName
        />

        <TextIcon size={14} color="greyDark">
          <FormattedMessage
            defaultMessage="Maintain"
            id="ANA7sk"
            description="src/views/TagDetail/Owner/index.tsx"
          />
        </TextIcon>
      </section>
      <section className={styles.right}>{/* editos */}</section>
    </section>
  )
}

export default Owner
