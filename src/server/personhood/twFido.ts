import crypto from 'node:crypto'

const DEFAULT_API_BASE_URL = 'https://fidoapi.moi.gov.tw'
const DEFAULT_APP_ID = 'e775f2805fb993e05a208dbff15d1c1'
const DEFAULT_HINT = '待簽署資料'
const DEFAULT_SIGN_TYPE = 'PKCS#1'
const DEFAULT_TIME_LIMIT = '600'

const PENDING_RESULT_CODES = new Set([
  '20002',
  '20003',
  'SP-API-ATH-02-SPTKTID_TXNLOG_NF',
  'SPTKTID_TXNLOG_NF',
])

export type TwFidoTicketPayload = {
  transaction_id: string
  sp_ticket_id: string
  expiration_time?: string
  sp_name?: string
}

export type TwFidoSignResult = {
  error_code: string
  error_message?: string
  result?: {
    cert?: string
    hashed_id_num?: string
    idp_checksum?: string
    signed_response?: string
  }
}

type TwFidoTicketResponse = {
  error_code: string
  error_message?: string
  result?: {
    sp_ticket?: string
  }
}

export type PersonhoodChallenge = {
  appId: string
  challenge: string
  expiresAt?: string
}

type ChallengeResponse = {
  app_id?: string
  challenge?: string
  expires_at?: string
}

export type TwFidoConfig = {
  aesKeyBase64: string
  apiBaseUrl: string
  appId: string
  hint: string
  returnProofInput: boolean
  serviceId: string
  signType: 'PKCS#1' | 'PKCS#7' | 'RAW'
  timeLimit: string
  verifierUrl?: string
}

export const normalizeTwFidoIdNum = (idNum: unknown) => {
  if (typeof idNum !== 'string') {
    return null
  }

  const normalized = idNum.trim().toUpperCase()
  if (!/^[A-Z][0-9A-Z]{9}$/.test(normalized)) {
    return null
  }

  return normalized
}

export const getTwFidoConfig = (): TwFidoConfig => {
  const serviceId =
    process.env.PERSONHOOD_FIDO_SP_SERVICE_ID || process.env.FIDO_SP_SERVICE_ID
  const aesKeyBase64 =
    process.env.PERSONHOOD_FIDO_AES_KEY_BASE64 ||
    process.env.FIDO_AES_KEY_BASE64 ||
    process.env.FIDO_AES_KEY

  if (!serviceId || !aesKeyBase64) {
    throw new Error('personhood_tw_fido_missing_config')
  }

  const appId = process.env.PERSONHOOD_APP_ID || DEFAULT_APP_ID
  if (Buffer.byteLength(appId, 'utf8') !== 31) {
    throw new Error('personhood_tw_fido_invalid_app_id')
  }

  const signType = process.env.PERSONHOOD_FIDO_SIGN_TYPE || DEFAULT_SIGN_TYPE
  if (signType !== 'PKCS#1' && signType !== 'PKCS#7' && signType !== 'RAW') {
    throw new Error('personhood_tw_fido_invalid_sign_type')
  }

  const apiBaseUrl =
    process.env.PERSONHOOD_FIDO_API_BASE_URL || DEFAULT_API_BASE_URL
  const verifierUrl =
    process.env.PERSONHOOD_VERIFIER_URL ||
    process.env.NEXT_PUBLIC_PERSONHOOD_VERIFIER_URL

  return {
    aesKeyBase64,
    apiBaseUrl: apiBaseUrl.replace(/\/$/, ''),
    appId,
    hint: process.env.PERSONHOOD_FIDO_HINT || DEFAULT_HINT,
    returnProofInput:
      process.env.PERSONHOOD_TW_FIDO_RETURN_PROOF_INPUT === 'true',
    serviceId,
    signType,
    timeLimit: process.env.PERSONHOOD_FIDO_TIME_LIMIT || DEFAULT_TIME_LIMIT,
    verifierUrl: verifierUrl ? verifierUrl.replace(/\/$/, '') : undefined,
  }
}

export const assertTwFidoEnabled = () => {
  if (process.env.PERSONHOOD_TW_FIDO_ENABLED !== 'true') {
    throw new Error('personhood_tw_fido_disabled')
  }
}

export const buildSignData = (appId: string) =>
  Buffer.from(appId, 'utf8').toString('base64')

export const createPersonhoodChallenge = async (
  config: TwFidoConfig
): Promise<PersonhoodChallenge> => {
  if (!config.verifierUrl) {
    return {
      appId: config.appId,
      challenge: '',
    }
  }

  const json = await postJson<ChallengeResponse>(
    `${config.verifierUrl}/challenge`,
    {}
  )

  if (!json.app_id || !json.challenge) {
    throw new Error('personhood_verifier_invalid_challenge')
  }

  if (Buffer.byteLength(json.app_id, 'utf8') !== 31) {
    throw new Error('personhood_verifier_invalid_app_id')
  }

  return {
    appId: json.app_id,
    challenge: json.challenge,
    expiresAt: json.expires_at,
  }
}

export const decodeSpTicket = (spTicket: string): TwFidoTicketPayload => {
  const separator = spTicket.lastIndexOf('.')
  if (separator < 0) {
    throw new Error('personhood_tw_fido_invalid_sp_ticket')
  }

  const payload = JSON.parse(
    Buffer.from(spTicket.slice(0, separator), 'base64url').toString('utf8')
  ) as Partial<TwFidoTicketPayload>

  if (!payload.transaction_id || !payload.sp_ticket_id) {
    throw new Error('personhood_tw_fido_invalid_sp_ticket_payload')
  }

  return {
    expiration_time: payload.expiration_time,
    sp_name: payload.sp_name,
    sp_ticket_id: payload.sp_ticket_id,
    transaction_id: payload.transaction_id,
  }
}

export const buildTwFidoDeeplink = ({
  returnUrl,
  returnValue,
  spTicket,
}: {
  returnUrl: string
  returnValue?: string
  spTicket: string
}) => {
  const deeplink = new URL('mobilemoica://moica.moi.gov.tw/a2a/verifySign')
  deeplink.searchParams.set('sp_ticket', spTicket)
  deeplink.searchParams.set(
    'rtn_url',
    Buffer.from(returnUrl, 'utf8').toString('base64url')
  )
  deeplink.searchParams.set(
    'rtn_val',
    Buffer.from(returnValue || '', 'utf8').toString('base64url')
  )
  return deeplink.toString()
}

export const createSpTicket = async ({
  appId,
  config,
  idNum,
}: {
  appId?: string
  config: TwFidoConfig
  idNum: string
}) => {
  const transactionId = crypto.randomUUID()
  const signAppId = appId || config.appId
  const signData = buildSignData(signAppId)
  const checksumPayload = [
    transactionId,
    config.serviceId,
    idNum,
    'SIGN',
    'APP2APP',
    config.hint,
    signData,
  ].join('')

  const body = {
    hint: config.hint,
    id_num: idNum,
    op_code: 'SIGN',
    op_mode: 'APP2APP',
    sign_info: {
      hash_algorithm: 'SHA256',
      sign_data: signData,
      sign_type: config.signType,
      tbs_encoding: 'base64',
    },
    sp_checksum: computeSpChecksum(checksumPayload, config.aesKeyBase64),
    sp_service_id: config.serviceId,
    time_limit: config.timeLimit,
    transaction_id: transactionId,
  }

  const json = await postJson<TwFidoTicketResponse>(
    `${config.apiBaseUrl}/moise/sp/getSpTicket`,
    body
  )
  if (json.error_code !== '0') {
    throw new Error(
      `getSpTicket failed: ${json.error_code} ${
        json.error_message || ''
      }`.trim()
    )
  }

  const spTicket = json.result?.sp_ticket
  if (!spTicket || typeof spTicket !== 'string') {
    throw new Error('personhood_tw_fido_missing_sp_ticket')
  }

  return {
    spTicket,
    ticketPayload: decodeSpTicket(spTicket),
  }
}

export const getSignResult = async ({
  config,
  ticketPayload,
}: {
  config: TwFidoConfig
  ticketPayload: TwFidoTicketPayload
}) => {
  const checksumPayload = [
    ticketPayload.transaction_id,
    config.serviceId,
    ticketPayload.sp_ticket_id,
  ].join('')

  return postJson<TwFidoSignResult>(
    `${config.apiBaseUrl}/moise/sp/getAthOrSignResult`,
    {
      sp_checksum: computeSpChecksum(checksumPayload, config.aesKeyBase64),
      sp_service_id: config.serviceId,
      sp_ticket_id: ticketPayload.sp_ticket_id,
      transaction_id: ticketPayload.transaction_id,
    }
  )
}

export const isPendingSignResult = (errorCode: string) =>
  PENDING_RESULT_CODES.has(errorCode)

const normalizeAesKey = (base64: string) => {
  const key = Buffer.from(base64, 'base64')
  if (key.length !== 32) {
    throw new Error('personhood_tw_fido_invalid_aes_key')
  }
  return key
}

const computeSpChecksum = (payload: string, aesKeyBase64: string) => {
  const key = normalizeAesKey(aesKeyBase64)
  const sha256Hex = crypto
    .createHash('sha256')
    .update(payload, 'utf8')
    .digest('hex')
  const iv = Buffer.alloc(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, {
    authTagLength: 16,
  })
  const ciphertext = Buffer.concat([
    cipher.update(Buffer.from(sha256Hex, 'utf8')),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()

  return Buffer.concat([iv, ciphertext, tag]).toString('hex')
}

const postJson = async <T>(url: string, body: object): Promise<T> => {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    method: 'POST',
  })
  const text = await response.text()

  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`tw_fido_invalid_json_response_${response.status}`)
  }

  if (!response.ok) {
    throw new Error(`tw_fido_http_${response.status}`)
  }
  return json as T
}
