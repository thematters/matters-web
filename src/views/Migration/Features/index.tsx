import IMAGE_FEATURE_1 from '@/public/static/images/migration-feature-1.svg?url'
import IMAGE_FEATURE_2 from '@/public/static/images/migration-feature-2.svg?url'
import IMAGE_FEATURE_3 from '@/public/static/images/migration-feature-3.svg?url'
import { Translate } from '~/components'

import layoutStyles from '../../About/layout.module.css'
import styles from './styles.module.css'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
  en: Record<string, string>
} = {
  zh_hant: {
    header: '搬家完成後，你將立刻獲得以下功能',
    title_1: '實現作品的永久保存',
    content_1:
      '選擇發布後，你的作品將被上載到星際文件系統（InterPlanetary File System，IPFS）的節點上' +
      '，實現作品内容的分佈式存儲，無法被删改。你可使用這些分佈式節點傳播你的作品。',
    title_2: '持續的被動收入',
    content_2:
      '你的作品在 Matters 發布後，讀者就可以為作品拍手，每一筆拍手都將轉換成加密貨幣 LikeCoin，' +
      '變成創作者的收入。拍手没有時間期限，除非你將作品歸檔，否則每一篇作品都可持續收到拍手。',
    title_3: '優質的讀者互動',
    content_3:
      'Matters 的用戶來自中國大陸、香港、台灣、馬來西亞等地，擁有華文世界裡最優質與多元的寫作評論社區。',
    likecoin: '了解什麼是 LikeCoin →',
    examples: '有多優質，請看這裡 →',
  },
  zh_hans: {
    header: '搬家完成后，你将立刻获得以下功能',
    title_1: '实现作品的永久保存',
    content_1:
      '选择发布后，你的作品将被上载到星际文档系统（InterPlanetary File System，IPFS）的节点上' +
      '，实现作品内容的分布式存储，无法被删改。你可使用这些分布式节点传播你的作品。',
    title_2: '持续的被动收入',
    content_2:
      '你的作品在 Matters 发布后，读者就可以为作品打赏，每一笔打赏都将转换成数字货币 LikeCoin，' +
      '变成创作者的收入。打赏没有时间期限，除非你将作品封存，否则每一篇作品都可持续收到打赏。',
    title_3: '优质的读者互动',
    content_3:
      'Matters 的用户来自中国大陆、香港、台湾、马来西亚等地，拥有华文世界里最优质与多元的写作评论社区。',
    likecoin: '了解什么是 LikeCoin →',
    examples: '有多优质，请看这里 →',
  },
  en: {
    header:
      'After migration, you will be able to access the following features',
    title_1: 'Permanent storage of your works',
    content_1:
      'After publishing, your work will be uploaded on IPFS (InterPlanetary File System)' +
      ', stored permenently and not able to be deleted and tampered. You can use any IPFS node to access and distribute your works.',
    title_2: 'Constant passive income',
    content_2:
      'After publishing on Matters, readers can donate to your works with LikeCoin or fiat currency' +
      '. As long as you do not archive your work, it will continuesly acquire donation.',
    title_3: 'High quality reader feedback',
    content_3:
      'Matters users come from mainland China, Hongkong, Taiwan, Malaysia and around the world, forming the highest quality and most diverse Chinese writing community.',
    likecoin: 'Learn more about LikeCoin →',
    examples: 'See examples here →',
  },
}

const likeCoinLink =
  'https://matters.town/@likecoin/' +
  '%E5%8C%96%E8%AE%9A%E7%82%BA%E8%B3%9E-%E8%AE%9A%E8%B3%9E%E5%85%AC%E6%B0%91%E6%87%B6%E4%BA%BA%E5%8C%85-' +
  'zdpuAtWT6a2rjr75JZBzwnvy67vrxw5cBRqwnHbkFehRYHLXx'

const communityLink =
  'https://matters.town/@Nikko/' +
  '%E8%AE%A9%E4%B8%A7%E5%AE%B6%E4%B9%8B%E7%8A%AC%E5%86%8D%E8%B7%91%E4%B8%80%E4%BC%9A%E5%84%BF-' +
  'zdpuB2uXYrM44Q4KfzpdAsUtiqCH7vccj79m3iqvXTJH4ZS5s'

const Features = () => {
  const { zh_hant, zh_hans, en } = texts

  return (
    <section className={styles.features}>
      <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
          <div className={layoutStyles.columnFull}>
            <h2>
              <Translate
                zh_hant={zh_hant.header}
                zh_hans={zh_hans.header}
                en={en.header}
              />
            </h2>
          </div>
        </div>
      </div>

      <ul>
        <li className={layoutStyles.container}>
          <div className={layoutStyles.content}>
            <section
              className={[styles.content, layoutStyles.columnFull].join(' ')}
            >
              <h3>
                <Translate
                  zh_hant={zh_hant.title_1}
                  zh_hans={zh_hans.title_1}
                  en={en.title_1}
                />
              </h3>
              <p>
                <Translate
                  zh_hant={zh_hant.content_1}
                  zh_hans={zh_hans.content_1}
                  en={en.content_1}
                />
              </p>
            </section>

            <img src={IMAGE_FEATURE_1} alt="illustration 1" />
          </div>
        </li>

        <li className={layoutStyles.container}>
          <div className={layoutStyles.content}>
            <section className={styles.content}>
              <h3>
                <Translate
                  zh_hant={zh_hant.title_2}
                  zh_hans={zh_hans.title_2}
                  en={en.title_2}
                />
              </h3>
              <p>
                <Translate
                  zh_hant={zh_hant.content_2}
                  zh_hans={zh_hans.content_2}
                  en={en.content_2}
                />
              </p>
              <p>
                <a
                  className="u-link-green"
                  href={likeCoinLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Translate
                    zh_hant={zh_hant.likecoin}
                    zh_hans={zh_hans.likecoin}
                    en={en.likecoin}
                  />
                </a>
              </p>
            </section>

            <img src={IMAGE_FEATURE_2} alt="illustration 2" />
          </div>
        </li>

        <li className={layoutStyles.container}>
          <div className={layoutStyles.content}>
            <section className={styles.content}>
              <h3>
                <Translate
                  zh_hant={zh_hant.title_3}
                  zh_hans={zh_hans.title_3}
                  en={en.title_3}
                />
              </h3>
              <p>
                <Translate
                  zh_hant={zh_hant.content_3}
                  zh_hans={zh_hans.content_3}
                  en={en.content_3}
                />
              </p>
              <p>
                <a
                  className="u-link-green"
                  href={communityLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Translate
                    zh_hant={zh_hant.examples}
                    zh_hans={zh_hans.examples}
                    en={en.examples}
                  />
                </a>
              </p>
            </section>

            <img src={IMAGE_FEATURE_3} alt="illustration 3" />
          </div>
        </li>
      </ul>
    </section>
  )
}

export default Features
