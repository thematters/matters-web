import { FormattedMessage } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import IconEdit from '@/public/static/icons/24px/edit.svg'
import { PATHS } from '~/common/enums'
import { Card } from '~/components'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import styles from './styles.module.css'

const NavPopover: React.FC = () => {
  return (
    <section className={styles.popOver}>
      <ul className={styles.list}>
        <li key="write-moment">
          <Card
            spacing={[12, 24]}
            textColor="black"
            textActiveColor="black"
            bgColor="transparent"
            borderRadius="base"
            role="menuitem"
            href={PATHS.MOMENT_DETAIL_EDIT}
          >
            <TextIcon
              icon={<Icon icon={IconComment} size={32} />}
              size={14}
              spacing={12}
              weight="normal"
              placement="bottom"
            >
              <FormattedMessage defaultMessage="Moment" id="afLdf2" />
            </TextIcon>
          </Card>
        </li>
        <li key="write-articles">
          <Card
            spacing={[12, 24]}
            textColor="black"
            textActiveColor="black"
            bgColor="transparent"
            borderRadius="base"
            role="menuitem"
            href={PATHS.ME_DRAFT_NEW}
          >
            <TextIcon
              icon={<Icon icon={IconEdit} size={32} />}
              size={14}
              spacing={12}
              weight="normal"
              placement="bottom"
            >
              <FormattedMessage defaultMessage="Article" id="jx7Hn3" />
            </TextIcon>
          </Card>
        </li>
      </ul>
    </section>
  )
}

export default NavPopover
