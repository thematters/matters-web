import { Translate } from '~/components'

import IMAGE_BERYL from '@/public/static/images/about/team-beryl.svg'
import IMAGE_CHARLIE from '@/public/static/images/about/team-charlie.svg'
import IMAGE_GUO from '@/public/static/images/about/team-guo.svg'
import IMAGE_JIEPING from '@/public/static/images/about/team-jieping.svg'
import IMAGE_LEE from '@/public/static/images/about/team-lee.svg'
import IMAGE_ROBERT from '@/public/static/images/about/team-robert.svg'
import IMAGE_XIA from '@/public/static/images/about/team-xia.svg'
import IMAGE_XY from '@/public/static/images/about/team-xy.svg'
import IMAGE_YH from '@/public/static/images/about/team-yh.svg'
import IMAGE_YS from '@/public/static/images/about/team-ys.svg'
import IMAGE_YUE from '@/public/static/images/about/team-yue.svg'
import IMAGE_ZECK from '@/public/static/images/about/team-zeck.svg'

import styles from './styles.css'

const CREW = [
  {
    group: null,
    type: 'founder',
    people: [
      {
        avatar: IMAGE_BERYL,
        title: 'Co-founder, Operation',
        name: 'Beryl Liu',
      },
      {
        avatar: IMAGE_JIEPING,
        title: 'Co-founder, Operation',
        name: <Translate zh_hant="張潔平" zh_hans="张洁平" />,
      },
      {
        avatar: IMAGE_GUO,
        title: 'Co-founder, CTO',
        name: <Translate zh_hant="劉果" zh_hans="刘果" />,
      },
    ],
  },
  {
    group: <Translate zh_hant="產品" zh_hans="产品" />,
    type: 'product',
    people: [
      {
        avatar: IMAGE_YUE,
        title: 'Product Manager',
        name: <Translate zh_hant="小月" zh_hans="小月" />,
      },
      {
        avatar: IMAGE_YH,
        title: 'UI/UX Designer',
        name: <Translate zh_hant="黃亦涵" zh_hans="黄亦涵" />,
      },
    ],
  },
  {
    group: <Translate zh_hant="運營" zh_hans="运营" />,
    type: 'community',
    people: [
      {
        avatar: IMAGE_LEE,
        title: 'Community Head',
        name: 'Lee',
      },
      {
        avatar: IMAGE_YS,
        title: 'Community Facilitator',
        name: <Translate zh_hant="李映昕" zh_hans="李映昕" />,
      },
      {
        avatar: IMAGE_XY,
        title: 'Event Facilitator',
        name: 'XY',
      },
    ],
  },

  {
    group: <Translate zh_hant="開發" zh_hans="开发" />,
    type: 'dev',
    people: [
      {
        avatar: IMAGE_ZECK,
        title: 'Senior Product Engineer',
        name: 'Zeck Li',
      },
      {
        avatar: IMAGE_ROBERT,
        title: 'Product Engineer',
        name: 'Robert Lu',
      },
      {
        avatar: IMAGE_CHARLIE,
        title: 'Developer',
        name: 'Charlie',
      },
    ],
  },
  {
    group: <Translate zh_hant="數據" zh_hans="数据" />,
    type: 'data',
    people: [
      {
        avatar: IMAGE_XIA,
        title: 'Data Scientist',
        name: 'Xia',
      },
    ],
  },
]

const Team = () => {
  return (
    <section className="team">
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <h2>
              <Translate zh_hant="團隊成員" zh_hans="团队成员" />
            </h2>
          </div>

          {CREW.map(({ group, type, people }, gid) => (
            <section className={`group ${type}`} key={gid}>
              <div className="container">
                {group && (
                  <h3>
                    <span>{group}</span>
                  </h3>
                )}
                <ul>
                  {people.map((person, pid) => (
                    <li key={pid}>
                      <figure>
                        <img src={person.avatar} />
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

      <style jsx>{styles}</style>
    </section>
  )
}

export default Team
