import classNames from 'classnames'

import {
  Card,
  CardProps,
  IconArrowRight16,
  IconProps,
  TextIcon,
  TextIconProps,
} from '~/components'

import styles from './styles.css'

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
    viewMoreCard: true,
    [`${textAlign}`]: !!textAlign,
  })

  return (
    <section className={viewMoreCardClasses}>
      <Card spacing={['base', 'base']} {...cardProps}>
        <TextIcon
          icon={<IconArrowRight16 size="xs" {...iconProps} />}
          textPlacement="left"
          color="green"
          {...textIconProps}
        >
          {children}
        </TextIcon>
      </Card>

      <style jsx>{styles}</style>
    </section>
  )
}
