import classNames from 'classnames';
import gql from 'graphql-tag';

import ICON_AVATAR_DEFAULT from '~/static/icons/avatar-default.svg';
import IMAGE_CIVIC_LIKER_RING from '~/static/icons/civic-liker-ring.svg';

import styles from './styles.css';

import { AvatarUser } from './__generated__/AvatarUser';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface AvatarProps {
  user?: AvatarUser;
  size?: AvatarSize;
  src?: string;
  hasCivicLikerRing?: boolean;
}

const fragments = {
  user: gql`
    fragment AvatarUser on User {
      avatar
    }
  `,
};

export const Avatar = (props: AvatarProps) => {
  const { user, size = '', src, hasCivicLikerRing } = props;
  const source = src || user?.avatar || ICON_AVATAR_DEFAULT;
  const avatarClasses = classNames({
    avatar: true,
    [size]: !!size,
  });

  return (
    <>
      <div
        className={avatarClasses}
        style={{ backgroundImage: `url(${source})` }}
        aria-hidden="true"
      >
        {hasCivicLikerRing && <span className="civic-liker-ring" />}
      </div>

      <style jsx>{styles}</style>

      <style jsx>{`
        .civic-liker-ring {
          background-image: url(${IMAGE_CIVIC_LIKER_RING});
        }
      `}</style>
    </>
  );
};

Avatar.fragments = fragments;
