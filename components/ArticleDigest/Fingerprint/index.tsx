import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { GatewayContext } from '~/components/Contexts/Gateway'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Dropdown } from '~/components/Popper'
import { TextIcon } from '~/components/TextIcon'

import { dom } from '~/common/utils'
import ICON_ARROW_CIRCLE from '~/static/icons/arrow-right-green-circle.svg?sprite'
import ICON_CHECK_ACTIVE from '~/static/icons/checkbox-check-active.svg?sprite'
import ICON_COPY from '~/static/icons/copy.svg?sprite'
import ICON_EXPAND from '~/static/icons/expand.svg?sprite'
import ICON_HELP from '~/static/icons/help.svg?sprite'
import ICON_SHARE_LINK from '~/static/icons/share-link.svg?sprite'

import { FingerprintArticle } from './__generated__/FingerprintArticle'
import styles from './styles.css'

const FingerprintContent = ({ dataHash }: { dataHash: string }) => {
  const { gateways } = useContext(GatewayContext)

  const [expand, setExpand] = useState(false)
  const [explanation, setExplation] = useState(false)

  return (
    <div className="dropdown-container">
      <div className="top-container">
        <span className="section-title">
          <span className="title-content">
            <Translate zh_hans="文章指纹" zh_hant="文章指紋" />
          </span>
          <button
            className="copy"
            onClick={() => dom.copyToClipboard(dataHash)}
          >
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
          </button>
        </span>
        <span className="fingerprint-content">{dataHash}</span>
        <span className="section-title">
          <span className="title-content">
            <Translate zh_hans="通过公共节点查看" zh_hant="通過公共節點查看" />
          </span>
          <button
            className="support-text"
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <TextIcon
              icon={
                <Icon
                  id={ICON_EXPAND.id}
                  viewBox={ICON_EXPAND.viewBox}
                  size="xsmall"
                />
              }
              textPlacement="left"
            >
              <Translate
                zh_hant={expand ? '收起全部' : '展開全部'}
                zh_hans={expand ? '收起全部' : '展开全部'}
              />
            </TextIcon>
          </button>
        </span>
        <div className="gateway-container">
          {gateways.slice(0, expand ? undefined : 2).map((url, i) => {
            const gatewayUrl = `${url}${dataHash}`
            return (
              <span className="gateway" key={i}>
                <button onClick={() => dom.copyToClipboard(gatewayUrl)}>
                  <Icon
                    id={ICON_SHARE_LINK.id}
                    viewBox={ICON_SHARE_LINK.viewBox}
                    size="xsmall"
                  />
                </button>
                <span className="gateway-url">{gatewayUrl}</span>
                <button onClick={() => window.open(gatewayUrl, '_blank')}>
                  <Icon
                    id={ICON_ARROW_CIRCLE.id}
                    viewBox={ICON_ARROW_CIRCLE.viewBox}
                    size="small"
                  />
                </button>
              </span>
            )
          })}
        </div>
      </div>
      <div className="explanation-container">
        <span
          className="explanation-title"
          onClick={() => setExplation(!explanation)}
        >
          <TextIcon
            icon={
              <Icon
                id={ICON_HELP.id}
                viewBox={ICON_HELP.viewBox}
                size="small"
              />
            }
          >
            <Translate zh_hans="这是什么？" zh_hant="這是什麼？" />
          </TextIcon>
        </span>
        {explanation && (
          <div className="explanation-content">
            <Translate
              zh_hans={`「指纹」是一篇文章上载到 IPFS 后生成的独一无二的 ID，通过指纹可在 IPFS 不同节点调取文章内容。\n\n「公共节点」是一篇文章在 IPFS 网络的存储地点，你可以使用任意公共节点地址对文章进行传播。`}
              zh_hant={`「指紋」是一篇文章上載到 IPFS 後生成的獨一無二的 ID，通過指紋可在 IPFS 不同節點調取文章內容。\n\n「公共節點」是一篇文章在 IPFS 網絡的存儲地點，你可以使用任意公共節點地址對文章進行傳播。`}
            />
          </div>
        )}
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

const Fingerprint = ({ article }: { article: FingerprintArticle }) => (
  <Dropdown
    zIndex={101}
    content={<FingerprintContent dataHash={article.dataHash || ''} />}
  >
    <span className="fingerprint-icon">
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
