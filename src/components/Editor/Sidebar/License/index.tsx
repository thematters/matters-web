import classNames from 'classnames'
import { useCallback, useContext, useId, useState } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import IconUp from '@/public/static/icons/24px/up.svg'
import { LICENSE_TEXT, Z_INDEX } from '~/common/enums'
import { Dropdown, Icon, LanguageContext } from '~/components'
import Option from '~/components/Form/Select/Option'
import {
  ArticleLicenseType,
  DigestRichCirclePublicFragment,
} from '~/gql/graphql'

import Box from '../Box'
import styles from './styles.module.css'

export type SidebarLicenseProps = {
  license: ArticleLicenseType
  circle?: DigestRichCirclePublicFragment | null
  editAccess: (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => void
  saving: boolean
}

const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  {
    isEditing: boolean
    onToggle: () => void
    disabled?: boolean
  }
>(({ isEditing, onToggle, disabled }, ref) => {
  const intl = useIntl()

  return (
    <button
      onClick={onToggle}
      className={styles.rightButton}
      disabled={disabled}
      aria-label={intl.formatMessage(
        isEditing
          ? { defaultMessage: 'Save', id: 'rbrahO' }
          : { defaultMessage: 'Edit', id: '2/2yg+' }
      )}
      ref={ref}
    >
      <Icon icon={isEditing ? IconUp : IconDown} size={24} color="black" />
    </button>
  )
})

ToggleButton.displayName = 'ToggleButton'

const SidebarLicense = ({
  license: _license,
  circle,
  editAccess,
  saving,
}: SidebarLicenseProps) => {
  const intl = useIntl()
  const fieldId = useId()
  const selectedOptionId = `${fieldId}-selected`
  const { lang } = useContext(LanguageContext)
  const [isEditing, setIsEditing] = useState(false)
  const license =
    _license === ArticleLicenseType.CcByNcNd_2
      ? ArticleLicenseType.CcByNcNd_4
      : _license
  const handleToggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev)
  }, [])

  const isInCircle = !!circle

  const types = [
    ArticleLicenseType.CcByNcNd_4,
    ArticleLicenseType.Cc_0,
    ArticleLicenseType.Arr,
  ] as const

  const options = types.map((value) => {
    return {
      name: LICENSE_TEXT[isInCircle ? 1 : 0][value].title[lang],
      subtitle: LICENSE_TEXT[isInCircle ? 1 : 0][value].subtitle[lang],
      value,
      selected: license === value,
    }
  })

  const Options = ({ dropdown }: { dropdown?: boolean }) => {
    const optionsClasses = classNames({
      [styles.list]: true,
      [styles.options]: true,
      [styles.dropdown]: dropdown,
    })

    return (
      <ul
        tabIndex={0}
        className={optionsClasses}
        role="listbox"
        aria-labelledby={fieldId}
        aria-activedescendant={selectedOptionId}
      >
        {options.map((option, index) => (
          <Option
            id={option.selected ? selectedOptionId : `${fieldId}-${index}`}
            name={option.name}
            subtitle={option.subtitle}
            onClick={() => {
              editAccess(
                isInCircle,
                isInCircle && option.value === ArticleLicenseType.Arr,
                option.value
              )
              handleToggleEdit()
            }}
            selected={option.selected}
            expanded
            size={14}
            key={index}
          />
        ))}
      </ul>
    )
  }

  return (
    <Dropdown content={<Options dropdown />} zIndex={Z_INDEX.OVER_DIALOG}>
      {({ openDropdown, ref }) => (
        <Box
          title={intl.formatMessage(
            {
              defaultMessage: 'License: {license}',
              id: 'B7QJw1',
            },
            {
              license: LICENSE_TEXT[isInCircle ? 1 : 0][license].title[lang],
            }
          )}
          subtitle={LICENSE_TEXT[isInCircle ? 1 : 0][license].subtitle[lang]}
          rightButton={
            <ToggleButton
              isEditing={isEditing}
              onToggle={() => {
                openDropdown()
                handleToggleEdit()
              }}
              disabled={saving}
              ref={ref as React.RefObject<HTMLButtonElement>}
            />
          }
          disabled={saving}
        ></Box>
      )}
    </Dropdown>
  )
}

export default SidebarLicense
