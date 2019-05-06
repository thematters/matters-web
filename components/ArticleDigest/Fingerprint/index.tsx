import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import { GatewayContext } from '~/components/Contexts/Gateway'
import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Popover } from '~/components/Popper'
import { TextIcon } from '~/components/TextIcon'

import { ADD_TOAST } from '~/common/enums'
import { dom } from '~/common/utils'
import ICON_ARROW_CIRCLE from '~/static/icons/arrow-right-green-circle.svg?sprite'
import ICON_CHECK_ACTIVE from '~/static/icons/checkbox-check-active.svg?sprite'
import ICON_COPY from '~/static/icons/copy.svg?sprite'
import ICON_EXPAND from '~/static/icons/expand.svg?sprite'
import ICON_HELP from '~/static/icons/help.svg?sprite'
import ICON_SHARE_LINK from '~/static/icons/share-link.svg?sprite'

import { FingerprintArticle } from './__generated__/FingerprintArticle'
import styles from './styles.css'

const FingerprintContent = ({
  dataHash,
  gateways
}: {
  dataHash: string
  gateways: string[]
}) => {
  const [gatewaysExpand, setGatewaysExpand] = useState(false)
  const [helpExpand, setHelpExpand] = useState(false)

  return (
    <div className="dropdown-container">
      <div className="top-container">
        {/* hash */}
        <section className="section-title">
          <h4>
            <Translate zh_hans="文章指纹" zh_hant="文章指紋" />
          </h4>
          <button
            type="button"
            onClick={() => {
              dom.copyToClipboard(dataHash)
              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'green',
                    content: <Translate zh_hant="複製成功" zh_hans="复制成功" />
                  }
                })
              )
            }}
          >
            <TextIcon
              icon={
                <Icon
                  id={ICON_COPY.id}
                  viewBox={ICON_COPY.viewBox}
                  size="small"
                />
              }
              color="green"
              weight="medium"
              size="xs"
            >
              <Translate zh_hant="複製" zh_hans="复制" />
            </TextIcon>
          </button>
        </section>

        <input
          className="fingerprint-content"
          type="text"
          value={dataHash}
          readOnly
          onClick={event => event.currentTarget.select()}
        />

        {/* gateways */}
        <section className="section-title">
          <h4>
            <Translate zh_hans="通过公共节点查看" zh_hant="通過公共節點查看" />
          </h4>

          <button
            onClick={() => {
              setGatewaysExpand(!gatewaysExpand)
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
              size="xs"
              weight="medium"
              color="grey"
              textPlacement="left"
            >
              <Translate
                zh_hant={gatewaysExpand ? '收起全部' : '展開全部'}
                zh_hans={gatewaysExpand ? '收起全部' : '展开全部'}
              />
            </TextIcon>
          </button>
        </section>

        <ul className="gateway-container">
          {gateways.slice(0, gatewaysExpand ? undefined : 2).map((url, i) => {
            const gatewayUrl = `${url}${dataHash}`
            return (
              <li key={i}>
                <Icon
                  id={ICON_SHARE_LINK.id}
                  viewBox={ICON_SHARE_LINK.viewBox}
                  size="small"
                />

                <span className="gateway-url">{gatewayUrl}</span>

                <a href={gatewayUrl} target="_blank">
                  <Icon
                    id={ICON_ARROW_CIRCLE.id}
                    viewBox={ICON_ARROW_CIRCLE.viewBox}
                    size="small"
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={`help-container ${helpExpand ? 'expand' : ''}`}>
        <button type="button" onClick={() => setHelpExpand(!helpExpand)}>
          <TextIcon
            icon={
              <Icon
                id={ICON_HELP.id}
                viewBox={ICON_HELP.viewBox}
                size="xsmall"
              />
            }
            weight="medium"
            size="xs"
            color={helpExpand ? 'green' : 'grey'}
          >
            <Translate zh_hans="这是什么？" zh_hant="這是什麼？" />
          </TextIcon>
        </button>

        {helpExpand && (
          <p>
            <Translate
              zh_hans={`「指纹」是一篇文章上载到 IPFS 后生成的独一无二的 ID，通过指纹可在 IPFS 不同节点调取文章内容。\n\n「公共节点」是一篇文章在 IPFS 网络的存储地点，你可以使用任意公共节点地址对文章进行传播。`}
              zh_hant={`「指紋」是一篇文章上載到 IPFS 後生成的獨一無二的 ID，通過指紋可在 IPFS 不同節點調取文章內容。\n\n「公共節點」是一篇文章在 IPFS 網絡的存儲地點，你可以使用任意公共節點地址對文章進行傳播。`}
            />
          </p>
        )}
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

const Fingerprint = ({ article }: { article: FingerprintArticle }) => {
  const { startCheck, gateways } = useContext(GatewayContext)

  return (
    <Popover
      onShow={() => {
        if (gateways.length === 0) {
          startCheck()
        }
      }}
      offset="100,0"
      trigger="click"
      content={
        <FingerprintContent
          gateways={gateways}
          dataHash={article.dataHash || ''}
        />
      }
    >
      <button type="button">
        <TextIcon
          icon={
            <Icon
              id={ICON_CHECK_ACTIVE.id}
              viewBox={ICON_CHECK_ACTIVE.viewBox}
              size="small"
            />
          }
          size="sm"
          color="green"
          weight="medium"
        >
          <Translate zh_hans="已发布至IPFS" zh_hant="已發佈至IPFS" />
        </TextIcon>
        <style jsx>{styles}</style>
      </button>
    </Popover>
  )
}

Fingerprint.fragments = {
  article: gql`
    fragment FingerprintArticle on Article {
      id
      dataHash
    }
  `
}

export { Fingerprint }
