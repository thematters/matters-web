import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'

import { Button, Dialog, Icon, Spinner, Translate } from '~/components'

import { ADD_TOAST } from '~/common/enums'
import { dom } from '~/common/utils'

import styles from './styles.css'

import { Gateways } from './__generated__/Gateways'

interface FingerprintDialogProps {
  dataHash: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const GATEWAYS = gql`
  query Gateways {
    official {
      gatewayUrls @client
    }
  }
`

const CopyButton = ({ text }: { text: string }) => {
  const copy = (link: string) => {
    const copied = dom.copyToClipboard(link)

    if (!copied) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate id="failureCopy" />
          }
        })
      )
      return
    }

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate id="successCopy" />
        }
      })
    )
  }

  return (
    <Button
      spacing={['xtight', 'xtight']}
      bgHoverColor="grey-lighter"
      onClick={() => copy(text)}
      aira-label="複製"
    >
      <Icon.Link color="grey" />
    </Button>
  )
}

const FingerprintDialogContent = ({ dataHash }: { dataHash: string }) => {
  const [loadGateways, { loading, data }] = useLazyQuery<Gateways>(GATEWAYS)

  const gateways = data?.official.gatewayUrls || []

  // FIXME: lazy load to fix wrong behavior of react-spring on Safari
  useEffect(() => {
    setTimeout(() => {
      loadGateways()
    }, 1000)
  }, [])

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
            onClick={event => event.currentTarget.select()}
          />
        </section>
      </section>

      {/* gateways */}
      <section className="gateways">
        <header>
          <h4>
            <Translate zh_hans="公共节点" zh_hant="公共節點" />
          </h4>

          <span className="count">
            <span className="highlight">{gateways.length}</span>
            <Translate zh_hant=" 個節點" zh_hans=" 个节点" />
          </span>
        </header>

        <ul>
          {(!data || loading) && <Spinner />}

          {gateways.map((url, i) => {
            const gatewayUrl = `${url}${dataHash}`
            const hostname = url.replace(/(https:\/\/|\/ipfs\/)/g, '')

            return (
              <li key={i}>
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
            <Translate zh_hans="这是什么？" zh_hant="這是什麼？" />
          </h4>
        </header>

        <p>
          <b>
            <Translate zh_hant="作品指紋" zh_hans="作品指纹" />
          </b>
          <Translate
            zh_hans={` 是一篇作品上载到 IPFS 后生成的独一无二的 ID，通过指纹可在 IPFS 不同节点调取作品内容。`}
            zh_hant={` 是一篇作品上載到 IPFS 後生成的獨一無二的 ID，通過指紋可在 IPFS 不同節點調取作品內容。`}
          />
        </p>

        <p>
          <b>
            <Translate zh_hant="公共節點" zh_hans="公共节点" />
          </b>
          <Translate
            zh_hant=" 是一篇作品在 IPFS 網絡的存儲地點，你可以使用任意公共節點地址對作品進行傳播。"
            zh_hans=" 是一篇作品在 IPFS 网络的存储地点，你可以使用任意公共节点地址对作品进行传播。"
          />
        </p>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

const FingerprintDialog = ({
  children,
  ...restProps
}: FingerprintDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header title={<Translate id="IPFSEntrance" />} close={close} />

        <Dialog.Content spacing={[0, 0]} hasGrow>
          <FingerprintDialogContent {...restProps} />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export default FingerprintDialog
