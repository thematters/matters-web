import { Layout } from '~/components'

import styles from './styles.module.css'

const Description = ({ description }: { description: string }) => {
  return (
    <Layout.Main.Spacing hasVertical={false}>
      <section
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </Layout.Main.Spacing>
  )
}

export default Description
