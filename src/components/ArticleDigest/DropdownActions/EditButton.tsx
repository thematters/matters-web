import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { IconEdit20, Menu } from '~/components'
import { EditArticleButtonArticleFragment } from '~/gql/graphql'

const fragments = {
  article: gql`
    fragment EditArticleButtonArticle on Article {
      id
      mediaHash
      slug
      author {
        id
        userName
      }
    }
  `,
}

const EditArticleButton = ({
  article,
}: {
  article: EditArticleButtonArticleFragment
}) => {
  const { href } = toPath({ page: 'articleDetail', article })

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Edit"
          id="ZVoJan"
          description="src/components/ArticleDigest/DropdownActions/EditButton.tsx"
        />
      }
      icon={<IconEdit20 size="mdS" />}
      href={`${href}/edit`}
      is="link"
    />
  )
}

EditArticleButton.fragments = fragments

export default EditArticleButton
