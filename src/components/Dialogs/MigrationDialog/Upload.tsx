import { VisuallyHidden } from '@reach/visually-hidden'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ACCEPTED_UPLOAD_MIGRATION_TYPES,
  ERROR_CODES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UPLOAD_FILE_COUNT_LIMIT,
  UPLOAD_MIGRATION_SIZE_LIMIT,
} from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Dialog,
  ERROR_MESSAGES,
  LanguageContext,
  toast,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import MIGRATION from '~/components/GQL/mutations/migration'
import { MigrationMutation } from '~/gql/graphql'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
} = {
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
  const { lang } = useContext(LanguageContext)

  const { zh_hant, zh_hans } = texts
  const acceptTypes = ACCEPTED_UPLOAD_MIGRATION_TYPES.join(',')

  const viewer = useContext(ViewerContext)
  const [migration, { loading }] = useMutation<MigrationMutation>(MIGRATION)

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
        message: (
          <Translate
            zh_hant={zh_hant.count_limit}
            zh_hans={zh_hans.count_limit}
          />
        ),
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
        message: (
          <Translate zh_hant={zh_hant.success} zh_hans={zh_hans.success} />
        ),
      })

      nextStep()
    } catch (error) {
      // TODO: handle other exception
    }
  }

  const fieldId = 'migration-uploader'

  return (
    <>
      <Dialog.Message>
        <p>
          <Translate zh_hant={zh_hant.content} zh_hans={zh_hans.content} />
        </p>
      </Dialog.Message>

      <label>
        <Dialog.Footer
          closeDialog={closeDialog}
          btns={
            <Dialog.RoundedButton
              text={
                <Translate zh_hant={zh_hant.upload} zh_hans={zh_hans.upload} />
              }
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
              text={
                <Translate zh_hant={zh_hant.upload} zh_hans={zh_hans.upload} />
              }
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

        <VisuallyHidden>
          <input
            id={fieldId}
            type="file"
            name="file"
            aria-label={translate({
              zh_hant: '上傳檔案',
              zh_hans: '上传档案',
              en: 'Upload file',
              lang,
            })}
            accept={acceptTypes}
            multiple
            onChange={handleChange}
          />
        </VisuallyHidden>
      </label>
    </>
  )
}

export default MigrationDialogUpload
