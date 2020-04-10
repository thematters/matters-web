import classNames from 'classnames';

import { Icon } from '~/components';

import styles from './styles.css';

type IconType =
  | 'appreciate'
  | 'bookmark'
  | 'comment'
  | 'logo'
  | 'user'
  | 'upvote'
  | 'volume';

const getIcon = (type: IconType) => {
  switch (type) {
    case 'appreciate':
      return <Icon.Like color="green" />;
    case 'bookmark':
      return <Icon.Bookmark color="green" />;
    case 'comment':
      return <Icon.Comment color="green" />;
    case 'logo':
      return <Icon.AvatarLogo size="lg" />;
    case 'user':
      return <Icon.User color="green" size="lg" />;
    case 'upvote':
      return <Icon.UpVote color="green" />;
    case 'volume':
      return <Icon.Volume color="grey-dark" size="lg" />;
  }
};

const NoticeTypeIcon = ({
  hasSpacing,
  type,
}: {
  hasSpacing?: boolean;
  type: IconType;
}) => {
  const icon = getIcon(type);

  const iconWrapClasses = classNames({
    'icon-wrap': hasSpacing,
  });

  return (
    <section className={iconWrapClasses}>
      {icon}
      <style jsx>{styles}</style>
    </section>
  );
};

export default NoticeTypeIcon;
