import { Head, Layout } from '~/components'

import DisplayPreferences from './DisplayPreferences'
import Enhance from './Enhance'
import Learn from './Learn'
import styles from './styles.css'

const Settings = () => {
  const year = new Date().getFullYear()

  return (
    <Layout.Main smBgColor="grey-lighter">
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
      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default Settings
