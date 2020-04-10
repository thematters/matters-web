import classNames from 'classnames';
import React from 'react';

import styles from './styles.css';

interface MenuDividerProps {
  spacing?: 0 | 'xtight' | 'loose';
}

const MenuDivider: React.FC<MenuDividerProps> = ({ spacing = 0 }) => {
  const dividerClass = classNames({
    [`spacing-${spacing}`]: !!spacing,
  });

  return (
    <>
      <hr className={dividerClass} />
      <style jsx>{styles}</style>
    </>
  );
};

export default MenuDivider;
