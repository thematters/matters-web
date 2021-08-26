import { Button, TextIcon, Translate, withIcon } from '~/components'

import { toPath } from '~/common/utils'

import { ReactComponent as IconArrowDown } from '@/public/static/icons/8px/arrow-down.svg'

import styles from './styles.css'

type AboutMeButtonProps = {
  userName: string
}

const AboutMeButton: React.FC<AboutMeButtonProps> = ({ userName }) => {
  const path = toPath({
    page: 'userAbout',
    userName,
  })

  return (
    <Button
      href={path.href}
      bgColor="grey-lighter"
      size={[null, '1.5rem']}
      spacing={[0, 'tight']}
    >
      <span className="content">
        <TextIcon
          icon={withIcon(IconArrowDown)({ size: 'xxs' })}
          size="xs"
          color="black"
          weight="md"
          spacing="xxtight"
          textPlacement="left"
        >
          <Translate zh_hant="關於我" zh_hans="关于我" en="About Me" />
        </TextIcon>

        <style jsx>{styles}</style>
      </span>
    </Button>
  )
}

export default AboutMeButton
