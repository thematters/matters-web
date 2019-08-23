import { Icon, TextIcon, Translate } from '~/components'
import { Mutation } from '~/components/GQL'
import ARCHIVE_ARTICLE from '~/components/GQL/mutations/archiveArticle'

import ICON_ARCHIVE from '~/static/icons/archive.svg?sprite'

import styles from './styles.css'

const ArchiveButton: React.FC<{
  articleId: string
  hideDropdown: () => void
  refetch?: () => void
}> = ({ articleId, hideDropdown, refetch }) => {
  return (
    <Mutation
      mutation={ARCHIVE_ARTICLE}
      variables={{ id: articleId }}
      optimisticResponse={{
        archiveArticle: {
          id: articleId,
          state: 'archived',
          sticky: false,
          __typename: 'Article'
        }
      }}
      onCompleted={() => {
        if (refetch) {
          refetch()
        }
      }}
    >
      {archiveArticle => (
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
      )}
    </Mutation>
  )
}

export default ArchiveButton
