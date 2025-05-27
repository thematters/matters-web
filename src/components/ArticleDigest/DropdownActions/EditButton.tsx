import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import IconEdit from '@/public/static/icons/24px/edit.svg'
import { MAX_ARTICLE_REVISION_COUNT } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, Menu, toast } from '~/components'
import { EditArticleButtonArticleFragment } from '~/gql/graphql'

const fragments = {
  article: gql`
    fragment EditArticleButtonArticle on Article {
      id
      shortHash
      slug
      revisionCount
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
  const path = toPath({ page: 'articleEdit', article })
  const isExceedRevision = article.revisionCount >= MAX_ARTICLE_REVISION_COUNT
  const onExceed = () => {
    toast.warning({
      message: (
        <FormattedMessage defaultMessage="Used up edit quota" id="NFIbLb" />
      ),
    })
    return
  }

  return (
    <Menu.Item
      text={
        <FormattedMessage
          defaultMessage="Edit"
          id="ZVoJan"
          description="src/components/ArticleDigest/DropdownActions/EditButton.tsx"
        />
      }
      icon={<Icon icon={IconEdit} size={20} />}
      onClick={isExceedRevision ? onExceed : undefined}
      href={isExceedRevision ? undefined : path.href}
      is={isExceedRevision ? undefined : 'link'}
    />
  )
}

EditArticleButton.fragments = fragments

export default EditArticleButton
