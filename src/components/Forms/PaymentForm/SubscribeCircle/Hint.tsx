import IconInfo from '@/public/static/icons/24px/information.svg'
import { Icon, TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

const SubscribeCircleHint = () => {
  return (
    <section className={styles.hint}>
      <TextIcon icon={<Icon icon={IconInfo} />} size={13} color="greyDarker">
        <Translate
          zh_hant="訂閱後，每月 1 日系統將扣除本期訂閱費用"
          zh_hans="订阅后，每月 1 日系统将扣除本期订阅费用"
        />
      </TextIcon>
    </section>
  )
}

export default SubscribeCircleHint
