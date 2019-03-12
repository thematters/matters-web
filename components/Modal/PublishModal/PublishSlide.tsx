import _get from 'lodash/get'
import { useContext, useState } from 'react'

import { Icon } from '~/components/Icon'
import { LanguageContext } from '~/components/Language'

import { translate } from '~/common/utils'
import ICON_ARROW_LEFT from '~/static/icons/arrow-left.svg?sprite'
import ICON_ARROW_RIGHT from '~/static/icons/arrow-right.svg?sprite'
import PUBLISH_SLIDE_1 from '~/static/images/publish-1.svg?url'
import PUBLISH_SLIDE_2 from '~/static/images/publish-2.svg?url'
import PUBLISH_SLIDE_3 from '~/static/images/publish-3.svg?url'
import PUBLISH_SLIDE_4 from '~/static/images/publish-4.svg?url'

import styles from './styles.css'

const dummy = [0, 1, 2, 3]

const Images = ({ src, slide, setSlide }: any) => {
  const disabledStyle = { cursor: 'initial', opacity: 0.2 }

  const changeSlide = (next: number) => {
    if (next < 0 || next > 3) {
      return false
    }
    setSlide(next)
  }

  return (
    <div className="image-container">
      <img className="image" src={src} />
      <button
        type="button"
        className="arrow left"
        style={slide === 0 ? disabledStyle : {}}
        onClick={() => changeSlide(slide - 1)}
      >
        <Icon id={ICON_ARROW_LEFT.id} viewBox={ICON_ARROW_LEFT.viewBox} />
      </button>
      <button
        type="button"
        className="arrow right"
        style={slide === 3 ? disabledStyle : {}}
        onClick={() => changeSlide(slide + 1)}
      >
        <Icon id={ICON_ARROW_RIGHT.id} viewBox={ICON_ARROW_RIGHT.viewBox} />
      </button>

      <style jsx>{styles}</style>
    </div>
  )
}

const Indicator = ({ slide, setSlide }: any) => (
  <div className="indicator">
    {dummy.map(item => (
      <button
        type="button"
        key={item}
        onClick={() => setSlide(item)}
        disabled={item === slide}
      />
    ))}
    <style jsx>{styles}</style>
  </div>
)

const Descriptions = ({ data }: any) => (
  <div className="descriptions">
    {data.map((desc: string, index: number) => (
      <div key={index} className="description">
        {desc}
      </div>
    ))}
    <style jsx>{styles}</style>
  </div>
)

const PublishSlide = () => {
  const { lang } = useContext(LanguageContext)
  const [slide, setSlide] = useState<number>(0)

  const images = [
    PUBLISH_SLIDE_1,
    PUBLISH_SLIDE_2,
    PUBLISH_SLIDE_3,
    PUBLISH_SLIDE_4
  ]

  const titles = [
    translate({
      zh_hant: '文章即將發佈到分佈式網絡',
      zh_hans: '文章即将发布到分布式网络',
      lang
    }),
    translate({
      zh_hant: '文章擁有唯一的數字指紋',
      zh_hans: '文章拥有唯一的数字指纹',
      lang
    }),
    translate({
      zh_hant: '文章將永久存儲在IPFS上',
      zh_hans: '文章将永久存储在IPFS上',
      lang
    }),
    translate({
      zh_hant: '發佈之後可從站內隱藏',
      zh_hans: '发布之后可从站内隐藏',
      lang
    })
  ]

  const descriptions = [
    translate({
      zh_hant:
        '文章將發佈並永久存儲在星際文件系統（IPFS）分佈式節點中。存儲費用目前由Matters平台支付。',
      zh_hans:
        '文章将发布并永久存储在星际文件系统（IPFS）分布式节点中。存储费用目前由Matters平台支付。',
      lang
    }),
    translate({
      zh_hant:
        '文章在發佈的 2 分鐘內可撤回並重新編輯。2 分鐘後文章內容（標題、內文、用戶名）將不可修改。',
      zh_hans:
        '文章在发布的 2 分钟内可撤回并重新编辑。2 分钟后文章内容（标题、内文、用户名）将不可修改。',
      lang
    }),
    translate({
      zh_hant: '文章發佈後，可從站內隱藏，但無法從分佈式節點刪除。',
      zh_hans: '文章发布后，可从站内隐藏，但无法从分布式节点删除。',
      lang
    }),
    translate({
      zh_hant: '文章評論及互動僅保存在站上，可編輯，可刪除。',
      zh_hans: '文章评论及互动仅保存在站上，可编辑，可删除。',
      lang
    })
  ]

  return (
    <>
      <div className="slide">
        <Images src={images[slide]} slide={slide} setSlide={setSlide} />

        <h3>{titles[slide]}</h3>

        <Indicator slide={slide} setSlide={setSlide} />
        <Descriptions data={descriptions} />
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

export default PublishSlide
