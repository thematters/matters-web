import { IconHashTagMedium } from '~/components'

import Box from '../Box'
import SetCoverDialog, { BaseSetCoverDialogProps } from './SetCoverDialog'
import styles from './styles.css'

type AddTagsProps = {
  disabled?: boolean
} & BaseSetCoverDialogProps

const AddTags = ({ cover, disabled, ...restProps }: AddTagsProps) => {
  return (
    <SetCoverDialog cover={cover} {...restProps}>
      {({ open: openSetCoverDialog }) => (
        <Box
          icon={<IconHashTagMedium size="md" />}
          title="setCover"
          onClick={openSetCoverDialog}
          disabled={disabled}
        >
          <section className="container">
            <div className="cover">
              <img src={cover} />
            </div>

            <style jsx>{styles}</style>
          </section>
        </Box>
      )}
    </SetCoverDialog>
  )
}

export default AddTags
