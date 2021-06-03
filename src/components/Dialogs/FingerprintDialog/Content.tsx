import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Spinner, Translate } from '~/components'

import AricleSecret from './ArticleSecret'
import CopyButton from './CopyButton'
import styles from './styles.css'

import { Gateways } from './__generated__/Gateways'

const GATEWAYS = gql`
  query Gateways {
    official {
      gatewayUrls @client
    }
  }
`

const FingerprintDialogContent = ({
  dataHash,
  showSecret,
}: {
  dataHash: string
  showSecret: boolean
}) => {
  const { loading, data } = useQuery<Gateways>(GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  return (
    <section className="container">
      {/* hash */}
      <section className="hash">
        <header>
          <h4>
            <Translate id="articleFingerprint" />
          </h4>
          <CopyButton text={dataHash} />
        </header>

        <section>
          <input
            type="text"
            value={dataHash}
            readOnly
            onClick={(event) => event.currentTarget.select()}
          />
        </section>
      </section>

      {/* secret */}
      {showSecret && <AricleSecret />}

      {/* gateways */}
      <section className="gateways">
        <header>
          <h4>
            <Translate
              zh_hans="公共节点"
              zh_hant="公共節點"
              en="Public Gateways"
            />
          </h4>

          <span className="count">
            <span className="highlight">{gateways.length}</span>
            <Translate zh_hant=" 個節點" zh_hans=" 个节点" en=" gateways" />
          </span>
        </header>

        <ul>
          {(!data || loading) && <Spinner />}

          {gateways.map((url) => {
            const gatewayUrl = url.replace(':hash', dataHash)
            const hostname = url.replace(/(https:\/\/|\/ipfs\/|:hash.?)/g, '')

            return (
              <li key={url}>
                <a
                  href={gatewayUrl}
                  target="_blank"
                  className="gateway-url u-link-green"
                >
                  {hostname}
                </a>

                <CopyButton text={gatewayUrl} />
              </li>
            )
          })}
        </ul>
      </section>

      {/* help */}
      <section className="help">
        <header>
          <h4>
            <Translate
              zh_hans="这是什么？"
              zh_hant="這是什麼？"
              en="What Is This?"
            />
          </h4>
        </header>

        <p>
          <b>
            <Translate id="articleFingerprint" />
          </b>
          <Translate
            zh_hans={` 是一篇作品上载到 IPFS 后生成的独一无二的 ID，通过指纹可在 IPFS 不同节点调取作品内容。`}
            zh_hant={` 是一篇作品上載到 IPFS 後生成的獨一無二的 ID，通過指紋可在 IPFS 不同節點調取作品內容。`}
            en={` is the fingerpint of your work on IPFS, you can use it to retrive your work from any IPFS node.`}
          />
        </p>

        {showSecret && (
          <p>
            <b>
              <Translate id="secret" />
            </b>
            <Translate
              zh_hans={` 是非公开文章加密解密所使用的钥匙，只有掌握了密钥才能够解锁 IPFS 中的非公开文章。请妥善保管密钥，勿随意泄漏。`}
              zh_hant={` 是非公開文章加密解密所使用的鑰匙，只有掌握了密鑰才能夠解鎖 IPFS 中的非公開文章。請妥善保管密鑰，勿隨意洩漏。`}
              en={` is the encryption and decryption key for non-public articles, one can only unlock non-public articles on IPFS with it. Please keep the secret confidential and only share it with people you trust.`}
            />
          </p>
        )}

        <p>
          <b>
            <Translate
              zh_hant="公共節點"
              zh_hans="公共节点"
              en="Public Gateways"
            />
          </b>
          <Translate
            zh_hant=" 是志願提供 IPFS 網絡入口的節點，你可以使用任意公共節點地址對作品進行傳播。"
            zh_hans=" 是志愿提供 IPFS 网络入口的节点，你可以使用任意公共节点地址对作品进行传播。"
            en=" are volunteer nodes that provice access to IPFS, you can use them to share your work."
          />
        </p>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default FingerprintDialogContent
