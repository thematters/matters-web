import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import { ReactComponent as IconStory } from '@/public/static/icons/24px/story.svg'
import { PATHS } from '~/common/enums'
import { Card } from '~/components'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import styles from './styles.module.css'

const NavPopover: React.FC = () => {
  return (
    <section className={styles['pop-over']}>
      <ul className={styles.list}>
        <li key={'new-journal'}>
          <Card
            spacing={[8, 16]}
            textColor="greyDarker"
            textActiveColor="black"
            bgColor="transparent"
            role="menuitem"
            borderRadius="xxtight"
          >
            <TextIcon
              icon={<Icon icon={IconStory} size={32} />}
              size={12}
              spacing={12}
              weight={'normal'}
              placement="bottom"
            >
              <FormattedMessage defaultMessage="New Journal" id="subQNF" />
            </TextIcon>
          </Card>
        </li>
        <li key={'write-articles'}>
          <Card
            spacing={[8, 16]}
            textColor="greyDarker"
            textActiveColor="black"
            bgColor="transparent"
            role="menuitem"
            href={PATHS.ME_DRAFT_NEW}
            borderRadius="xxtight"
          >
            <TextIcon
              icon={<Icon icon={IconEdit} size={32} />}
              size={12}
              spacing={12}
              weight={'normal'}
              placement="bottom"
            >
              <FormattedMessage defaultMessage="Write Articles" id="Xj0yv9" />
            </TextIcon>
          </Card>
        </li>
      </ul>
    </section>
  )
}

export default NavPopover
