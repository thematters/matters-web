import type { NextApiRequest, NextApiResponse } from 'next'

import { requestMattersGraphQL } from '~/server/personhood/mattersGraphql'
import { assertTwFidoEnabled } from '~/server/personhood/twFido'

type LinkVerifyBody = {
  cert_chain_proof?: unknown
  cert_chain_type?: unknown
  certChainProof?: unknown
  certChainType?: unknown
  handoff_token?: unknown
  handoffToken?: unknown
  user_sig_proof?: unknown
  userSigProof?: unknown
}

type LinkVerifyResponse =
  | Record<string, unknown>
  | {
      error: string
    }

type ClaimPersonhoodBadgeData = {
  claimPersonhoodBadge: {
    id: string
    info: {
      badges: Array<{ type: string }>
    }
  }
}

const CLAIM_PERSONHOOD_BADGE = [
  'mutation ClaimPersonhoodBadge($input: ClaimPersonhoodBadgeInput!) {',
  `
    claimPersonhoodBadge(input: $input) {
      id
      info {
        badges {
          type
        }
      }
    }
  `,
  '}',
].join('\n')

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LinkVerifyResponse>
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
    const handoffToken = getString(body.handoffToken, body.handoff_token)
    const certChainProof = getString(body.certChainProof, body.cert_chain_proof)
    const userSigProof = getString(body.userSigProof, body.user_sig_proof)
    if (
      typeof handoffToken !== 'string' ||
      typeof certChainProof !== 'string' ||
      typeof userSigProof !== 'string'
    ) {
      res.status(400).json({ error: 'missing_claim_payload' })
      return
    }

    const certChainType =
      getString(body.certChainType, body.cert_chain_type) || 'rs4096'

    const data = await requestMattersGraphQL<ClaimPersonhoodBadgeData>({
      query: CLAIM_PERSONHOOD_BADGE,
      variables: {
        input: {
          certChainProof,
          certChainType,
          handoffToken,
          userSigProof,
        },
      },
    })

    res.status(200).json({
      status: 'claimed',
      user: data.claimPersonhoodBadge,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error'
    res
      .status(message === 'personhood_tw_fido_disabled' ? 404 : 500)
      .json({ error: message })
  }
}

export default handler

const parseBody = (body: unknown): LinkVerifyBody => {
  if (typeof body === 'string') {
    return JSON.parse(body) as LinkVerifyBody
  }
  return (body || {}) as LinkVerifyBody
}

const getString = (...values: unknown[]) =>
  values.find((value): value is string => typeof value === 'string')

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
