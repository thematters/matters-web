import { Translate } from '~/components'

import styles from './styles.css'

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
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Team
