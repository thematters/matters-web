import MeTabs from '../MeTabs'

export default () => (
  <main>
    <section className="l-row--full">
      <div className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
        <h1>Me</h1>
      </div>
    </section>

    <section className="l-row">
      <div className="l-col-4 l-col-md-1 l-col-lg-2">
        <MeTabs />
      </div>
      <div className="l-col-4 l-col-md-6 l-col-lg-8">
        <img src="https://via.placeholder.com/600.png" />
      </div>
    </section>
  </main>
)
