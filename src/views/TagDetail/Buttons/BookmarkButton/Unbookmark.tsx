import _isNil from 'lodash/isNil'
import { useIntl } from 'react-intl'

import { ReactComponent as IconSave2 } from '@/public/static/icons/24px/save2.svg'
import { Button, Icon, useMutation } from '~/components'
import TOGGLE_BOOKMARK_TAG from '~/components/GQL/mutations/toggleBookmarkTag'
import {
  BookmarkButtonTagPrivateFragment,
  ToggleBookmarkTagMutation,
} from '~/gql/graphql'

interface UnbookmarkTagProps {
  tag: BookmarkButtonTagPrivateFragment
}

const Unbookmark = ({ tag }: UnbookmarkTagProps) => {
  const intl = useIntl()
  const [unfollow] = useMutation<ToggleBookmarkTagMutation>(
    TOGGLE_BOOKMARK_TAG,
    {
      variables: { id: tag.id, enabled: false },
      optimisticResponse:
        !_isNil(tag.id) && !_isNil(tag.isFollower)
          ? {
              toggleBookmarkTag: {
                id: tag.id,
                isFollower: false,
                __typename: 'Tag',
              },
            }
          : undefined,
    }
  )

  return (
    <Button
      spacing={[8, 8]}
      textColor="greyDarker"
      textActiveColor="black"
      aria-label={intl.formatMessage({
        defaultMessage: 'Remove bookmark',
        id: 'FEkOVJ',
        description: 'src/components/Buttons/Bookmark/Unsubscribe.tsx',
      })}
      onClick={() => unfollow()}
    >
      <Icon icon={IconSave2} size={22} />
    </Button>
  )
}

export default Unbookmark
