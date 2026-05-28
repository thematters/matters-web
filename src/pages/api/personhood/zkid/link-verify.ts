import type { NextApiRequest, NextApiResponse } from 'next'

import { assertTwFidoEnabled } from '~/server/personhood/twFido'

type LinkVerifyBody = {
  certChainProof?: unknown
  certChainType?: unknown
  userSigProof?: unknown
}

type LinkVerifyResponse =
  | Record<string, unknown>
  | {
      error: string
    }

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

    const verifierUrl =
      process.env.PERSONHOOD_VERIFIER_URL ||
      process.env.NEXT_PUBLIC_PERSONHOOD_VERIFIER_URL
    if (!verifierUrl) {
      res.status(500).json({ error: 'personhood_verifier_missing_config' })
      return
    }

    const body = parseBody(req.body)
    if (
      typeof body.certChainProof !== 'string' ||
      typeof body.userSigProof !== 'string'
    ) {
      res.status(400).json({ error: 'missing_proofs' })
      return
    }

    const certChainType =
      typeof body.certChainType === 'string' ? body.certChainType : 'rs4096'

    const upstream = await fetch(
      `${verifierUrl.replace(/\/$/, '')}/link-verify`,
      {
        body: JSON.stringify({
          cert_chain_proof: body.certChainProof,
          cert_chain_type: certChainType,
          user_sig_proof: body.userSigProof,
        }),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      }
    )
    const text = await upstream.text()

    try {
      res.status(upstream.status).json(JSON.parse(text))
    } catch {
      res.status(upstream.status).json({ error: text || 'invalid_response' })
    }
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
