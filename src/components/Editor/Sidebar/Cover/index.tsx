import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconCircleTimesFill } from '@/public/static/icons/24px/circle-times-fill.svg'
import { ReactComponent as IconImage } from '@/public/static/icons/24px/image.svg'
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
          rightButton={
            <>
              {cover ? (
                <div className={styles.cover}>
                  <div
                    className={styles.action}
                    onClick={() => {
                      restProps.editCover(undefined)
                    }}
                  >
                    <Icon
                      icon={IconCircleTimesFill}
                      color="greyDarker"
                      size={24}
                    />
                  </div>
                  <img
                    src={toSizedImageURL({
                      url: cover,
                      width: 72 * 2,
                      height: 72 * 2,
                    })}
                    alt="cover"
                  />
                </div>
              ) : (
                <button
                  onClick={openSetCoverDialog}
                  className={styles.rightButton}
                >
                  <Icon icon={IconImage} size={24} color="greyDarker" />{' '}
                </button>
              )}
            </>
          }
          title={<FormattedMessage defaultMessage="Set Cover" id="DjIpR6" />}
          subtitle={
            <FormattedMessage
              defaultMessage="Select or upload a square image"
              id="ammOoM"
            />
          }
          onClick={openSetCoverDialog}
          disabled={disabled}
        ></Box>
      )}
    </SetCover.Dialog>
  )
}

export default SidebarCover
