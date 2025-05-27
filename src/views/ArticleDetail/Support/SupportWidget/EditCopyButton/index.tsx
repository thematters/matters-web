import { FormattedMessage } from 'react-intl'

import IconEdit from '@/public/static/icons/24px/edit.svg'
import { analytics } from '~/common/utils'
import { Button, Icon, TextIcon } from '~/components'
import SupportSettingDialog from '~/components/Editor/MoreSettings/SupportSettingDialog'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import { useEditArticleDetailSupportSetting } from '../../../Hook'

interface EditCopyButtonProps {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  disabled?: boolean
}

const EditCopyButton = ({ article, disabled }: EditCopyButtonProps) => {
  const { edit: editSupport, saving: supportSaving } =
    useEditArticleDetailSupportSetting(article.id)

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
            disabled={disabled}
            onClick={() => {
              analytics.trackEvent('click_button', {
                type: 'edit_support_copy',
                pageType: 'article_detail',
              })
              openDialog()
            }}
          >
            <TextIcon
              icon={<Icon icon={IconEdit} size={20} />}
              size={16}
              color="gold"
            >
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
