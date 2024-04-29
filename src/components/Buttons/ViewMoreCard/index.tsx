import classNames from 'classnames'

import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
import {
  Card,
  CardProps,
  Icon,
  IconProps,
  TextIcon,
  TextIconProps,
} from '~/components'

import styles from './styles.module.css'

type ViewMoreCardProps = {
  iconProps?: IconProps
  textIconProps?: TextIconProps
  textAlign?: 'center' | 'left'
} & CardProps

export const ViewMoreCard: React.FC<
  React.PropsWithChildren<ViewMoreCardProps>
> = ({
  iconProps,
  textIconProps,
  textAlign = 'left',
  children,
  ...cardProps
}) => {
  const viewMoreCardClasses = classNames({
    [styles.viewMoreCard]: true,
    [styles[textAlign]]: !!textAlign,
  })

  return (
    <section className={viewMoreCardClasses}>
      <Card
        spacing={['base', 'base']}
        borderColor="green"
        borderRadius="loose"
        bgActiveColor="none"
        {...cardProps}
      >
        <TextIcon
          icon={<Icon icon={IconRight} {...iconProps} />}
          textPlacement="left"
          color="green"
          {...textIconProps}
        >
          {children}
        </TextIcon>
      </Card>
    </section>
  )
}
