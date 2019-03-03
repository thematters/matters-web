import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import ICON_RELOAD from '~/static/icons/reload.svg?sprite'

import styles from './styles.css'

export const ShuffleButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick}>
    <TextIcon
      icon={
        <Icon
          id={ICON_RELOAD.id}
          viewBox={ICON_RELOAD.viewBox}
          style={{ width: 14, height: 14 }}
        />
      }
      color="grey"
    >
      <Translate zh_hant="換一批" zh_hans="换一批" />
    </TextIcon>
    <style jsx>{styles}</style>
  </button>
)
