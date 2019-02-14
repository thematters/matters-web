import { ANALYTIC_TYPES, ANALYTICS } from '~/common/enums'

const trackAs = (type: string) => (...args: any[]) => {
  console.log('hi')
  if (process.browser) {
    // construct event with details
    const event = new CustomEvent(ANALYTICS, {
      detail: { args, type }
    })

    // dispatch event
    console.log({ event })
    window.dispatchEvent(event)
  }
}

export const analytics = {
  trackEvent: trackAs(ANALYTIC_TYPES.TRACK),
  trackPage: trackAs(ANALYTIC_TYPES.PAGE),
  identifyUser: trackAs(ANALYTIC_TYPES.IDENTIFY)
}
