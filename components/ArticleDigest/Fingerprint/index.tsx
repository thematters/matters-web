import gql from 'graphql-tag'
import { useContext } from 'react'

import { GatewayContext } from '~/components/Contexts/Gateway'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Dropdown } from '~/components/Popper'
import { TextIcon } from '~/components/TextIcon'

import { dom } from '~/common/utils'
import ICON_CHECK_ACTIVE from '~/static/icons/checkbox-check-active.svg?sprite'
import ICON_COPY from '~/static/icons/copy.svg?sprite'

import { FingerprintArticle } from './__generated__/FingerprintArticle'
import styles from './styles.css'

const FingerprintContent = ({ dataHash }: { dataHash: string }) => {
  const { gateways } = useContext(GatewayContext)

  return (
    <div
      style={{ width: 340, paddingTop: 16, paddingLeft: 35, paddingRight: 24 }}
    >
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 16, fontWeight: 500 }}>
          <Translate zh_hans="文章指纹" zh_hant="文章指紋" />
        </span>
        <span className="copy" onClick={() => dom.copyToClipboard(dataHash)}>
          <TextIcon
            icon={
              <Icon
                id={ICON_COPY.id}
                viewBox={ICON_COPY.viewBox}
                size="small"
              />
            }
          >
            <Translate zh_hant="複製" zh_hans="复制" />
          </TextIcon>
        </span>
      </span>
      <span className="fingerprint-content">{dataHash}</span>
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        {gateways.map((url, i) => (
          <span
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
            key={i}
          >{`${url}${dataHash}`}</span>
        ))}
      </span>
      <style jsx>{styles}</style>
    </div>
  )
}

const Fingerprint = ({ article }: { article: FingerprintArticle }) => (
  <Dropdown content={<FingerprintContent dataHash={article.dataHash || ''} />}>
    <span className="fingerprint">
      <TextIcon
        icon={
          <Icon
            id={ICON_CHECK_ACTIVE.id}
            viewBox={ICON_CHECK_ACTIVE.viewBox}
            size="small"
          />
        }
      >
        <Translate zh_hans="已发布至IPFS" zh_hant="已發佈至IPFS" />
      </TextIcon>
      <style jsx>{styles}</style>
    </span>
  </Dropdown>
)

Fingerprint.fragments = {
  article: gql`
    fragment FingerprintArticle on Article {
      id
      dataHash
    }
  `
}

export { Fingerprint }
