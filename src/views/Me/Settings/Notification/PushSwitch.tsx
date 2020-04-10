import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';

import { Translate } from '~/components';
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference';

import { subscribePush, unsubscribePush } from '~/common/utils';

import SettingItem from './SettingItem';

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference';

const PushSwitch = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  });
  const push = data?.clientPreference.push;

  if (!push || !push.supported) {
    return null;
  }

  const onClick = async () => {
    setLoading(true);
    if (push.enabled) {
      await unsubscribePush();
    } else {
      await subscribePush();
    }
    setLoading(false);
  };

  return (
    <SettingItem
      enabled={push.enabled}
      loading={loading}
      title={<Translate zh_hant="推送通知" zh_hans="推送通知" />}
      description={
        <Translate
          zh_hant="實時收到你關心的站內動態"
          zh_hans="实时收到你关心的站内动态"
        />
      }
      onChange={onClick}
    />
  );
};

export default PushSwitch;
