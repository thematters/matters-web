import _isNil from 'lodash/isNil'
import { useContext } from 'react'
import { useIntl } from 'react-intl'

import IconSave from '@/public/static/icons/24px/save.svg'
import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { Button, Icon, toast, useMutation, ViewerContext } from '~/components'
import TOGGLE_BOOKMARK_TAG from '~/components/GQL/mutations/toggleBookmarkTag'
import {
  TagBookmarkButtonTagPrivateFragment,
  ToggleBookmarkTagMutation,
} from '~/gql/graphql'

interface BookmarkProps {
  tag: TagBookmarkButtonTagPrivateFragment
}

const Bookmark = ({ tag }: BookmarkProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [bookmark] = useMutation<ToggleBookmarkTagMutation>(
    TOGGLE_BOOKMARK_TAG,
    {
      variables: { id: tag.id, enabled: true },
      optimisticResponse:
        !_isNil(tag.id) && !_isNil(tag.isFollower)
          ? {
              toggleBookmarkTag: {
                id: tag.id,
                isFollower: true,
                __typename: 'Tag',
              },
            }
          : undefined,
      update(cache) {
        cache.evict({
          id: cache.identify(viewer),
          fieldName: 'bookmarkedTags',
        })
        cache.gc()
      },
    }
  )

  const onClick = async () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.bookmarkTag },
        })
      )
      return
    }

    await bookmark()

    toast.success({
      message: intl.formatMessage({
        defaultMessage: 'Bookmarked',
        id: 'k0fraU',
      }),
    })
  }

  return (
    <Button
      spacing={[8, 8]}
      textColor="greyDarker"
      textActiveColor="black"
      aria-label={intl.formatMessage({
        defaultMessage: 'Bookmark',
        id: 'QKJWqd',
        description: 'src/components/Buttons/TagBookmark/Bookmark.tsx',
      })}
      onClick={onClick}
    >
      <Icon icon={IconSave} size={22} />
    </Button>
  )
}

export default Bookmark
