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
              spacing={[8, 12]}
              borderColor="green"
              borderActiveColor="greenDark"
              borderWidth="md"
              textColor="green"
              textActiveColor="greenDark"
              onClick={openDialog}
            >
              <FormattedMessage
                defaultMessage="Create collection"
                id="0ThOw1"
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
