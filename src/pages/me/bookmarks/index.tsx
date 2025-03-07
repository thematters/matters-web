import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/me/bookmarks/articles',
      permanent: true, // set to false if this redirect might change in the future
    },
  }
}

export default function BookmarksRedirect() {
  return null
}
