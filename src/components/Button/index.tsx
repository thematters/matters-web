import classNames from 'classnames';
import Link from 'next/link';
import { forwardRef } from 'react';

import styles from './styles.css';

export type ButtonWidth =
  | '2rem'
  | '3rem'
  | '3.25rem'
  | '4rem'
  | '5rem'
  | '6rem'
  | '7rem'
  | '8rem'
  | '100%'
  | undefined
  | null;

export type ButtonHeight =
  | '1rem'
  | '1.25rem'
  | '1.5rem'
  | '2rem'
  | '2.25rem'
  | '2.5rem'
  | '3rem'
  | undefined
  | null;

export type ButtonSpacingY = 0 | 'xxtight' | 'xtight' | 'tight' | 'base';

export type ButtonSpacingX =
  | 0
  | 'xxtight'
  | 'xtight'
  | 'tight'
  | 'base'
  | 'loose';

type ButtonColor =
  | 'white'
  | 'black'
  | 'half-black'
  | 'grey'
  | 'grey-light'
  | 'grey-lighter'
  | 'grey-lighter-active'
  | 'green-lighter'
  | 'green'
  | 'gold'
  | 'red';

type ButtonTextColor = Extract<
  ButtonColor,
  'white' | 'black' | 'green' | 'red'
>;

export type ButtonBgColor = Extract<
  ButtonColor,
  | 'grey'
  | 'grey-lighter'
  | 'green-lighter'
  | 'green'
  | 'gold'
  | 'red'
  | 'white'
  | 'half-black'
>;

type ButtonBgActiveColor = Extract<
  ButtonColor,
  'grey-lighter' | 'green-lighter' | 'grey-lighter-active' | 'green' | 'red'
>;

export interface ButtonProps {
  size?: [ButtonWidth, ButtonHeight];
  spacing?: [ButtonSpacingY, ButtonSpacingX];

  textColor?: ButtonTextColor;
  textActiveColor?: ButtonTextColor;

  bgColor?: ButtonBgColor;
  bgActiveColor?: ButtonBgActiveColor;

  borderColor?: ButtonColor;
  borderWidth?: 'sm' | 'md';
  borderRadius?: 0 | '5rem';

  href?: string;
  as?: string;

  is?: 'span';

  [key: string]: any;
}

/**
 * `<Button>` is an inline-block element with centered children.
 *
 * Usage:
 *
 * ```jsx
 *  // with custom spacing
 *  <Button
 *    spacing={['xtight', 'xtight']}
 *    onClick={onClick}
 *  >
 *    <Icon.BookmarkActive />
 *  </Button>
 *
 *  // with custom size, border, hover text & background
 *  <Button
 *    size={['4rem', '1.5rem']}
 *    textColor="green"
 *    textActiveColor="white"
 *    bgActiveColor="green"
 *    borderColor="green"
 *    onClick={onClick}
 *  >
 *    <TextIcon weight="md" size="xs">
 *      <Translate id="follow" />
 *    </TextIcon>
 *  </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = forwardRef(
  (
    {
      spacing = [0, 0],
      size = [null, null],

      textColor,
      textActiveColor,

      bgColor,
      bgActiveColor,

      borderColor,
      borderWidth = 'md',
      borderRadius = '5rem',

      href,
      as,

      is,
      type,

      className,
      children,
      ...restProps
    },
    ref
  ) => {
    const isClickable = is !== 'span' && !restProps.disabled;
    const isTransparent = !bgColor && !borderColor;
    const [width, height] = size;
    const [spacingY, spacingX] = spacing;

    // container
    const containerClass = classNames({
      container: true,
      isTransparent,
      'centering-x': width && isTransparent,
      'centering-y': height && isTransparent,
      [`spacing-y-${spacingY}`]: !!spacingY,
      [`spacing-x-${spacingX}`]: !!spacingX,
      [`bg-${bgColor}`]: !!bgColor,
      [`bg-active-${bgActiveColor}`]: !!bgActiveColor && isClickable,
      [`border-${borderColor}`]: !!borderColor,
      [`border-${borderWidth}`]: borderWidth && borderColor,
      [`text-${textColor}`]: !!textColor,
      [`text-active-${textActiveColor}`]: !!textActiveColor && isClickable,
      [className]: !!className,
    });
    const containerProps = {
      ...restProps,
      ref: ref as React.RefObject<any>,
      className: containerClass,
    };

    // content
    const contentStyle = {
      width: (!isTransparent && width) || undefined,
      height: (!isTransparent && height) || undefined,
    };

    // hotarea
    const hotAreaStyle = {
      width: width || undefined,
      height: height || undefined,
      borderRadius,
    };

    // span
    if (is === 'span') {
      return (
        <span {...containerProps}>
          <div className="content" style={contentStyle}>
            <div className="hotarea" style={hotAreaStyle} />
            {children}
          </div>
          <style jsx>{styles}</style>
        </span>
      );
    }

    // anchor
    if (href && !as) {
      return (
        <a href={href} {...containerProps}>
          <div className="content" style={contentStyle}>
            <div className="hotarea" style={hotAreaStyle} />
            {children}
          </div>
          <style jsx>{styles}</style>
        </a>
      );
    }

    // link
    if (href && as) {
      return (
        <Link href={href} as={as}>
          <a {...containerProps}>
            <div className="content" style={contentStyle}>
              <div className="hotarea" style={hotAreaStyle} />
              {children}
            </div>
            <style jsx>{styles}</style>
          </a>
        </Link>
      );
    }

    // button
    return (
      <button {...containerProps} type={type || 'button'}>
        <div className="content" style={contentStyle}>
          <div className="hotarea" style={hotAreaStyle} />
          {children}
        </div>
        <style jsx>{styles}</style>
      </button>
    );
  }
);
