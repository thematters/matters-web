import classNames from 'classnames'

import { Button, IconEdit, TextIcon, Translate } from '~/components'

import { TEXT, TextId } from '~/common/enums'

import styles from './styles.css'

interface BoxProps {
  icon: React.ReactNode
  title: TextId
  onClick: () => any
  disabled?: boolean
}

const Box: React.FC<BoxProps> = ({
  icon,
  title,
  onClick,
  disabled,
  children,
}) => {
  const boxClasses = classNames({
    box: true,
    'u-area-disable': disabled,
  })

  return (
    <section className={boxClasses}>
      <header>
        <TextIcon icon={icon} size="md" weight="md" spacing="xtight">
          <Translate id={title} />
        </TextIcon>

        <Button
          onClick={onClick}
          bgActiveColor="grey-lighter"
          spacing={['xtight', 'xtight']}
          aira-label={TEXT.zh_hant[title]}
        >
          <IconEdit color="grey" />
        </Button>
      </header>

      {children}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Box
