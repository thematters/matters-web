import gql from 'graphql-tag'

import { IconEdit, Menu, TextIcon, Translate } from '~/components'

import { URL_QS } from '~/common/enums'
import { toPath } from '~/common/utils'

import { EditArticleButtonArticle } from './__generated__/EditArticleButtonArticle'

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
  article: EditArticleButtonArticle
}) => {
  const query = { [URL_QS.MODE_EDIT.key]: URL_QS.MODE_EDIT.value }
  const { href, as } = toPath({ page: 'articleDetail', article }, query)

  return (
    <Menu.Item
      href={href}
      as={`${as}?${URL_QS.MODE_EDIT.key}=${URL_QS.MODE_EDIT.value}`}
    >
      <TextIcon icon={<IconEdit size="md" />} size="md" spacing="base">
        <Translate id="editArticle" />
      </TextIcon>
    </Menu.Item>
  )
}

EditArticleButton.fragments = fragments

export default EditArticleButton
