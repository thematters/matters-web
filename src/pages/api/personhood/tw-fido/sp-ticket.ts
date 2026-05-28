import type { NextApiRequest, NextApiResponse } from 'next'

import {
  assertTwFidoEnabled,
  buildTwFidoDeeplink,
  createSpTicket,
  getTwFidoConfig,
  normalizeTwFidoIdNum,
} from '~/server/personhood/twFido'

type SpTicketBody = {
  idNum?: unknown
  returnUrl?: unknown
}

type SpTicketResponse =
  | {
      appId: string
      apiBaseUrl: string
      deeplink: string
      expiresAt?: string
      signType: string
      spTicket: string
      spTicketId: string
      status: 'ticket_created'
      transactionId: string
    }
  | {
      error: string
    }

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SpTicketResponse>
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  if (!isSameOriginRequest(req)) {
    res.status(403).json({ error: 'forbidden_origin' })
    return
  }

  try {
    assertTwFidoEnabled()

    const body = parseBody(req.body)
    const idNum = normalizeTwFidoIdNum(body.idNum)
    if (!idNum) {
      res.status(400).json({ error: 'invalid_id_num' })
      return
    }

    const returnUrl =
      typeof body.returnUrl === 'string' && isAllowedReturnUrl(body.returnUrl)
        ? body.returnUrl
        : `https://${req.headers.host}/me/settings/personhood/feasibility`

    const config = getTwFidoConfig()
    const ticket = await createSpTicket({ config, idNum })
    const deeplink = buildTwFidoDeeplink({
      returnUrl,
      spTicket: ticket.spTicket,
    })

    res.status(200).json({
      apiBaseUrl: config.apiBaseUrl,
      appId: config.appId,
      deeplink,
      expiresAt: ticket.ticketPayload.expiration_time,
      signType: config.signType,
      spTicket: ticket.spTicket,
      spTicketId: ticket.ticketPayload.sp_ticket_id,
      status: 'ticket_created',
      transactionId: ticket.ticketPayload.transaction_id,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error'
    res
      .status(message === 'personhood_tw_fido_disabled' ? 404 : 500)
      .json({ error: message })
  }
}

export default handler

const parseBody = (body: unknown): SpTicketBody => {
  if (typeof body === 'string') {
    return JSON.parse(body) as SpTicketBody
  }
  return (body || {}) as SpTicketBody
}

const isAllowedReturnUrl = (value: string) => {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' ||
      (url.protocol === 'http:' &&
        (url.hostname === 'localhost' || url.hostname === '127.0.0.1'))
    )
  } catch {
    return false
  }
}

const isSameOriginRequest = (req: NextApiRequest) => {
  const origin = req.headers.origin
  if (!origin) {
    return true
  }

  const host = req.headers.host
  if (!host) {
    return false
  }

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}
