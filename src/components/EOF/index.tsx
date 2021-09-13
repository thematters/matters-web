import { Translate } from '~/components'

import styles from './styles.css'

export const EOF = () => (
  <div className="eof">
    <Translate zh_hant="已經看完全部囉" zh_hans="已经看完全部啰" en="End" />

    <style jsx>{styles}</style>
  </div>
)
