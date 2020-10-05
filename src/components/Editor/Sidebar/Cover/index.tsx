import { IconHashTagMedium } from '~/components'

import Box from '../Box'
import SetCoverDialog from './SetCoverDialog'
import styles from './styles.css'

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'

interface AddTagsProps {
  cover: string
  assets: Asset[]
  onEdit: (asset: Asset) => any
  saving?: boolean
  disabled?: boolean
}

const AddTags = ({ cover, assets, onEdit, saving, disabled }: AddTagsProps) => {
  return (
    <SetCoverDialog
      cover={cover}
      assets={assets}
      onSave={onEdit}
      saving={saving}
    >
      {({ open: openSetCoverDialog }) => (
        <Box
          icon={<IconHashTagMedium size="md" />}
          title="setCover"
          onClick={openSetCoverDialog}
          disabled={disabled}
        >
          <section className="container">
            <div className="cover">
              <img src={cover} />
            </div>

            <style jsx>{styles}</style>
          </section>
        </Box>
      )}
    </SetCoverDialog>
  )
}

export default AddTags
