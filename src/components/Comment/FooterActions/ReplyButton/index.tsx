import { Icon } from '~/components'

import styles from './styles.css'

const ReplyButton = ({
  onClick,
  active,
  disabled
}: {
  onClick: () => any
  active: boolean
  disabled: boolean
}) => (
  <button
    type="button"
    className={active ? 'active' : ''}
    onClick={onClick}
    disabled={disabled}
  >
    <Icon.CommentSmall />

    <style jsx>{styles}</style>
  </button>
)

export default ReplyButton
