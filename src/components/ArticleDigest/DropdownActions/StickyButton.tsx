import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import {
  IconPin20,
  IconUnPin20,
  Menu,
  TextIcon,
  useMutation,
} from '~/components'
import updateUserArticles from '~/components/GQL/updates/userArticles'
import {
  StickyButtonArticleFragment,
  ToggleStickyMutation,
} from '~/gql/graphql'

const TOGGLE_STICKY = gql`
  mutation ToggleSticky($id: ID!, $sticky: Boolean!) {
    editArticle(input: { id: $id, sticky: $sticky }) {
      id
      sticky
    }
  }
`

const fragments = {
  article: gql`
    fragment StickyButtonArticle on Article {
      id
      sticky
      author {
        id
        userName
      }
    }
  `,
}

const StickyButton = ({
  article,
}: {
  article: StickyButtonArticleFragment
}) => {
  const [toggleSticky] = useMutation<ToggleStickyMutation>(TOGGLE_STICKY, {
    variables: { id: article.id, sticky: !article.sticky },
    optimisticResponse: {
      editArticle: {
        id: article.id,
        sticky: !article.sticky,
        __typename: 'Article',
      },
    },
    update: (cache) => {
      updateUserArticles({
        cache,
        articleId: article.id,
        userName: article.author.userName,
        type: article.sticky ? 'unsticky' : 'sticky',
      })
    },
  })

  return (
    <Menu.Item
      onClick={toggleSticky}
      textColor="greyDarker"
      textActiveColor="black"
    >
      {article.sticky ? (
        <TextIcon icon={<IconUnPin20 size="mdS" />} size="md" spacing="base">
          <FormattedMessage
            defaultMessage="Unpin from profile"
            description="src/components/ArticleDigest/DropdownActions/StickyButton.tsx"
          />
        </TextIcon>
      ) : (
        <TextIcon icon={<IconPin20 size="mdS" />} size="md" spacing="base">
          <FormattedMessage
            defaultMessage="Pin to profile"
            description="src/components/ArticleDigest/DropdownActions/StickyButton.tsx"
          />
        </TextIcon>
      )}
    </Menu.Item>
  )
}

StickyButton.fragments = fragments

export default StickyButton
