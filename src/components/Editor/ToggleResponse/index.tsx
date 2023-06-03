import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import {
  IconChecked,
  IconUnChecked,
  IconUnCheckedGrey,
  Translate,
} from '~/components'

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
    wrapper: true,
    inSidebar: !!inSidebar,
    disableChange: !!disableChangeCanComment,
  })

  if (inSidebar) {
    return (
      <section className={wrapperClasses}>
        <section
          className="item"
          onClick={allowResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_ALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className="left">
            <h3>
              <Translate id="allowResponses" />
            </h3>
            <p className="hint">
              <Translate id="allowResponsesHint" />
            </p>
          </section>
          <section className="right">
            {canComment ? (
              <IconChecked
                size="md"
                color={disableChangeCanComment ? 'grey' : 'green'}
              />
            ) : (
              <IconUnChecked color="grey-light" size="md" />
            )}
          </section>
        </section>
        <section
          className="item"
          onClick={disableResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_DISALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className="left">
            <h3>
              <Translate id="disableResponses" />
            </h3>
            <p className="hint">
              <Translate id="disableResponsesHint" />
            </p>
          </section>
          <section className="right">
            {canComment ? (
              disableChangeCanComment ? (
                <IconUnCheckedGrey color="grey-light" size="md" />
              ) : (
                <IconUnChecked color="grey-light" size="md" />
              )
            ) : (
              <IconChecked size="md" color="green" />
            )}
          </section>
        </section>
      </section>
    )
  }

  return (
    <section className="container">
      <h3 className="title">
        <Translate id="articleResponse" />
      </h3>
      <section className={wrapperClasses}>
        <section
          className="item"
          onClick={allowResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_ALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className="left">
            <h3>
              <Translate id="allowResponses" />
            </h3>
            <p className="hint">
              <Translate id="allowResponsesHint" />
            </p>
          </section>
          <section className="right">
            {canComment ? (
              <IconChecked
                color={disableChangeCanComment ? 'grey' : 'green'}
                size="md-s"
              />
            ) : (
              <IconUnChecked color="grey-light" size="md-s" />
            )}
          </section>
        </section>
        <section
          className="item"
          onClick={disableResponse}
          data-test-id={TEST_ID.DRAFTS_RESPONSE_DISALLOW}
          role="button"
          {...(disableChangeCanComment
            ? { ['aria-disabled']: disableChangeCanComment }
            : {})}
        >
          <section className="left">
            <h3>
              <Translate id="disableResponses" />
            </h3>
            <p className="hint">
              <Translate id="disableResponsesHint" />
            </p>
          </section>
          <section className="right">
            {canComment ? (
              disableChangeCanComment ? (
                <IconUnCheckedGrey color="grey-light" size="md-s" />
              ) : (
                <IconUnChecked color="grey-light" size="md-s" />
              )
            ) : (
              <IconChecked color="green" size="md-s" />
            )}
          </section>
        </section>
      </section>
    </section>
  )
}

export default ToggleResponse
