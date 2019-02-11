import { NextContext } from 'next'

const ArticleDetail = ({ query }: NextContext) => {
  return (
    <>
      <p>ArticleDetail</p>
      <pre>{JSON.stringify(query)}</pre>
    </>
  )
}

ArticleDetail.getInitialProps = ({ query, pathname }: NextContext) => {
  return {
    query,
    pathname
  }
}

export default ArticleDetail
