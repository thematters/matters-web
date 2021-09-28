import {
  UnsupportedChainIdError,
  useWeb3React,
  Web3ReactProvider,
} from '@web3-react/core'
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { useEffect, useState } from 'react'
import Web3 from 'web3'

import { Button, Head, IconSpinner16, Layout } from '~/components'

import { randomString } from '~/common/utils'

import contract from './contract'
import styles from './styles.css'

const RPC_URLS: { [chainId: number]: string } = {
  // 1: process.env.RPC_URL_1 as string,
  4: process.env.RPC_URL_4 as string,
}

enum Connector {
  MetaMask = 'MetaMask',
  WalletConnect = 'WalletConnect',
}

const connectors = {
  [Connector.MetaMask]: new InjectedConnector({ supportedChainIds: [4] }),
  [Connector.WalletConnect]: new WalletConnectConnector({
    rpc: { 4: RPC_URLS[4] },
    qrcode: true,
  }),
}

function getLibrary(provider?: any) {
  return new Web3(provider)
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const WalletConnection = () => {
  const { activate, deactivate, chainId, account, library, error, connector } =
    useWeb3React<Web3>()

  const [activating, setActivating] = useState(false)
  useEffect(() => {
    if (connector) {
      setActivating(false)
    }
  }, [connector])

  const [balance, setBalance] = useState<null | string>(null)
  const getAccountBalance = async () => {
    if (!library || !account) {
      return
    }

    const accountBalance = await library.eth.getBalance(account)
    setBalance(accountBalance)
  }
  useEffect(() => {
    getAccountBalance()
  }, [account, library])

  const [signMsg, setSignMsg] = useState('')
  const [signature, setSignature] = useState('')
  const signMessage = async () => {
    if (!library || !account) {
      return
    }

    const nonce = library.utils.keccak256(randomString())
    setSignMsg(nonce)

    const sig = await library.eth.personal.sign(nonce, account, '')
    setSignature(sig)
  }

  const [verifiedAddress, setVerifiedAddress] = useState('')
  const verifySignature = async () => {
    if (!library || !account || !signature) {
      return
    }

    const address = await library.eth.personal.ecRecover(signMsg, signature)
    setVerifiedAddress(address)
  }

  const transferETH = async () => {
    if (!library || !account) {
      return
    }

    await library.eth.sendTransaction({
      from: account,
      gas: '21000',
      to: '0x0000000000000000000000000000000000000000', // black hole
      value: library.utils.toWei('0.01', 'ether'),
    })
  }

  const depositWETH = async () => {
    if (!library || !account) {
      return
    }

    const wETHContract = new library.eth.Contract(
      contract.abi,
      contract.address
    )

    const estimateGas = await wETHContract.methods.deposit().estimateGas({
      from: account,
      value: library.utils.toWei('0.01', 'ether'),
    })
    const maxGas = (estimateGas * 3) / 2

    await wETHContract.methods.deposit().send({
      from: account,
      gas: maxGas,
      value: library.utils.toWei('0.01', 'ether'),
    })
  }

  // clear states
  useEffect(() => {
    setSignature('')
    setBalance(null)
    setVerifiedAddress('')
  }, [account, library])

  return (
    <section className="container">
      <section className="message">
        {error && <p className="error">{getErrorMessage(error)}</p>}
      </section>

      <section className="info">
        <table>
          <tr>
            <td>
              <b>Chain ID: </b>
            </td>
            <td>{chainId}</td>
          </tr>
          <tr>
            <td>
              <b>Address: </b>
            </td>
            <td>{account}</td>
          </tr>
          <tr>
            <td>
              <b>Balance: </b>
            </td>
            <td>{balance ? library?.utils.fromWei(balance) + ' ETH' : null}</td>
          </tr>
          <tr>
            <td>
              <b>Signature: </b>
            </td>
            <td>{signature}</td>
          </tr>
          <tr>
            <td>
              <b>Verified Address: </b>
            </td>
            <td>{verifiedAddress}</td>
          </tr>
        </table>
      </section>

      <section className="connect">
        {account && (
          <Button
            spacing={['xtight', 'base']}
            bgColor="red"
            textColor="white"
            onClick={() => {
              deactivate()
            }}
          >
            <span>Disconnect Wallet</span>
          </Button>
        )}

        {!account &&
          (activating ? (
            <Button
              spacing={['xtight', 'base']}
              textColor="white"
              bgColor="green"
              disabled={activating}
            >
              <IconSpinner16 color="grey-light" size="sm" />
            </Button>
          ) : (
            <>
              <Button
                spacing={['xtight', 'base']}
                textColor="white"
                bgColor="green"
                onClick={() => {
                  setActivating(true)
                  activate(connectors[Connector.MetaMask])
                }}
                disabled={activating}
              >
                <span>MetaMask</span>
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                spacing={['xtight', 'base']}
                bgColor="green"
                textColor="white"
                onClick={() => {
                  setActivating(true)
                  activate(connectors[Connector.WalletConnect])
                }}
                disabled={activating}
              >
                <span>WalletConnect</span>
              </Button>
            </>
          ))}
      </section>

      {account && (
        <section className="actions">
          {!signature && (
            <Button
              spacing={['xtight', 'base']}
              textColor="white"
              bgColor="green"
              onClick={() => {
                signMessage()
              }}
            >
              <span>Sign Message</span>
            </Button>
          )}
          {signature && (
            <Button
              spacing={['xtight', 'base']}
              textColor="white"
              bgColor="green"
              onClick={() => {
                verifySignature()
              }}
            >
              <span>Verify Signature</span>
            </Button>
          )}
          &nbsp;&nbsp;&nbsp;
          <br />
          <br />
          <Button
            spacing={['xtight', 'base']}
            textColor="white"
            bgColor="green"
            onClick={() => {
              transferETH()
            }}
          >
            <span>Transfer 0.01 ETH</span>
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            spacing={['xtight', 'base']}
            textColor="white"
            bgColor="green"
            onClick={() => {
              depositWETH()
            }}
          >
            <span>Deposit 0.01 wETH</span>
          </Button>
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

const NFT = () => (
  <Layout.Main bgColor="grey-lighter">
    <Head
      title={{ zh_hant: 'NFT Landing Page', zh_hans: 'NFT Landing Page' }}
    />

    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletConnection />
    </Web3ReactProvider>
  </Layout.Main>
)

export default NFT
