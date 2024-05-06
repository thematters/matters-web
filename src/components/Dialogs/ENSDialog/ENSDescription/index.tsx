import { FormattedMessage } from 'react-intl'

import { EXTERNAL_LINKS } from '~/common/enums'

import styles from './styles.module.css'

const ENSDescription = () => {
  return (
    <>
      <hr className={styles.hr} />

      <section className={styles.description}>
        <p>
          <FormattedMessage
            defaultMessage="By connecting ENS, benefits are:"
            id="LaI+XV"
          />
        </p>

        <ul>
          <li>
            <FormattedMessage
              defaultMessage="Customize IPNS page URL like ipfs.io/ipns/matty.eth"
              id="ZR1YpJ"
            />
          </li>
          <li>
            <FormattedMessage
              defaultMessage="Subscribers can add ENS to reader such as Planet"
              id="m6qWCv"
            />
          </li>
        </ul>

        <p className={styles.reference}>
          <FormattedMessage
            defaultMessage="More ENS information, check {node}."
            id="Hlwud7"
            values={{
              node: (
                <a
                  href={EXTERNAL_LINKS.ENS_DOCS}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FormattedMessage
                    defaultMessage="docs"
                    description="src/components/Dialogs/ENSDialog/ENSDescription/index.tsx"
                    id="aHTyGJ"
                  />
                </a>
              ),
            }}
          />
        </p>
      </section>
    </>
  )
}

export default ENSDescription
