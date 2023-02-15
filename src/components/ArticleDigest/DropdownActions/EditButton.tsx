import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { URL_QS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { IconEdit16, Menu, TextIcon } from '~/components'
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
      href={`${href}?${URL_QS.MODE_EDIT.key}=${URL_QS.MODE_EDIT.value}`}
      is="link"
    >
      <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
        <FormattedMessage defaultMessage="Edit" description="src/components/ArticleDigest/DropdownActions/EditButton.tsx"/>
      </TextIcon>
    </Menu.Item>
  )
}

EditArticleButton.fragments = fragments

export default EditArticleButton
