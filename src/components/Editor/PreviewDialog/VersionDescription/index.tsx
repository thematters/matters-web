import { useIntl } from 'react-intl'

import IconRight from '@/public/static/icons/24px/right.svg'
import { Icon } from '~/components'

import SetVersionDescriptionDialog from '../../SetVersionDescription'
import styles from './styles.module.css'

export const VersionDescription = ({
  versionDescription,
  editVersionDescription,
}: {
  versionDescription: string
  editVersionDescription: (description: string) => void
  closeDialog: () => void
}) => {
  const intl = useIntl()

  const title = intl.formatMessage({
    defaultMessage: 'Version Description',
    id: 'rDX3h6',
  })
  const description =
    versionDescription ||
    intl.formatMessage({
      defaultMessage: 'Tell readers why you edited this time...',
      id: 'HzB4Lk',
    })

  return (
    <SetVersionDescriptionDialog
      description={versionDescription}
      editDescription={editVersionDescription}
    >
      {({ openDialog }) => (
        <button className={styles.container} onClick={openDialog}>
          <section className={styles.left}>
            <span className={styles.title}>{title}</span>
            <section className={styles.description}>{description}</section>
          </section>
          <section className={styles.right}>
            <Icon icon={IconRight} size={14} color="black" />
          </section>
        </button>
      )}
    </SetVersionDescriptionDialog>
  )
}
