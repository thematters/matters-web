import { IconImage24 } from '~/components'

import SetCover, { SetCoverProps } from '../../SetCover'
import Box from '../Box'
import styles from './styles.module.css'

export type SidebarCoverProps = {
  disabled?: boolean
} & SetCoverProps

const SidebarCover = ({ cover, disabled, ...restProps }: SidebarCoverProps) => {
  return (
    <SetCover.Dialog cover={cover} {...restProps}>
      {({ openDialog: openSetCoverDialog }) => (
        <Box
          icon={<IconImage24 size="md" />}
          title="setCover"
          onClick={openSetCoverDialog}
          disabled={disabled}
        >
          {cover && (
            <section className="container">
              <div className="cover">
                <img src={cover} alt="cover" />
              </div>
            </section>
          )}
        </Box>
      )}
    </SetCover.Dialog>
  )
}

export default SidebarCover
