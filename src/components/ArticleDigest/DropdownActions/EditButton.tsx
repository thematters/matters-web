import gql from 'graphql-tag'

import { IconEdit16, Menu, TextIcon, Translate } from '~/components'

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
  const { href } = toPath({ page: 'articleDetail', article })

  return (
    <Menu.Item
      href={`${href}?${URL_QS.MODE_EDIT.key}=${URL_QS.MODE_EDIT.value}`}
      is="link"
    >
      <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
        <Translate id="editArticle" />
      </TextIcon>
    </Menu.Item>
  )
}

EditArticleButton.fragments = fragments

export default EditArticleButton
