import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Button,
  CopyToClipboard,
  IconCopy16,
  Spinner,
  Translate,
} from '~/components'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

import { Gateways } from './__generated__/Gateways'

const GATEWAYS = gql`
  query Gateways {
    official {
      gatewayUrls @client
    }
  }
`

const CopyButton = ({ text }: { text: string }) => {
  return (
    <CopyToClipboard text={text}>
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor="grey-lighter"
        aira-label={TEXT.zh_hant.copy}
      >
        <IconCopy16 color="grey" />
      </Button>
    </CopyToClipboard>
  )
}

const FingerprintDialogContent = ({ dataHash }: { dataHash: string }) => {
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

      {/* gateways */}
      <section className="gateways">
        <header>
          <h4>
            <Translate
              zh_hans="公共节点"
              zh_hant="公共節點"
              en="Public gateways"
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
              en="What is this?"
            />
          </h4>
        </header>

        <p>
          <b>
            <Translate
              zh_hant="作品指紋"
              zh_hans="作品指纹"
              en="Content hash"
            />
          </b>
          <Translate
            zh_hans={` 是一篇作品上载到 IPFS 后生成的独一无二的 ID，通过指纹可在 IPFS 不同节点调取作品内容。`}
            zh_hant={` 是一篇作品上載到 IPFS 後生成的獨一無二的 ID，通過指紋可在 IPFS 不同節點調取作品內容。`}
            en={` is the fingerpint of your work on IPFS, you can use it to retrive your work from any IPFS node.`}
          />
        </p>

        <p>
          <b>
            <Translate
              zh_hant="公共節點"
              zh_hans="公共节点"
              en="Public gateways"
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
