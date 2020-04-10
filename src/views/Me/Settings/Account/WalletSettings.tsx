import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useContext } from 'react';

import {
  Button,
  Icon,
  LikeCoinDialog,
  PageHeader,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components';

import styles from './styles.css';

import { ViewerLikeInfo } from './__generated__/ViewerLikeInfo';

const VIEWER_LIKE_INFO = gql`
  query ViewerLikeInfo {
    viewer {
      id
      status {
        LIKE {
          total
          rateUSD
        }
      }
    }
  }
`;

const SetupLikerIdButton = () => {
  return (
    <LikeCoinDialog defaultStep="setup">
      {({ open }) => (
        <Button className="u-link-green" onClick={open}>
          <TextIcon>
            <Translate id="setup" />
          </TextIcon>
        </Button>
      )}
    </LikeCoinDialog>
  );
};

const WalletSetting = () => {
  const viewer = useContext(ViewerContext);
  const likerId = viewer.liker.likerId;
  const { data, loading, error } = useQuery<ViewerLikeInfo>(VIEWER_LIKE_INFO, {
    errorPolicy: 'none',
  });
  const LIKE = data?.viewer?.status && data.viewer.status.LIKE;

  if (loading || error || !LIKE) {
    return null;
  }

  const USDPrice = (LIKE.rateUSD * LIKE.total).toFixed(2);

  return (
    <section className="setting-section">
      <div className="left">
        <span className="title">
          <Translate zh_hant="我的創作價值" zh_hans="我的创作价值" />
        </span>

        {likerId && (
          <span>
            {LIKE.total} LikeCoin
            {USDPrice && (
              <span className="usd-price">
                {' '}
                {LIKE.total > 0 ? '≈' : '='} {USDPrice} USD
              </span>
            )}
          </span>
        )}
        {!likerId && (
          <span className="hint">
            <Translate
              zh_hant="完成設置 Liker ID 後即可管理創作收益"
              zh_hans="完成设置 Liker ID 后即可管理创作收益"
            />
          </span>
        )}
      </div>

      {likerId && (
        <a href="https://like.co/in" className="u-link-green" target="_blank">
          <TextIcon
            icon={<Icon.Right size="xs" />}
            textPlacement="left"
            weight="md"
          >
            <Translate zh_hant="去 like.co 查看" zh_hans="去 like.co 查看" />
          </TextIcon>
        </a>
      )}

      <style jsx>{styles}</style>
    </section>
  );
};

const WalletSettings = () => {
  const viewer = useContext(ViewerContext);
  const likerId = viewer.liker.likerId;

  return (
    <section className="section-container">
      <PageHeader title={<Translate id="walletSetting" />} is="h2" />

      <section className="setting-section">
        <div className="left">
          <span className="title">Liker ID</span>
          {likerId && <span>{likerId}</span>}
          {!likerId && <SetupLikerIdButton />}
        </div>
      </section>

      <WalletSetting />

      <style jsx>{styles}</style>
    </section>
  );
};

export default WalletSettings;
