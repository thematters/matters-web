import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { ResponsiveImage } from '~/components'
import { MomentDigestAssetsMomentFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  moment: gql`
    fragment MomentDigestAssetsMoment on Moment {
      assets {
        id
        path
      }
    }
  `,
}

const Assets = ({ moment }: { moment: MomentDigestAssetsMomentFragment }) => {
  const { assets } = moment
  return (
    <section
      className={styles.assets}
      data-test-id={TEST_ID.MOMENT_DIGEST_ASSETS}
    >
      {assets.map((asset) => (
        // TODO: add lightbox
        <div className={styles.item} key={asset.id} role="button">
          <ResponsiveImage url={asset.path} width={106} height={106} />
        </div>
      ))}
    </section>
  )
}

Assets.fragments = fragments

export default Assets
