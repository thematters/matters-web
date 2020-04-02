import VisuallyHidden from '@reach/visually-hidden'
import { useContext } from 'react'

import { Dialog, LoginButton, Translate, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import MIGRATION from '~/components/GQL/mutations/migration'

import {
  ACCEPTED_UPLOAD_MIGRATION_TYPES,
  ADD_TOAST,
  UPLOAD_FILE_COUNT_LIMIT,
  UPLOAD_MIGRATION_SIZE_LIMIT,
} from '~/common/enums'

import styles from './styles.css'

import { Migration } from '~/components/GQL/mutations/__generated__/Migration'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
} = {
  zh_hant: {
    content_1: '選擇並上傳檔案',
    content_2:
      '選中想要搬家的作品檔案並上傳，搬家成功的作品會匯入你的草稿箱' +
      '，目前支持上傳 HTML 檔案。',
    upload: '上傳檔案',
    count_limit: '上傳檔案數量已達上限，最多 50 個檔案',
    success: '作品上傳完成',
  },
  zh_hans: {
    content_1: '选择并上传文件',
    content_2:
      '选中想要搬家的作品文件并上传，搬家成功的作品会导入你的草稿箱' +
      '，目前支持上传 HTML 文件。',
    upload: '上传文件',
    count_limit: '上传档案数量已达上限，最多 50 个档案',
    success: '文件上传完成',
  },
}

interface MigrationDialogUploadProps {
  nextStep: () => void
}

const MigrationDialogUpload = ({ nextStep }: MigrationDialogUploadProps) => {
  const { zh_hant, zh_hans } = texts
  const acceptTypes = ACCEPTED_UPLOAD_MIGRATION_TYPES.join(',')

  const viewer = useContext(ViewerContext)
  const [migration, { loading }] = useMutation<Migration>(MIGRATION)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="UNAUTHENTICATED" />,
            customButton: <LoginButton isPlain />,
            buttonPlacement: 'center',
          },
        })
      )
      return
    }

    if (!migration || !event.target || !event.target.files) {
      return
    }

    if (event.target.files.length > UPLOAD_FILE_COUNT_LIMIT) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant={zh_hant.count_limit}
                zh_hans={zh_hans.count_limit}
              />
            ),
          },
        })
      )
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
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="MIGRATION_REACH_LIMIT" />,
          },
        })
      )
      return
    }

    try {
      await migration({
        variables: { input: { type: 'medium', files } },
      })

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <Translate zh_hant={zh_hant.success} zh_hans={zh_hans.success} />
            ),
          },
        })
      )
      nextStep()
    } catch (error) {
      // TODO: handle other exception
    }
  }

  const fieldId = 'migration-uploader'

  return (
    <>
      <Dialog.Content spacing={['base', 'base']}>
        <p className="action">
          <Translate zh_hant={zh_hant.content_1} zh_hans={zh_hans.content_1} />
        </p>
        <p className="description">
          <Translate zh_hant={zh_hant.content_2} zh_hans={zh_hans.content_2} />
        </p>
      </Dialog.Content>
      <label>
        <Dialog.Footer>
          <Dialog.Footer.Button
            loading={loading}
            onClick={() => {
              const element = document.getElementById(fieldId)
              if (element) {
                element.click()
              }
            }}
          >
            <Translate zh_hant={zh_hant.upload} zh_hans={zh_hans.upload} />
            <VisuallyHidden>
              <input
                id={fieldId}
                type="file"
                name="file"
                aira-label="上傳檔案"
                accept={acceptTypes}
                multiple={true}
                onChange={handleChange}
              />
            </VisuallyHidden>
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </label>
      <style jsx>{styles}</style>
    </>
  )
}

export default MigrationDialogUpload
