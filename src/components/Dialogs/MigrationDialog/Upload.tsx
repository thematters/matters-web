import { useContext, useId } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { FormattedMessage, useIntl } from 'react-intl'

import {
  ACCEPTED_UPLOAD_MIGRATION_TYPES,
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UPLOAD_FILE_COUNT_LIMIT,
  UPLOAD_MIGRATION_SIZE_LIMIT,
} from '~/common/enums'
import {
  Dialog,
  LanguageContext,
  toast,
  useMutation,
  ViewerContext,
} from '~/components'
import MIGRATION from '~/components/GQL/mutations/migration'
import { MigrationMutation } from '~/gql/graphql'

const texts = {
  zh_hant: {
    content:
      '選中想要搬家的作品檔案並上傳，目前一次最多支持上传 50 篇 HTML 档案。请特别注意区分作品档案和评论档案。搬家成功的作品會匯入你的草稿箱。',
    upload: '上傳檔案',
    count_limit: '上傳檔案數量已達上限，最多 50 個檔案',
    success: '作品上傳完成',
  },
  zh_hans: {
    content:
      '选中想要搬家的作品档案并上传，目前一次最多支持上传 50 篇 HTML 档案。请特别注意区分作品档案和评论档案。搬家成功的作品会导入你的草稿箱。',
    upload: '上传文件',
    count_limit: '上传档案数量已达上限，最多 50 个档案',
    success: '文件上传完成',
  },
}

interface MigrationDialogUploadProps {
  nextStep: () => void
  closeDialog: () => void
}

const MigrationDialogUpload = ({
  nextStep,
  closeDialog,
}: MigrationDialogUploadProps) => {
  const intl = useIntl()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const acceptTypes = ACCEPTED_UPLOAD_MIGRATION_TYPES.join(',')
  const [migration, { loading }] = useMutation<MigrationMutation>(MIGRATION)
  const language = lang === 'en' ? 'zh_hant' : lang

  const { visuallyHiddenProps } = useVisuallyHidden()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!viewer.isAuthed) {
      window.dispatchEvent(new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG))
      return
    }

    if (!migration || !event.target || !event.target.files) {
      return
    }

    if (event.target.files.length > UPLOAD_FILE_COUNT_LIMIT) {
      toast.error({
        message: texts[language].count_limit,
      })
      return
    }

    // gather files
    const items = event.target.files
    const counter = [...Array(event.target.files.length).keys()]
    const files: File[] = counter.map((index) => items[index])
    event.target.value = ''

    // calculate file sizes
    const sizes = files.reduce((sum, file) => sum + file.size, 0)

    if (sizes > UPLOAD_MIGRATION_SIZE_LIMIT) {
      toast.error({
        message: (
          <FormattedMessage
            {...ERROR_MESSAGES[ERROR_CODES.MIGRATION_REACH_LIMIT]}
          />
        ),
      })
      return
    }

    try {
      await migration({
        variables: { input: { type: 'medium', files } },
      })

      toast.success({
        message: texts[language].success,
      })

      nextStep()
    } catch (error) {
      // TODO: handle other exception
    }
  }

  const fieldId = useId()

  return (
    <>
      <Dialog.Content>
        <Dialog.Content.Message>
          <p>{texts[language].content}</p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <label>
        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={texts[language].upload}
              loading={loading}
              onClick={() => {
                const element = document.getElementById(fieldId)
                if (element) {
                  element.click()
                }
              }}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={texts[language].upload}
              loading={loading}
              onClick={() => {
                const element = document.getElementById(fieldId)
                if (element) {
                  element.click()
                }
              }}
            />
          }
        />

        <input
          id={fieldId}
          type="file"
          name="file"
          aria-label={intl.formatMessage({
            defaultMessage: 'Upload file',
            id: '6oOCCL',
          })}
          accept={acceptTypes}
          multiple
          onChange={handleChange}
          {...visuallyHiddenProps}
        />
      </label>
    </>
  )
}

export default MigrationDialogUpload
