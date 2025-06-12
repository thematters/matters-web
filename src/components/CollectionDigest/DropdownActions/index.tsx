import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconMore from '@/public/static/icons/24px/more.svg'
import { ERROR_CODES, ERROR_MESSAGES } from '~/common/enums'
import { Dropdown, Icon, Menu, toast, ViewerContext } from '~/components'
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
  const Content = () => (
    <Menu>
      <EditCollection.Button openDialog={openEditDialog} />
      <PinButton collection={collection} />
      <Menu.Divider />
      <DeleteCollection.Button openDialog={openDeleteDialog} />
    </Menu>
  )

  const intl = useIntl()
  const moreActionText = intl.formatMessage({
    defaultMessage: 'More Actions',
    id: 'A7ugfn',
  })

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <button
          onClick={(e) => {
            e.preventDefault()
            openDropdown()
          }}
          aria-label={moreActionText}
          aria-haspopup="listbox"
          ref={ref}
          className={styles.moreButton}
        >
          <Icon icon={IconMore} size={20} />
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
