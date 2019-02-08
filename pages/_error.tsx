import _get from 'lodash/get'
import { NextContext } from 'next'
import React from 'react'

export default class Error extends React.Component {
  public static getInitialProps({ res, err }: NextContext) {
    const statusCode = res
      ? res.statusCode
      : err
      ? _get(err, 'statusCode')
      : null
    return { statusCode }
  }

  public render() {
    const statusCode = _get(this.props, 'statusCode')
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    )
  }
}
