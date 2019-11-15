import classNames from 'classnames'
import Link from 'next/link'

import IconSpinner from '~/components/Icon/Spinner'

import styles from './styles.css'

interface BaseButtonProps {
  width?: 'half' | 'full'
  bgColor?: 'white' | 'green'
  loading?: boolean

  [key: string]: any
}

type LinkButtonProps = {
  is: 'link'
  href: string
  as: string
} & BaseButtonProps

type AnchorButtonProps = {
  is: 'anchor'
  href: string
} & BaseButtonProps

type NativeButtonProps = {
  is?: 'button'
  htmlType?: 'button' | 'submit'
} & BaseButtonProps

type ButtonProps = LinkButtonProps | NativeButtonProps | AnchorButtonProps

const FooterButton: React.FC<ButtonProps> = ({
  width = 'half',
  bgColor = 'green',
  loading,

  is = 'button',
  href,
  as,
  htmlType = 'button',

  children,
  className,
  ...restProps
}) => {
  const buttonClasses = classNames({
    btn: true,
    [`bg-${bgColor}`]: !!bgColor,
    [`width-${width}`]: !!width,
    [className]: !!className
  })

  // link
  if (is === 'link') {
    return (
      <>
        <Link href={href} as={as}>
          <a className={buttonClasses} {...restProps}>
            {children}
          </a>
        </Link>

        <style jsx>{styles}</style>
      </>
    )
  }

  // anchor
  if (is === 'anchor') {
    return (
      <a href={href} className={buttonClasses} {...restProps}>
        {children}

        <style jsx>{styles}</style>
      </a>
    )
  }

  // button
  return (
    <>
      <button type={htmlType} className={buttonClasses} {...restProps}>
        {loading && <IconSpinner />}
        {!loading && children}
      </button>

      <style jsx>{styles}</style>
    </>
  )
}

export default FooterButton
