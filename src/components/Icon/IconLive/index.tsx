import { Tooltip, Translate } from '~/components'

import { ReactComponent as Live } from '@/public/static/icons/label-live.svg'

import styles from './styles.css'

export const IconLive = () => (
  <Tooltip
    content={<Translate zh_hant="線上對談進行中" zh_hans="线上对谈进行中" />}
  >
    <span aria-label="LIVE">
      <Live style={{ width: '3rem', height: 20 }} />

      <style jsx>{styles}</style>
    </span>
  </Tooltip>
)
