import { IconImageMedium } from '~/components'

import SetCoverDialog, { BaseSetCoverDialogProps } from '../../SetCoverDialog'
import Box from '../Box'
import styles from './styles.css'

type AddTagsProps = {
  disabled?: boolean
} & BaseSetCoverDialogProps

const AddTags = ({ cover, disabled, ...restProps }: AddTagsProps) => {
  return (
    <SetCoverDialog cover={cover} {...restProps}>
      {({ open: openSetCoverDialog }) => (
        <Box
          icon={<IconImageMedium size="md" />}
          title="setCover"
          onClick={openSetCoverDialog}
          disabled={disabled}
        >
          {cover && (
            <section className="container">
              <div className="cover">
                <img src={cover} />
              </div>

              <style jsx>{styles}</style>
            </section>
          )}
        </Box>
      )}
    </SetCoverDialog>
  )
}

export default AddTags
