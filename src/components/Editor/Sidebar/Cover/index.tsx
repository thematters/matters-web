import { FormattedMessage } from 'react-intl'

import IconImage from '@/public/static/icons/24px/image.svg'
import { toSizedImageURL } from '~/common/utils'
import { Icon } from '~/components'

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
          icon={<Icon icon={IconImage} size={24} />}
          title={<FormattedMessage defaultMessage="Set Cover" id="DjIpR6" />}
          onClick={openSetCoverDialog}
          disabled={disabled}
        >
          {cover && (
            <section className={styles.container}>
              <div className={styles.cover}>
                <img
                  src={toSizedImageURL({
                    url: cover,
                    width: 230,
                    height: 230,
                  })}
                  alt="cover"
                />
              </div>
            </section>
          )}
        </Box>
      )}
    </SetCover.Dialog>
  )
}

export default SidebarCover
