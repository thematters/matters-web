import { Translate } from '~/components';

import IMAGE_GOAL from '~/static/images/about-2.svg';

import styles from './styles.css';

const Goal = () => (
  <section className="goal">
    <div className="l-row">
      <div className="l-col-4 l-col-md-4 l-col-lg-6 ">
        <img src={IMAGE_GOAL} />
      </div>

      <div className="l-col-4 l-col-md-4 l-col-lg-6 ">
        <h2>
          <Translate zh_hant="Matters 理念" zh_hans="Matters 理念" />
        </h2>
        <p>
          <Translate
            zh_hant="Matters 是一個以分佈式網絡為基礎、加密貨幣驅動的創作和公共討論平台。"
            zh_hans="Matters 是一个以分布式网络为基础、加密货币驱动的创作和公共讨论平台。"
          />
        </p>
        <p>
          <Translate
            zh_hant="所有在 Matters 上發佈的作品（不含評論），皆會上載到星際文件系統（InterPlanetary File System，IPFS）的節點上，實現作品內容的分佈式存儲，完成將數據回歸創作者的第一步。"
            zh_hans="所有在 Matters 上发布的作品（不含评论），皆会上载到星际文件系统（InterPlanetary File System，IPFS）的节点上，实现作品内容的分布式存储，完成将数据回归创作者的第一步。"
          />
        </p>
        <p>
          <Translate
            zh_hant="Matters 希望圍繞公共議題、知識生產，重構內容價值生態，搭建優質社群平台，保護創作版權；以獨特算法令優質內容浮現，以數字貨幣讓創作者、參與者獲得持續回報。"
            zh_hans="Matters 希望围绕公共议题、知识生产，重构内容价值生态，搭建优质社群平台，保护创作版权；以独特算法令优质内容浮现，以数字货币让创作者、参与者获得持续回报。"
          />
        </p>
        <p>
          <Translate
            zh_hant="2019 年 10 月，Matters 和 LikeCoin 聯手，將 LikeCoin 這一基於寫作者創造力為衡量的加密貨幣，引入到 Matters 的自由創作和公共討論空間之中，平台效應以收入的形式回饋給作者。"
            zh_hans="2019 年 10 月，Matters 和 LikeCoin 联手，将 LikeCoin 这一基于写作者创造力为衡量的加密货币，引入到 Matters 的自由创作和公共讨论空间之中，平台效应以收入的形式回馈给作者。"
          />
        </p>
      </div>
    </div>

    <style jsx>{styles}</style>
  </section>
);

export default Goal;
