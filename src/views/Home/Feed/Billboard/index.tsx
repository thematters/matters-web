import classNames from 'classnames'

import { Billboard as BaseBillboard } from '~/components'

import styles from './styles.module.css'

const Billboard = ({ hasBorder = true }: { hasBorder?: boolean }) => {
  const tokenId = process.env.NEXT_PUBLIC_BILLBOARD_TOKEN_ID

  if (isNaN(Number(tokenId))) {
    return null
  }

  const containerClasses = classNames({
    [styles.container]: true,
    [styles.hasBorder]: hasBorder,
  })

  return (
    <section className={containerClasses}>
      <BaseBillboard tokenId={tokenId} type="home_hottest" />
    </section>
  )
}

export default Billboard
