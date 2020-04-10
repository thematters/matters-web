import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';

import { Dialog, Translate } from '~/components';
import CLIENT_INFO from '~/components/GQL/queries/clientInfo';

import { ANALYTICS_EVENTS, SHARE_TYPE } from '~/common/enums';
import { analytics } from '~/common/utils';

import Copy from './Copy';
import Douban from './Douban';
import Email from './Email';
import Facebook from './Facebook';
import LINE from './LINE';
import styles from './styles.css';
import Telegram from './Telegram';
import Twitter from './Twitter';
import Weibo from './Weibo';
import WhatsApp from './WhatsApp';

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo';

export interface ShareDialogProps {
  title?: string;
  path?: string;
  children: ({ open }: { open: () => void }) => React.ReactNode;
}

export const ShareDialog = ({ title, path, children }: ShareDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const { data } = useQuery<ClientInfo>(CLIENT_INFO, {
    variables: { id: 'local' },
  });
  const isMobile = data?.clientInfo.isMobile;
  const shareLink = process.browser
    ? path
      ? `${window.location.origin}${path}`
      : window.location.href
    : '';
  const shareTitle =
    title || (process.browser ? window.document.title || '' : '');

  const onShare = async () => {
    const navigator = window.navigator as any;

    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareLink,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      open();
    }

    analytics.trackEvent(ANALYTICS_EVENTS, {
      type: SHARE_TYPE.ROOT,
      url: shareLink,
    });
  };

  return (
    <>
      {children({ open: onShare })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close}>
        <Dialog.Header title="share" close={close} headerHidden />

        <Dialog.Content spacing={[0, 0]}>
          <section className="socials-container">
            <section className="left">
              <LINE title={shareTitle} link={shareLink} />
              <WhatsApp title={shareTitle} link={shareLink} />
              <Telegram title={shareTitle} link={shareLink} />
              <Douban title={shareTitle} link={shareLink} />
            </section>

            <section className="right">
              <Twitter title={shareTitle} link={shareLink} />
              <Facebook title={shareTitle} link={shareLink} />
              <Weibo title={shareTitle} link={shareLink} />
              <Email title={shareTitle} link={shareLink} />
            </section>

            <style jsx>{styles}</style>
          </section>

          <Copy link={shareLink} />
        </Dialog.Content>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
