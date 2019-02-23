import { Head, UserProfile } from '~/components'

export default () => (
  <main>
    <Head title={{ zh_hant: '評論', zh_hans: '评论' }} />

    <UserProfile />

    <section className="l-row">
      <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <img src="https://via.placeholder.com/600.png" />
      </div>
    </section>
  </main>
)
