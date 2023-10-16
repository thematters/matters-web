import { FormattedMessage } from 'react-intl'

import { AddCollectionDialog, Button } from '~/components'

import styles from './styles.module.css'

const CreateCollection = () => {
  return (
    <AddCollectionDialog gotoDetailPage>
      {({ openDialog }) => {
        return (
          <section className={styles.createCollection}>
            <Button
              spacing={['xtight', 'tight']}
              borderColor="green"
              borderActiveColor="greenDark"
              borderWidth="md"
              textColor="green"
              textActiveColor="greenDark"
              onClick={openDialog}
            >
              <FormattedMessage
                defaultMessage="Create collection"
                description="src/views/User/Collections/UserCollections.tsx"
              />
            </Button>
          </section>
        )
      }}
    </AddCollectionDialog>
  )
}

export default CreateCollection
