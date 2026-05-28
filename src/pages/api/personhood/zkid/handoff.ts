import type { NextApiRequest, NextApiResponse } from 'next'

import { requestMattersGraphQL } from '~/server/personhood/mattersGraphql'
import { assertTwFidoEnabled } from '~/server/personhood/twFido'

type HandoffBody = {
  challenge?: unknown
  challengeExpiresAt?: unknown
}

type HandoffResponse =
  | {
      expiresAt: string
      status: 'handoff_created'
      token: string
    }
  | {
      error: string
    }

type CreatePersonhoodHandoffData = {
  createPersonhoodHandoff: {
    expiresAt: string
    token: string
  }
}

const CREATE_PERSONHOOD_HANDOFF = [
  'mutation CreatePersonhoodHandoff($input: CreatePersonhoodHandoffInput!) {',
  `
    createPersonhoodHandoff(input: $input) {
      expiresAt
      token
    }
  `,
  '}',
].join('\n')

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HandoffResponse>
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
    if (typeof body.challenge !== 'string' || !body.challenge) {
      res.status(400).json({ error: 'missing_challenge' })
      return
    }

    const data = await requestMattersGraphQL<CreatePersonhoodHandoffData>({
      cookie: req.headers.cookie,
      query: CREATE_PERSONHOOD_HANDOFF,
      variables: {
        input: {
          challenge: body.challenge,
          challengeExpiresAt:
            typeof body.challengeExpiresAt === 'string'
              ? body.challengeExpiresAt
              : undefined,
        },
      },
    })

    res.status(200).json({
      expiresAt: data.createPersonhoodHandoff.expiresAt,
      status: 'handoff_created',
      token: data.createPersonhoodHandoff.token,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error'
    res
      .status(message === 'personhood_tw_fido_disabled' ? 404 : 500)
      .json({ error: message })
  }
}

export default handler

const parseBody = (body: unknown): HandoffBody => {
  if (typeof body === 'string') {
    return JSON.parse(body) as HandoffBody
  }
  return (body || {}) as HandoffBody
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
