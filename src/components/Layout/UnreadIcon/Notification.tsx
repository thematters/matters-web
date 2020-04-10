import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import { useContext, useEffect } from 'react';

import { Icon, ViewerContext } from '~/components';
import { UNREAD_NOTICE_COUNT } from '~/components/GQL/queries/notice';

import { POLL_INTERVAL } from '~/common/enums';

import styles from './styles.css';

import { UnreadNoticeCount } from '~/components/GQL/queries/__generated__/UnreadNoticeCount';

interface UnreadIconProps {
  active?: boolean;
}

const NotificationUnreadIcon: React.FC<UnreadIconProps> = ({ active }) => {
  const viewer = useContext(ViewerContext);
  const { data, startPolling } = useQuery<UnreadNoticeCount>(
    UNREAD_NOTICE_COUNT,
    {
      errorPolicy: 'ignore',
      fetchPolicy: 'network-only',
      skip: !viewer.isAuthed || !process.browser,
    }
  );

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    if (viewer.isAuthed) {
      startPolling(POLL_INTERVAL);
    }
  }, []);

  const unread = (data?.viewer?.status?.unreadNoticeCount || 0) >= 1;
  const iconClass = classNames({ 'unread-icon': true, unread });

  return (
    <span className={iconClass}>
      {active ? (
        <Icon.NavNotificationActive size="md" color="green" />
      ) : (
        <Icon.NavNotification size="md" />
      )}

      <style jsx>{styles}</style>
    </span>
  );
};

export default NotificationUnreadIcon;
