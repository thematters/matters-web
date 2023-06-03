import IMAGE_AUTH_SOURCE_APPRECIATION from '@/public/static/images/auth-source/appreciation.png'
import IMAGE_AUTH_SOURCE_BOOKMARK from '@/public/static/images/auth-source/bookmark.png'
import IMAGE_AUTH_SOURCE_CIRCLE from '@/public/static/images/auth-source/circle.png'
import IMAGE_AUTH_SOURCE_COLLECT from '@/public/static/images/auth-source/collect.png'
import IMAGE_AUTH_SOURCE_COMMENT from '@/public/static/images/auth-source/comment.png'
import IMAGE_AUTH_SOURCE_CREATE from '@/public/static/images/auth-source/create.png'
import IMAGE_AUTH_SOURCE_ENTER from '@/public/static/images/auth-source/enter.png'
import IMAGE_AUTH_SOURCE_FOLLOW from '@/public/static/images/auth-source/follow.png'
import IMAGE_AUTH_SOURCE_SUPPORT from '@/public/static/images/auth-source/support.png'
import { UNIVERSAL_AUTH_SOURCE } from '~/common/enums'
import { TextIcon, Translate } from '~/components'

import styles from './styles.module.css'

const AUTH_SOURCE_IMG = {
  [UNIVERSAL_AUTH_SOURCE.enter]: {
    image: IMAGE_AUTH_SOURCE_ENTER.src,
    title: () => <Translate zh_hant="進入" zh_hans="进入" en="Enter" />,
    intro: () => (
      <Translate
        zh_hant="現在就加入馬特市並開始創作"
        zh_hans="现在就加入马特市并开始创作"
        en="Join Matters and start creating."
      />
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.appreciation]: {
    image: IMAGE_AUTH_SOURCE_APPRECIATION.src,
    title: () => (
      <Translate zh_hant="讚賞作品" zh_hans="赞赏作品" en="Like the Work" />
    ),
    intro: () => (
      <>
        <Translate
          zh_hant="為你喜歡的文章拍手，讚賞將為創作者帶來收入"
          zh_hans="为你喜欢的文章拍手，赞赏将为创作者带来收入"
          en="Clap for the article."
        />
        <br />
        <Translate
          zh_hant=""
          zh_hans=""
          en="Turn your likes into actual income."
        />
      </>
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.bookmark]: {
    image: IMAGE_AUTH_SOURCE_BOOKMARK.src,
    title: () => (
      <Translate
        zh_hant="收藏精彩作品"
        zh_hans="收藏精彩作品"
        en="Add to Bookmark"
      />
    ),
    intro: () => (
      <>
        <Translate
          zh_hant="你的個人收藏夾，隨時回顧你喜愛的作品"
          zh_hans="你的个人收藏夹，随时回顾你喜爱的作品"
          en="Bookmark is your personal bookshelf."
        />
        <br />
        <Translate
          zh_hant=""
          zh_hans=""
          en="Come back to the articles whenever you like."
        />
      </>
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.circle]: {
    image: IMAGE_AUTH_SOURCE_CIRCLE.src,
    title: () => (
      <Translate
        zh_hant="訂閱圍爐"
        zh_hans="订阅围炉"
        en="Subscribe to the Circle"
      />
    ),
    intro: () => (
      <Translate
        zh_hant="每月自動支持創作者，讀者可享有專屬內容"
        zh_hans="每月自动支持创作者，读者可享有专属内容"
        en="Support the author monthly, and enjoy exclusive contents in the Circle."
      />
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.collectArticle]: {
    image: IMAGE_AUTH_SOURCE_COLLECT.src,
    title: () => (
      <Translate zh_hant="關聯作品" zh_hans="关联作品" en="Collect this Work" />
    ),
    intro: () => (
      <>
        <Translate
          zh_hant="有感而發嗎？立即開始創作，與當前文章串連起來"
          zh_hans="有感而发吗？立即开始创作，与当前文章串连起来"
          en="Feeling inspired?"
        />
        <br />
        <Translate
          zh_hant=""
          zh_hans=""
          en="Create your first post and collect this article."
        />
      </>
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.comment]: {
    image: IMAGE_AUTH_SOURCE_COMMENT.src,
    title: () => (
      <Translate zh_hant="撰寫評論" zh_hans="撰写评论" en="Leave a Comment" />
    ),
    intro: () => (
      <Translate
        zh_hant="分享你的觀點，與創作者開啟討論"
        zh_hans="分享你的观点，与创作者开启讨论"
        en="Share your thoughts and start the conversation here."
      />
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.create]: {
    image: IMAGE_AUTH_SOURCE_CREATE.src,
    title: () => (
      <Translate zh_hant="開始創作" zh_hans="开始创作" en="Start Creating" />
    ),
    intro: () => (
      <Translate
        zh_hant="發表你的第一篇作品，開始你的 Web3 探險"
        zh_hans="发表你的第一篇作品，开始你的 Web3 探险"
        en="Create your first post and embark on the Web3 journey."
      />
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.followUser]: {
    image: IMAGE_AUTH_SOURCE_FOLLOW.src,
    title: () => (
      <Translate
        zh_hant="追蹤作者"
        zh_hans="追踪作者"
        en="Follow this Author?"
      />
    ),
    intro: () => (
      <Translate
        zh_hant="及時發現你喜愛的作者動態與創作"
        zh_hans="及时发现你喜爱的作者动态与创作"
        en="Get the latest updates from your favorite authors."
      />
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.followTag]: {
    image: IMAGE_AUTH_SOURCE_FOLLOW.src,
    title: () => (
      <Translate
        zh_hant="追蹤標籤"
        zh_hans="追踪标签"
        en="Follow this Author or Circle?"
      />
    ),
    intro: () => (
      <Translate
        zh_hant="及時發現你喜愛的標籤動態"
        zh_hans="及时发现你喜爱的标签动态"
        en="Get the latest updates from your favorite tag."
      />
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.followCircle]: {
    image: IMAGE_AUTH_SOURCE_FOLLOW.src,
    title: () => (
      <Translate
        zh_hant="追蹤圍爐"
        zh_hans="追踪围炉"
        en="Follow this Circle?"
      />
    ),
    intro: () => (
      <Translate
        zh_hant="及時發現你喜愛的圍爐動態"
        zh_hans="及时发现你喜爱的围炉动态"
        en="Get the latest updates from your favorite Circles."
      />
    ),
  },
  [UNIVERSAL_AUTH_SOURCE.support]: {
    image: IMAGE_AUTH_SOURCE_SUPPORT.src,
    title: () => (
      <Translate
        zh_hant="支持作品"
        zh_hans="支持作品"
        en="Want to Support this work?"
      />
    ),
    intro: () => (
      <Translate
        zh_hant="透過加密貨幣或法幣支付，給予創作者珍貴回饋"
        zh_hans="透过加密货币或法币支付，给予创作者珍贵回馈"
        en="Support the creators with USDT, LikeCoin, and HKD."
      />
    ),
  },
}

const SourceHeader = ({ source }: { source: UNIVERSAL_AUTH_SOURCE }) => {
  const Titlte = AUTH_SOURCE_IMG[source].title
  const Intro = AUTH_SOURCE_IMG[source].intro

  return (
    <section className={styles['source-header']}>
      <img src={AUTH_SOURCE_IMG[source].image} alt="banner image" />

      <h3 className={styles['title']}>
        <TextIcon size="xm" weight="md">
          <Titlte />
        </TextIcon>
      </h3>

      <p className={styles['intro']}>
        <Intro />
      </p>
    </section>
  )
}

export default SourceHeader
