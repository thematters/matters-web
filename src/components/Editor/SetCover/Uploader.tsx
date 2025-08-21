import classNames from 'classnames'
import { useId } from 'react'
import { useVisuallyHidden } from 'react-aria'
import { useIntl } from 'react-intl'

import IconCirclePlus from '@/public/static/icons/24px/circle-plus.svg'
import { ACCEPTED_COVER_UPLOAD_IMAGE_TYPES, ENTITY_TYPE } from '~/common/enums'
import { validateImage } from '~/common/utils'
import { Icon } from '~/components'

import styles from './styles.module.css'

export interface UploadEntity {
  entityId: string
  entityType: ENTITY_TYPE.article | ENTITY_TYPE.draft
}

type UploaderProps = {
  addAssets: (files: File[]) => void
}

const Uploader: React.FC<UploaderProps> = ({ addAssets }) => {
  const intl = useIntl()
  const acceptTypes = ACCEPTED_COVER_UPLOAD_IMAGE_TYPES.join(',')
  const fieldId = useId()

  const { visuallyHiddenProps } = useVisuallyHidden()

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()

    if (!event.target || !event.target.files) {
      return
    }

    const file = event.target.files[0]
    event.target.value = ''

    const mime = await validateImage(file, false, true)
    if (!mime) {
      return
    }

    addAssets([file])
  }

  const labelClasses = classNames({
    [styles.uploader]: true,
  })

  return (
    <label className={labelClasses} htmlFor={fieldId}>
      <section className={styles.uploader}>
        <Icon icon={IconCirclePlus} color="greyDarker" size={32} />
      </section>
      <input
        id={fieldId}
        type="file"
        name="file"
        aria-label={intl.formatMessage({
          defaultMessage: 'Upload Cover',
          id: 'QvPc1q',
        })}
        accept={acceptTypes}
        multiple={false}
        onChange={handleChange}
        {...visuallyHiddenProps}
      />
    </label>
  )
}

export default Uploader
