import VisuallyHidden from '@reach/visually-hidden'
import { useContext, useState } from 'react'

import {
  Button,
  LoginButton,
  Spinner,
  TextIcon,
  Translate,
  ViewerContext
} from '~/components'
import { useMutation } from '~/components/GQL'
import MIGRATION from '~/components/GQL/mutations/migration'

import {
  ACCEPTED_UPLOAD_MIGRATION_TYPES,
  ADD_TOAST,
  UPLOAD_MIGRATION_SIZE_LIMIT
} from '~/common/enums'

import styles from './styles.css'

import { SingleFileUpload } from '~/components/GQL/mutations/__generated__/SingleFileUpload'

const uploadSuccess = (
  <Translate zh_hant="作品已上傳完成" zh_hans="作品已上传完成" />
)

export const MigrationUploader = () => {
  const [uploaded, setUploaded] = useState<boolean>(false)

  const viewer = useContext(ViewerContext)

  const [migration, { loading }] = useMutation<SingleFileUpload>(MIGRATION)

  const acceptTypes = ACCEPTED_UPLOAD_MIGRATION_TYPES.join(',')

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="UNAUTHENTICATED" />,
            customButton: <LoginButton isPlain />,
            buttonPlacement: 'center'
          }
        })
      )
      return
    }

    if (!migration || !event.target || !event.target.files) {
      return
    }

    // gather files
    const items = event.target.files
    const counter = [...Array(event.target.files.length).keys()]
    const files: File[] = counter.map(index => items[index])
    event.target.value = ''

    // calculate file sizes
    const sizes = files.reduce((sum, file) => sum + file.size, 0)

    if (sizes > UPLOAD_MIGRATION_SIZE_LIMIT) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="MIGRATION_REACH_LIMIT" />
          }
        })
      )
      return
    }

    try {
      const result = await migration({
        variables: { input: { type: 'medium', files } }
      })

      if (result) {
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: uploadSuccess
            }
          })
        )
        setUploaded(true)
      }
    } catch (error) {
      // TODO: handle other exception
    }
  }

  return (
    <section>
      <Button
        aria-haspopup="true"
        bgColor="green"
        size={['7rem', '2.5rem']}
        spacing={[0, 0]}
        onClick={() => {
          setUploaded(false)
          const element = document.getElementById('migration-uploader')
          if (element) {
            element.click()
          }
        }}
      >
        <TextIcon color="white" size="md" weight="md">
          {loading ? (
            <Spinner />
          ) : (
            <Translate zh_hant="導入作品" zh_hans="导入作品" />
          )}
        </TextIcon>
      </Button>
      <p className="info">{uploaded && uploadSuccess}</p>
      <VisuallyHidden>
        <input
          id="migration-uploader"
          type="file"
          name="file"
          aira-label="導入作品"
          accept={acceptTypes}
          multiple={true}
          onChange={handleChange}
        />
      </VisuallyHidden>
      <style jsx>{styles}</style>
    </section>
  )
}
