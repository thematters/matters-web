import { useLazyQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import { Fragment, useEffect } from 'react'

import { Menu } from '~/components'
import { Translate } from '~/components/Language'
import { Spinner } from '~/components/Spinner'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'

import styles from './styles.css'

import { SearchAutoComplete as SearchAutoCompleteType } from './__generated__/SearchAutoComplete'

interface SearchAutoCompleteProps {
  searchKey?: string
  inPage?: boolean
}

const SEARCH_AUTOCOMPLETE = gql`
  query SearchAutoComplete($searchKey: String) {
    frequentSearch(input: { first: 5, key: $searchKey })
  }
`

export const SearchAutoComplete = ({
  searchKey = '',
  inPage
}: SearchAutoCompleteProps) => {
  const [getAutoComplete, { data, loading }] = useLazyQuery<
    SearchAutoCompleteType
  >(SEARCH_AUTOCOMPLETE, {
    variables: { searchKey }
  })
  const frequentSearch = data?.frequentSearch || []
  const showFrequentSearch = frequentSearch.length > 0

  const autocompleteClass = classNames({
    autocomplete: true,
    inPage
  })

  useEffect(() => {
    getAutoComplete()
  }, [searchKey])

  if (loading) {
    return <Spinner />
  }

  if (!showFrequentSearch) {
    return null
  }

  return (
    <Menu width={inPage ? undefined : 'md'}>
      <section className={autocompleteClass}>
        <Menu.Item
          {...toPath({
            page: 'search',
            q: searchKey
          })}
          onClick={() => {
            analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FREQUENT_SEARCH, {
              location: -1,
              entrance: searchKey
            })
          }}
        >
          <span className="key highlight">
            <Translate id="search" />
            <b>&nbsp;{searchKey}</b>
          </span>
        </Menu.Item>
        <Menu.Divider />

        {frequentSearch.map((key, i) => (
          <Fragment key={key}>
            <Menu.Item
              {...toPath({
                page: 'search',
                q: key
              })}
              onClick={() => {
                analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FREQUENT_SEARCH, {
                  location: i,
                  entrance: key
                })
              }}
            >
              <span className="key">{key}</span>
            </Menu.Item>
            <Menu.Divider />
          </Fragment>
        ))}

        <style jsx>{styles}</style>
      </section>
    </Menu>
  )
}
