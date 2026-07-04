import type { NextApiRequest, NextApiResponse } from 'next'

import {
  assertTwFidoEnabled,
  decodeSpTicket,
  getSignResult,
  getTwFidoConfig,
  isPendingSignResult,
} from '~/server/personhood/twFido'

type ResultBody = {
  appId?: unknown
  challenge?: unknown
  challengeExpiresAt?: unknown
  spTicket?: unknown
}

type ResultResponse =
  | {
      cert?: string
      certSize: number
      proofInput?: {
        appId: string
        cert: string
        challenge: string
        challengeExpiresAt?: string
        signedResponse: string
      }
      signedResponse?: string
      signedResponseSize: number
      status: 'signed'
    }
  | {
      errorCode: string
      message?: string
      status: 'pending'
    }
  | {
      error: string
    }

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResultResponse>
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
    if (typeof body.spTicket !== 'string') {
      res.status(400).json({ error: 'missing_sp_ticket' })
      return
    }

    const config = getTwFidoConfig()
    const ticketPayload = decodeSpTicket(body.spTicket)
    const result = await getSignResult({ config, ticketPayload })

    if (result.error_code !== '0') {
      if (isPendingSignResult(result.error_code)) {
        res.status(200).json({
          errorCode: result.error_code,
          message: result.error_message,
          status: 'pending',
        })
        return
      }

      res.status(502).json({
        error: `getAthOrSignResult failed: ${result.error_code} ${
          result.error_message || ''
        }`.trim(),
      })
      return
    }

    const cert = result.result?.cert
    const signedResponse = result.result?.signed_response
    if (!cert || !signedResponse) {
      res.status(502).json({ error: 'missing_sign_result_payload' })
      return
    }

    res.status(200).json({
      cert: config.returnProofInput ? cert : undefined,
      certSize: Buffer.byteLength(cert, 'base64'),
      proofInput: config.returnProofInput
        ? createProofInput({
            appId: body.appId,
            cert,
            challenge: body.challenge,
            challengeExpiresAt: body.challengeExpiresAt,
            signedResponse,
          })
        : undefined,
      signedResponse: config.returnProofInput ? signedResponse : undefined,
      signedResponseSize: Buffer.byteLength(signedResponse, 'base64'),
      status: 'signed',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error'
    res
      .status(message === 'personhood_tw_fido_disabled' ? 404 : 500)
      .json({ error: message })
  }
}

export default handler

const parseBody = (body: unknown): ResultBody => {
  if (typeof body === 'string') {
    return JSON.parse(body) as ResultBody
  }
  return (body || {}) as ResultBody
}

const createProofInput = ({
  appId,
  cert,
  challenge,
  challengeExpiresAt,
  signedResponse,
}: {
  appId: unknown
  cert: string
  challenge: unknown
  challengeExpiresAt: unknown
  signedResponse: string
}) => {
  if (
    typeof appId !== 'string' ||
    typeof challenge !== 'string' ||
    !appId ||
    !challenge
  ) {
    return undefined
  }

  return {
    appId,
    cert,
    challenge,
    challengeExpiresAt:
      typeof challengeExpiresAt === 'string' ? challengeExpiresAt : undefined,
    signedResponse,
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
