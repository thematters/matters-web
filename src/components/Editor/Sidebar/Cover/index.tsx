import { IconImage24 } from '~/components'

import SetCoverDialog, { BaseSetCoverDialogProps } from '../../SetCoverDialog'
import Box from '../Box'
import styles from './styles.css'

export type SidebarCoverProps = {
  disabled?: boolean
} & BaseSetCoverDialogProps

const SidebarCover = ({ cover, disabled, ...restProps }: SidebarCoverProps) => {
  return (
    <SetCoverDialog cover={cover} {...restProps}>
      {({ open: openSetCoverDialog }) => (
        <Box
          icon={<IconImage24 size="md" />}
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

export default SidebarCover
