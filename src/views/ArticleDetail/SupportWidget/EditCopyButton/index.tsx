import { FormattedMessage } from 'react-intl'

import { Button, IconEdit20, TextIcon } from '~/components'
import SupportSettingDialog from '~/components/Editor/ToggleAccess/SupportSettingDialog'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import { useEditArticleDetailSupportSetting } from '../../Hook'

interface EditCopyButtonProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

const EditCopyButton = ({ article }: EditCopyButtonProps) => {
  const { edit: editSupport, saving: supportSaving } =
    useEditArticleDetailSupportSetting(article)

  return (
    <SupportSettingDialog
      article={article}
      editSupportSetting={editSupport}
      supportSettingSaving={supportSaving}
    >
      {({ openDialog }) => (
        <>
          <Button
            size={['19.5rem', '2.5rem']}
            bgColor="white"
            borderColor="gold"
            borderWidth="sm"
            aria-haspopup="dialog"
            aria-label={
              <FormattedMessage
                defaultMessage="Support setting"
                id="RGEpvx"
                description="src/views/ArticleDetail/SupportWidget/EditCopyButton/index.tsx"
              />
            }
            onClick={openDialog}
          >
            <TextIcon icon={<IconEdit20 size="mdS" />} size="md" color="gold">
              <FormattedMessage
                defaultMessage="Support setting"
                id="RGEpvx"
                description="src/views/ArticleDetail/SupportWidget/EditCopyButton/index.tsx"
              />
            </TextIcon>
          </Button>
        </>
      )}
    </SupportSettingDialog>
  )
}

export default EditCopyButton
