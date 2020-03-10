import chunk from 'lodash/chunk'

import { Translate, useResponsive } from '~/components'

import IMAGE_FEATURE_1 from '~/static/images/migration-feature-1.svg'
import IMAGE_FEATURE_2 from '~/static/images/migration-feature-2.svg'
import IMAGE_FEATURE_3 from '~/static/images/migration-feature-3.svg'

import styles from './styles.css'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
} = {
  zh_hant: {
    header: '搬家完成後，你將立刻獲得以下功能',
    title_1: '實現作品的永久保存',
    content_1:
      '選擇發佈後，你的文章將被上傳到星際文件系統（InterPlanetary File System，IPFS）的節點上' +
      '，實現作品内容的分佈式儲存，無法被删改。你可使用這些分佈式節點傳播你的作品。',
    title_4: '持續的被動收入',
    content_4:
      '你的文章在 Matters 發佈後，讀者就可以為文章讚賞，每一筆讚賞都將轉換成數字貨幣 LikeCoin，' +
      '變成創作者的收入。讚賞没有時間期限，除非你將作品隱藏，否則每一篇文章都可持續收到讚賞。',
    title_5: '優質的讀者互動',
    content_5:
      'Matters 的用戶來自中國大陸、香港、台灣、馬來西亞等地，擁有華文世界裡最優質與多元的寫作評論社區。',
    likecoin: '了解 LikeCoin →',
    examples: '有多優質，请看這裡 →'
  },
  zh_hans: {
    header: '搬家完成后，你将立刻获得以下功能',
    title_1: '实现作品的永久保存',
    content_1:
      '选择发布后，你的文章将被上载到星际文档系统（InterPlanetary File System，IPFS）的节点上' +
      '，实现作品内容的分布式存储，无法被删改。你可使用这些分布式节点传播你的作品。',
    title_4: '持续的被动收入',
    content_4:
      '你的文章在 Matters 发布后，读者就可以为文章打赏，每一笔打赏都将转换成数字货币 LikeCoin，' +
      '变成创作者的收入。打赏没有时间期限，除非你将作品隐藏，否则每一篇文章都可持续收到打赏。',
    title_5: '优质的读者互动',
    content_5:
      'Matters 的用户来自中国大陆、香港、台湾、马来西亚等地，拥有华文世界里最优质与多元的写作评论社区。',
    likecoin: '了解 LikeCoin →',
    examples: '有多优质，请看这里 →'
  }
}

const likeCoinLink = 'https://matters.news/@likecoin/'
  + '%E5%8C%96%E8%AE%9A%E7%82%BA%E8%B3%9E-%E8%AE%9A%E8%B3%9E%E5%85%AC%E6%B0%91%E6%87%B6%E4%BA%BA%E5%8C%85-'
  + 'zdpuAtWT6a2rjr75JZBzwnvy67vrxw5cBRqwnHbkFehRYHLXx'

const communityLink = 'https://matters.news/@Nikko/'
  + '%E8%AE%A9%E4%B8%A7%E5%AE%B6%E4%B9%8B%E7%8A%AC%E5%86%8D%E8%B7%91%E4%B8%80%E4%BC%9A%E5%84%BF-'
  + 'zdpuB2uXYrM44Q4KfzpdAsUtiqCH7vccj79m3iqvXTJH4ZS5s'

const Feature = ({
  children,
  index,
  src
}: {
  children?: React.ReactNode
  index: number
  src?: string
}) => {
  const { zh_hant, zh_hans } = texts
  const titleId = `title_${index}`
  const contentId = `content_${index}`

  return (
    <section className="l-col-4 l-col-md-4 l-col-lg-6 feature">
      {src ? (
        <img src={src} />
      ) : (
        <>
          <section className="title">
            <Translate zh_hant={zh_hant[titleId]} zh_hans={zh_hans[titleId]} />
          </section>
          <section className="content">
            <Translate
              zh_hant={zh_hant[contentId]}
              zh_hans={zh_hans[contentId]}
            />
          </section>
        </>
      )}
      <section className="link">{children}</section>
      <style jsx>{styles}</style>
    </section>
  )
}

const Features = () => {
  const { zh_hant, zh_hans } = texts

  const isMediumUp = useResponsive('md-up')

  const items: Array<{ index: number; src?: string; children?: any }> = [
    { index: 1 },
    { index: 2, src: IMAGE_FEATURE_1 },
    { index: 3, src: IMAGE_FEATURE_2 },
    {
      index: 4,
      children: (
        <a className="u-link-green" href={likeCoinLink} target="_blank">
          <Translate zh_hant={zh_hant.likecoin} zh_hans={zh_hans.likecoin} />
        </a>
      )
    },
    {
      index: 5,
      children: (
        <a className="u-link-green" href={communityLink} target="_blank">
          <Translate zh_hant={zh_hant.examples} zh_hans={zh_hans.examples} />
        </a>
      )
    },
    { index: 6, src: IMAGE_FEATURE_3 }
  ]

  if (!isMediumUp) {
    const temp = items[3]
    items[3] = items[2]
    items[2] = temp
  }

  return (
    <section className="features-wrap">
      <section className="l-row header">
        <h2>
          <Translate zh_hant={zh_hant.header} zh_hans={zh_hans.header} />
        </h2>
      </section>

      {chunk(items, 2).map((chunks, index) => (
        <section className="l-row features" key={index}>
          <Feature {...chunks[0]} />
          <Feature {...chunks[1]} />
        </section>
      ))}

      <style jsx>{styles}</style>
    </section>
  )
}

export default Features
