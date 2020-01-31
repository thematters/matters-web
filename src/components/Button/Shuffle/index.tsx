import { Icon, TextIcon, Translate } from '~/components'

import styles from './styles.css'

export const ShuffleButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick}>
    <TextIcon icon={<Icon.Reload size="sm" />} color="grey">
      <Translate zh_hant="換一批" zh_hans="换一批" />
    </TextIcon>

    <style jsx>{styles}</style>
  </button>
)
