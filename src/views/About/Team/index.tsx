import IMAGE_BERYL from '@/public/static/images/about/team-beryl.svg'
import IMAGE_CHARLIE from '@/public/static/images/about/team-charlie.svg'
import IMAGE_DOBBY from '@/public/static/images/about/team-dobby.svg'
import IMAGE_EMILIE from '@/public/static/images/about/team-emilie.svg'
import IMAGE_GUO from '@/public/static/images/about/team-guo.svg'
import IMAGE_JAZZY from '@/public/static/images/about/team-jazzy.svg'
import IMAGE_JIEPING from '@/public/static/images/about/team-jieping.svg'
import IMAGE_ROBERT from '@/public/static/images/about/team-robert.svg'
import IMAGE_TOMAS from '@/public/static/images/about/team-tomas.svg'
import IMAGE_XINAN from '@/public/static/images/about/team-xinan.svg'
import IMAGE_XY from '@/public/static/images/about/team-xy.svg'
import IMAGE_YH from '@/public/static/images/about/team-yh.svg'
import IMAGE_YS from '@/public/static/images/about/team-ys.svg'
import IMAGE_YX from '@/public/static/images/about/team-yx.svg'
import IMAGE_ZECK from '@/public/static/images/about/team-zeck.svg'
import { Translate } from '~/components'

import layoutStyles from '../layout.module.css'
import styles from './styles.module.css'

const CREW = [
  {
    group: null,
    type: 'founder',
    people: [
      {
        avatar: IMAGE_JIEPING,
        title: 'Founder, CEO',
        name: (
          <Translate zh_hant="張潔平" zh_hans="张洁平" en="Jieping Zhang" />
        ),
      },
      {
        avatar: IMAGE_GUO,
        title: 'Co-founder, CTO',
        name: <Translate zh_hant="劉果" zh_hans="刘果" en="Guo Liu" />,
      },
      {
        avatar: IMAGE_BERYL,
        title: 'Co-founder, Operation',
        name: 'Beryl Liu',
      },
    ],
  },
  {
    group: <Translate zh_hant="產品" zh_hans="产品" en="Product" />,
    type: 'product',
    people: [
      {
        avatar: IMAGE_ZECK,
        title: 'Product Manager',
        name: 'Zeck Li',
      },
      {
        avatar: IMAGE_YH,
        title: 'UI/UX Designer',
        name: <Translate zh_hant="黃亦涵" zh_hans="黄亦涵" en="Yihan Huang" />,
      },
    ],
  },
  {
    group: (
      <Translate
        zh_hant="品牌 & 商務"
        zh_hans="品牌 & 商务"
        en="Brand & Business"
      />
    ),
    type: 'brandBusiness',
    people: [
      {
        avatar: IMAGE_EMILIE,
        title: 'Brand',
        name: 'Emilie Hsu',
      },
      {
        avatar: IMAGE_YX,
        title: 'Business Development',
        name: '育軒',
      },
    ],
  },

  {
    group: <Translate zh_hant="開發" zh_hans="开发" en="Development" />,
    type: 'dev',
    people: [
      {
        avatar: IMAGE_ROBERT,
        title: 'Tech Lead',
        name: 'Robert Lu',
      },
      {
        avatar: IMAGE_TOMAS,
        title: 'Sr. Software Engineer',
        name: 'Tomas Cheng',
      },
      {
        avatar: IMAGE_JAZZY,
        title: 'Full Stack Engineer',
        name: 'Jazzy Liang',
      },
      {
        avatar: IMAGE_CHARLIE,
        title: 'DevOps (PT)',
        name: 'Charlie',
      },
    ],
  },

  {
    group: <Translate zh_hant="運營" zh_hans="运营" en="Content Operation" />,
    type: 'community',
    people: [
      {
        avatar: IMAGE_YS,
        title: 'Matters Community',
        name: <Translate zh_hant="李映昕" zh_hans="李映昕" en="Yingshin Lee" />,
      },
      {
        avatar: IMAGE_DOBBY,
        title: 'Web3 Community',
        name: 'Dobby Will',
      },
      {
        avatar: IMAGE_XINAN,
        title: (
          <Translate
            zh_hant="在場獎學金"
            zh_hans="在场奖学金"
            en="Frontline Award"
          />
        ),
        name: 'Xinan He',
      },
      {
        avatar: IMAGE_XY,
        title: (
          <Translate
            zh_hant="在場獎學金"
            zh_hans="在场奖学金"
            en="Frontline Award"
          />
        ),
        name: 'XY',
      },
    ],
  },
]

const Team = () => {
  return (
    <section className={styles.team}>
      <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
          <h2 className={styles.title}>
            <Translate zh_hant="團隊成員" zh_hans="团队成员" en="Our Team" />
          </h2>

          {CREW.map(({ group, type, people }, gid) => (
            <section className={`${styles.group} ${styles[type]}`} key={gid}>
              <div className={styles.container}>
                {group && (
                  <h3>
                    <span>{group}</span>
                  </h3>
                )}
                <ul>
                  {people.map((person, pid) => (
                    <li key={pid}>
                      <figure>
                        <img src={person.avatar} alt="team member" />
                        <figcaption>
                          <p>{person.title}</p>
                          <h4>{person.name}</h4>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
