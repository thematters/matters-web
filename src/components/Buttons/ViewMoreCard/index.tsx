import classNames from 'classnames'

import {
  Card,
  CardProps,
  IconArrowRight16,
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
          icon={<IconArrowRight16 {...iconProps} />}
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
