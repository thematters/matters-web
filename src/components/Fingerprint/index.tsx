import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'

import { Icon, Popover, Spinner, TextIcon, Translate } from '~/components'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { dom } from '~/common/utils'

import { FingerprintArticle } from './__generated__/FingerprintArticle'
import { Gateways } from './__generated__/Gateways'
import styles from './styles.css'

const GATEWAYS = gql`
  query Gateways {
    official {
      gatewayUrls @client
    }
  }
`

const FingerprintContent = ({ dataHash }: { dataHash: string }) => {
  const [gatewaysExpand, setGatewaysExpand] = useState(false)
  const [helpExpand, setHelpExpand] = useState(false)

  const { loading, data } = useQuery<Gateways>(GATEWAYS)
  const gateways = data?.official.gatewayUrls || []

  return (
    <div className="dropdown-container">
      <div className="top-container">
        {/* hash */}
        <section className="section-title">
          <h4>
            <Translate
              zh_hant={TEXT.zh_hant.articleFingerprint}
              zh_hans={TEXT.zh_hans.articleFingerprint}
            />
          </h4>
          <button
            type="button"
            onClick={() => {
              dom.copyToClipboard(dataHash)
              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'green',
                    content: (
                      <Translate
                        zh_hant={TEXT.zh_hant.copySuccess}
                        zh_hans={TEXT.zh_hans.copySuccess}
                      />
                    )
                  }
                })
              )
            }}
          >
            <TextIcon icon={<Icon.Copy />} color="green" weight="md" size="xs">
              <Translate
                zh_hant={TEXT.zh_hant.copy}
                zh_hans={TEXT.zh_hans.copy}
              />
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
              icon={<Icon.Expand size="xs" />}
              size="xs"
              weight="md"
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

        {loading && <Spinner />}

        <ul className="gateway-container">
          {gateways.slice(0, gatewaysExpand ? undefined : 2).map((url, i) => {
            const gatewayUrl = `${url}${dataHash}`
            return (
              <li key={i}>
                <Icon.ShareLink />

                <span className="gateway-url">{gatewayUrl}</span>

                <a href={gatewayUrl} target="_blank">
                  <Icon.ArrowRightGreenCircle />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      {/* help */}
      <div className={`help-container ${helpExpand ? 'expand' : ''}`}>
        <button type="button" onClick={() => setHelpExpand(!helpExpand)}>
          <TextIcon
            icon={<Icon.Help size="xs" />}
            weight="md"
            size="xs"
            color={helpExpand ? 'green' : 'grey'}
          >
            <Translate zh_hans="这是什么？" zh_hant="這是什麼？" />
          </TextIcon>
        </button>

        {helpExpand && (
          <p>
            <Translate
              zh_hans={`「指纹」是一篇作品上载到 IPFS 后生成的独一无二的 ID，通过指纹可在 IPFS 不同节点调取作品内容。\n\n「公共节点」是一篇作品在 IPFS 网络的存储地点，你可以使用任意公共节点地址对作品进行传播。`}
              zh_hant={`「指紋」是一篇作品上載到 IPFS 後生成的獨一無二的 ID，通過指紋可在 IPFS 不同節點調取作品內容。\n\n「公共節點」是一篇作品在 IPFS 網絡的存儲地點，你可以使用任意公共節點地址對作品進行傳播。`}
            />
          </p>
        )}
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

const Fingerprint = ({
  article,
  color = 'green',
  size = 'sm'
}: {
  article: FingerprintArticle
  color?: 'grey' | 'green'
  size?: 'xs' | 'sm'
}) => {
  return (
    <Popover
      offset="100,0"
      trigger="click"
      content={<FingerprintContent dataHash={article.dataHash || ''} />}
    >
      <button type="button">
        <TextIcon
          icon={<Icon.Box size={size === 'xs' ? 'xs' : undefined} />}
          size={size}
          color={color}
          weight="md"
        >
          <Translate zh_hans="分布式入口" zh_hant="分佈式入口" />
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
