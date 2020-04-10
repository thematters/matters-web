import classNames from 'classnames';

import styles from './styles.css';

interface SlidesProps {
  bgColor: 'yellow-lighter' | 'green-lighter' | 'grey-lighter';
  header: React.ReactNode;
}

interface SlideItemProps {
  size?: 'sm' | 'md';
}

const SlideItem: React.FC<SlideItemProps> = ({ size = 'sm', children }) => {
  const slidesItemClass = classNames({
    [`size-${size}`]: !!size,
  });

  return (
    <li className={slidesItemClass}>
      {children}
      <style jsx>{styles}</style>
    </li>
  );
};

export const Slides: React.FC<SlidesProps> & { Item: typeof SlideItem } = ({
  bgColor,
  header,
  children,
}) => {
  const slidesClass = classNames({
    slides: true,
    [`bg-${bgColor}`]: !!bgColor,
  });

  return (
    <section className={slidesClass}>
      {header}

      <ul>{children}</ul>

      <style jsx>{styles}</style>
    </section>
  );
};

Slides.Item = SlideItem;
