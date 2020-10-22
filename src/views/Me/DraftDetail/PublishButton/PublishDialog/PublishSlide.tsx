import { useContext } from 'react'

import { LanguageContext } from '~/components'

import { translate } from '~/common/utils'

import PUBLISH_IMAGE from '@/public/static/images/publish-1.svg'

import styles from './styles.css'

const Descriptions = ({ data }: any) => (
  <div className="descriptions">
    {data.map((desc: string, index: number) => (
      <div key={index} className="description" data-content="•">
        {desc}
      </div>
    ))}

    <style jsx>{styles}</style>
  </div>
)

const PublishSlide = () => {
  const { lang } = useContext(LanguageContext)

  const title = translate({
    zh_hant: '歡迎上船！',
    zh_hans: '欢迎上船！',
    lang,
  })

  const subTitle = translate({
    zh_hant:
      '你的作品即將永久存儲在星際文件系統（IPFS）分佈式節點中。在 IPFS 的存儲費用目前由 Matters 平台支付。',
    zh_hans:
      '你的作品即将永久存储在星际文件系统（IPFS）分布式节点中。在 IPFS 的存储费用目前由 Matters 平台支付。',
    lang,
  })

  const descriptions = [
    translate({
      zh_hant: '作品將發布至 IPFS，無法被隨意刪改，創作權歸你所有。',
      zh_hans: '作品将发布至 IPFS，无法被随意删改，创作权归你所有。',
      lang,
    }),
    translate({
      zh_hant: '指紋與節點隨之公開可見，皆可用於分享作品。',
      zh_hans: '指纹与节点随之公开可见，皆可用于分享作品。',
      lang,
    }),
    translate({
      zh_hant:
        '如需修訂你的作品，請將該作品從站上隱藏，並將修訂後的作品重新發布，隱藏後的作品僅作者本人可見。',
      zh_hans:
        '如需修订你的作品，请将该作品从站上隐藏，并将修订后的作品重新发布，隐藏后的作品仅作者本人可见。',
      lang,
    }),
  ]

  return (
    <>
      <div className="slide">
        <div className="image-container">
          <div
            className="image"
            style={{ backgroundImage: `url(${PUBLISH_IMAGE})` }}
          />
        </div>

        <div className="title-container">
          <h3>{title}</h3>
          <span className="subTitle">{subTitle}</span>
        </div>

        <Descriptions data={descriptions} />
      </div>

      <style jsx>{styles}</style>
    </>
  )
}

export default PublishSlide
