import { useApolloClient } from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

import { Translate, useRoute } from '~/components'

import { QUERY_SECRET } from './ArticleSecret'
import styles from './styles.css'

import { ArticleSecret } from './__generated__/ArticleSecret'

const ArticleSecretDesc = () => {
  const client = useApolloClient()
  const { getQuery } = useRoute()
  const mediaHash = getQuery('mediaHash')

  const [secret, setSecret] = useState<string | null>()

  useEffect(() => {
    const watcher = client.watchQuery<ArticleSecret>({
      query: QUERY_SECRET,
      variables: { mediaHash },
      fetchPolicy: 'network-only',
    })

    watcher.subscribe({
      next: (result) => {
        const key = result?.data?.article?.access.secret
        setSecret(key)
      },
      error: (e) => {
        console.error(e)
      },
    })
  }, [])

  if (!secret) {
    return null
  }

  return (
    <p>
      <b>
        <Translate id="secret" />
      </b>
      <Translate
        zh_hans={` 是非公开文章加密解密所使用的钥匙，只有掌握了密钥才能够解锁 IPFS 中的非公开文章。请妥善保管密钥，勿随意泄漏。`}
        zh_hant={` 是非公開文章加密解密所使用的鑰匙，只有掌握了密鑰才能夠解鎖 IPFS 中的非公開文章。請妥善保管密鑰，勿隨意洩漏。`}
        en={` is the encryption and decryption key for non-public articles, one can only unlock non-public articles on IPFS with it. Please keep the secret confidential and only share it with people you trust.`}
      />
      <style jsx>{styles}</style>
    </p>
  )
}

export default ArticleSecretDesc
