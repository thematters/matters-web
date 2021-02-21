import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { getQuery } from '~/common/utils'

import PUBLISH_IMAGE from '@/public/static/images/publish-1.svg'

import styles from './styles.css'

import { PublishArticle } from './__generated__/PublishArticle'

interface PublishContentProps {
  closeDialog: () => void
}

const PUBLISH_ARTICLE = gql`
  mutation PublishArticle($id: ID!) {
    publishArticle(input: { id: $id }) {
      id
      publishState
    }
  }
`

const PublishContent: React.FC<PublishContentProps> = ({ closeDialog }) => {
  const router = useRouter()
  const id = getQuery({ router, key: 'draftId' })
  const [publish] = useMutation<PublishArticle>(PUBLISH_ARTICLE)

  const onPublish = async () => {
    publish({ variables: { id } })
    closeDialog()
  }

  const SubmitButton = (
    <Dialog.Header.RightButton
      text={<Translate id="publish" />}
      onClick={onPublish}
    />
  )

  return (
    <>
      <Dialog.Header
        title="publish"
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Message align="left" type="info">
        <section className="image-container">
          <div
            className="image"
            style={{ backgroundImage: `url(${PUBLISH_IMAGE})` }}
          />
        </section>

        <h2>
          <Translate
            zh_hant="歡迎上船！"
            zh_hans="欢迎上船！"
            en="Welcome onboard!"
          />
        </h2>
        <p>
          <Translate
            zh_hant="你的作品即將永久存儲在星際文件系統（IPFS）分佈式節點中。在 IPFS 的存儲費用目前由 Matters 平台支付。"
            zh_hans="你的作品即将永久存储在星际文件系统（IPFS）分布式节点中。在 IPFS 的存储费用目前由 Matters 平台支付。"
            en="Your work will be permanently stored in IPFS network. Currently the fee is covered by Matters."
          />
        </p>
        <ul>
          <li>
            <Translate
              zh_hant="作品將發布至 IPFS，無法被他人刪改，創作權歸你所有。"
              zh_hans="作品将发布至 IPFS，无法被他人删改，创作权归你所有。"
              en="Article will be published to IPFS, others can not tamper with it, and you own the copyright."
            />
          </li>
          <li>
            <Translate
              zh_hant="指紋與節點隨之公開可見，皆可用於分享作品。"
              zh_hans="指纹与节点随之公开可见，皆可用于分享作品。"
              en="Content hash and gateway addresses will be public, and can be used for sharing."
            />
          </li>
          <li>
            <Translate
              zh_hant="首次發布作品後有兩次正文修訂機會，你也可以隱藏原文重新發布作品。"
              zh_hans="首次发布作品后有两次正文修订机会，你也可以隐藏原文重新发布作品。"
              en="You have 2 resions after publishing, and you can archive and publish a new version."
            />
          </li>
        </ul>

        <style jsx>{styles}</style>
      </Dialog.Message>
    </>
  )
}

export default PublishContent
