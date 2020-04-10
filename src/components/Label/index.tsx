import classNames from 'classnames';

import styles from './styles.css';

type LabelSize = 'sm' | 'default';

interface LabelProps {
  size?: LabelSize;
}

/**
 *
 * Usage:
 *
 * ```tsx *
 * <Label size="sm">作者推薦</Label>
 * ```
 */

export const Label: React.FC<LabelProps> = ({ size = 'default', children }) => {
  const labelClasses = classNames({
    label: true,
    [size]: true,
  });

  return (
    <span className={labelClasses}>
      {children}

      <style jsx>{styles}</style>
    </span>
  );
};
