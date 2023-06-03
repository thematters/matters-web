import { Head, Layout } from '~/components'

import DisplayPreferences from './DisplayPreferences'
import Enhance from './Enhance'
import Learn from './Learn'
import styles from './styles.module.css'

const Settings = () => {
  const year = new Date().getFullYear()

  return (
    <Layout.Main>
      <Head title={{ id: 'settings' }} />

      <DisplayPreferences />
      <Learn />
      <Enhance />

      <section className="copyright">
        <span>
          {'@ '}
          <span itemProp="copyrightYear">{year}</span>{' '}
          <span itemProp="copyrightHolder">Matters</span>
        </span>
      </section>
    </Layout.Main>
  )
}

export default Settings
