import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import { Icon, TextIcon, Translate } from '~/components'
import ARCHIVE_ARTICLE from '~/components/GQL/mutations/archiveArticle'
import updateUserArticles from '~/components/GQL/updates/userArticles'

import ICON_ARCHIVE from '~/static/icons/archive.svg?sprite'

import { ArchiveButtonArticle } from './__generated__/ArchiveButtonArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment ArchiveButtonArticle on Article {
      id
      state
      author {
        id
        userName
      }
    }
  `
}

const ArchiveButton = ({
  article,
  hideDropdown
}: {
  article: ArchiveButtonArticle
  hideDropdown: () => void
}) => {
  const [archiveArticle] = useMutation(ARCHIVE_ARTICLE, {
    variables: { id: article.id },
    optimisticResponse: {
      archiveArticle: {
        id: article.id,
        state: 'archived',
        sticky: false,
        __typename: 'Article'
      }
    },
    update: (cache: any) => {
      updateUserArticles({
        cache,
        articleId: article.id,
        userName: article.author.userName,
        type: 'archive'
      })
    }
  })

  return (
    <button
      type="button"
      onClick={() => {
        archiveArticle()
        hideDropdown()
      }}
    >
      <TextIcon
        icon={
          <Icon
            id={ICON_ARCHIVE.id}
            viewBox={ICON_ARCHIVE.viewBox}
            size="small"
          />
        }
        spacing="tight"
      >
        <Translate zh_hant="站內隱藏" zh_hans="站内隐藏" />
      </TextIcon>
      <style jsx>{styles}</style>
    </button>
  )
}

ArchiveButton.fragments = fragments

export default ArchiveButton
