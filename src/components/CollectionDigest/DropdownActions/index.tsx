import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ERROR_CODES } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Dropdown,
  ERROR_MESSAGES,
  IconMore16,
  LanguageContext,
  Menu,
  toast,
  ViewerContext,
} from '~/components'
import { DropdownActionsCollectionFragment } from '~/gql/graphql'

import DeleteCollection from './DeleteCollection'
import EditCollection from './EditCollection'
import { fragments } from './gql'
import PinButton from './PinButton'
import styles from './styles.module.css'

type DropdownActionsProps = {
  collection: DropdownActionsCollectionFragment
}

interface DialogProps {
  openEditDialog: () => void
  openDeleteDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  collection,
  openEditDialog,
  openDeleteDialog,
}: BaseDropdownActionsProps) => {
  const { lang } = useContext(LanguageContext)

  const Content = () => (
    <Menu>
      <EditCollection.Button openDialog={openEditDialog} />
      <PinButton collection={collection} />
      <Menu.Divider />
      <DeleteCollection.Button openDialog={openDeleteDialog} />
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <button
          onClick={(e) => {
            e.preventDefault()
            openDropdown()
          }}
          aria-label={translate({ id: 'moreActions', lang })}
          aria-haspopup="listbox"
          ref={ref}
          className={styles.moreButton}
        >
          <IconMore16 size="mdS" />
        </button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const { collection } = props
  const viewer = useContext(ViewerContext)

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  if (collection.author.id !== viewer.id) {
    return null
  }

  return (
    <EditCollection.Dialog collection={collection}>
      {({ openDialog: openEditDialog }) => (
        <DeleteCollection.Dialog collection={collection}>
          {({ openDialog: openDeleteDialog }) => (
            <BaseDropdownActions
              {...props}
              openEditDialog={viewer.isFrozen ? forbid : openEditDialog}
              openDeleteDialog={viewer.isFrozen ? forbid : openDeleteDialog}
            />
          )}
        </DeleteCollection.Dialog>
      )}
    </EditCollection.Dialog>
  )
}

DropdownActions.fragments = fragments

export default DropdownActions
