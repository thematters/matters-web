import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import ARCHIVE_ARTICLE from '~/components/GQL/mutations/archiveArticle'
import updateUserArticles from '~/components/GQL/updates/userArticles'

import styles from './styles.css'

import { ArchiveArticle } from '~/components/GQL/mutations/__generated__/ArchiveArticle'
import { ArchiveButtonArticle } from './__generated__/ArchiveButtonArticle'

const fragments = {
  article: gql`
    fragment ArchiveButtonArticle on Article {
      id
      articleState: state
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
  const [archiveArticle] = useMutation<ArchiveArticle>(ARCHIVE_ARTICLE, {
    variables: { id: article.id },
    optimisticResponse: {
      archiveArticle: {
        id: article.id,
        articleState: 'archived' as any,
        sticky: false,
        __typename: 'Article'
      }
    },
    update: cache => {
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
      <TextIcon icon={<Icon.ArchiveMedium />} spacing="tight">
        <Translate zh_hant="站內隱藏" zh_hans="站内隐藏" />
      </TextIcon>

      <style jsx>{styles}</style>
    </button>
  )
}

ArchiveButton.fragments = fragments

export default ArchiveButton
