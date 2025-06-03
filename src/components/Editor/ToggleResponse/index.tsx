import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import IconChecked from '@/public/static/icons/checked.svg'
import IconUnChecked from '@/public/static/icons/unchecked.svg'
import IconUnCheckedGrey from '@/public/static/icons/uncheckedGrey.svg'
import { TEST_ID } from '~/common/enums'
import { Icon } from '~/components'

import styles from './styles.module.css'

export type ToggleResponseProps = {
  canComment: boolean | null
  toggleComment: (canComment: boolean) => void
  inSidebar?: boolean
  disableChangeCanComment?: boolean
}

const ToggleResponse = ({
  canComment,
  toggleComment,
  inSidebar,
  disableChangeCanComment = false,
}: ToggleResponseProps) => {
  const allowResponse = () => {
    if (disableChangeCanComment) return
    toggleComment(true)
  }
  const disableResponse = () => {
    if (disableChangeCanComment) return
    toggleComment(false)
  }

  const wrapperClasses = classNames({
    [styles.wrapper]: true,
    [styles.inSidebar]: !!inSidebar,
    [styles.disableChange]: !!disableChangeCanComment,
  })

  if (inSidebar) {
    return (
      <section className={wrapperClasses}>
        <section
          className={styles.item}
          onClick={allowResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_ALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className={styles.left}>
            <h3>
              <FormattedMessage defaultMessage="Allow Responses" id="+12veD" />
            </h3>
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="Allow readers to respond to this article (can NOT be disabled afterwards)"
                id="eIlMHB"
              />
            </p>
          </section>
          <section className={styles.right}>
            {canComment ? (
              <Icon
                icon={IconChecked}
                size={24}
                color={disableChangeCanComment ? 'grey' : 'green'}
              />
            ) : (
              <Icon icon={IconUnChecked} color="greyLight" size={24} />
            )}
          </section>
        </section>
        <section
          className={styles.item}
          onClick={disableResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_DISALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className={styles.left}>
            <h3>
              <FormattedMessage
                defaultMessage="Disable Responses"
                id="TInwt3"
              />
            </h3>
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="Disallow readers to respond to this article (you can enable responses later by editing this article)"
                id="fBzH+2"
              />
            </p>
          </section>
          <section className={styles.right}>
            {canComment ? (
              disableChangeCanComment ? (
                <Icon icon={IconUnCheckedGrey} color="greyLight" size={24} />
              ) : (
                <Icon icon={IconUnChecked} color="greyLight" size={24} />
              )
            ) : (
              <Icon icon={IconChecked} size={24} color="green" />
            )}
          </section>
        </section>
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        <FormattedMessage
          defaultMessage="Response"
          id="6B+QXo"
          description="src/components/Editor/ToggleResponse/index.tsx"
        />
      </h3>
      <section className={wrapperClasses}>
        <section
          className={styles.item}
          onClick={allowResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_ALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className={styles.left}>
            <h3>
              <FormattedMessage defaultMessage="Allow Responses" id="+12veD" />
            </h3>
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="Allow readers to respond to this article (can NOT be disabled afterwards)"
                id="eIlMHB"
              />
            </p>
          </section>
          <section className={styles.right}>
            {canComment ? (
              <Icon
                icon={IconChecked}
                color={disableChangeCanComment ? 'grey' : 'green'}
                size={20}
              />
            ) : (
              <Icon icon={IconUnChecked} color="greyLight" size={20} />
            )}
          </section>
        </section>
        <section
          className={styles.item}
          onClick={disableResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_DISALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className={styles.left}>
            <h3>
              <FormattedMessage
                defaultMessage="Disable Responses"
                id="TInwt3"
              />
            </h3>
            <p className={styles.hint}>
              <FormattedMessage
                defaultMessage="Disallow readers to respond to this article (you can enable responses later by editing this article)"
                id="fBzH+2"
              />
            </p>
          </section>
          <section className={styles.right}>
            {canComment ? (
              disableChangeCanComment ? (
                <Icon icon={IconUnCheckedGrey} color="greyLight" size={20} />
              ) : (
                <Icon icon={IconUnChecked} color="greyLight" size={20} />
              )
            ) : (
              <Icon icon={IconChecked} color="green" size={20} />
            )}
          </section>
        </section>
      </section>
    </section>
  )
}

export default ToggleResponse
