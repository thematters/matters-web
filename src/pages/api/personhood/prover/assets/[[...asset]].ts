import type { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import type { ReadableStream as NodeReadableStream } from 'stream/web'
import { gunzipSync } from 'zlib'

type ProverAsset = {
  contentType: string
  patch?: (body: Buffer) => Buffer
  url: string
  gzip?: boolean
  passthrough?: boolean
}

const ZKID_RELEASE = 'https://github.com/zkmopro/zkID/releases/download/latest'

const ASSETS: Record<string, ProverAsset> = {
  'spartan2_wasm.js': {
    contentType: 'application/javascript; charset=utf-8',
    gzip: true,
    patch: patchSpartan2WasmJs,
    url: `${ZKID_RELEASE}/spartan2_wasm.js.gz`,
  },
  'spartan2_wasm_bg.wasm': {
    contentType: 'application/wasm',
    gzip: true,
    url: `${ZKID_RELEASE}/spartan2_wasm_bg.wasm.gz`,
  },
  'moica-g3.cer': {
    contentType: 'application/pkix-cert',
    url: 'https://moica.nat.gov.tw/repository/Certs/MOICA-G3.cer',
  },
  'witness_calculator.js': {
    contentType: 'application/javascript; charset=utf-8',
    gzip: true,
    url: `${ZKID_RELEASE}/witness_calculator.js.gz`,
  },
  'cert_chain_rs4096_proving.key.gz': {
    contentType: 'application/gzip',
    passthrough: true,
    url: `${ZKID_RELEASE}/cert_chain_rs4096_proving.key.gz`,
  },
  'user_sig_rs2048_proving.key.gz': {
    contentType: 'application/gzip',
    passthrough: true,
    url: `${ZKID_RELEASE}/user_sig_rs2048_proving.key.gz`,
  },
  'certChainRS4096.wasm.gz': {
    contentType: 'application/gzip',
    passthrough: true,
    url: `${ZKID_RELEASE}/certChainRS4096.wasm.gz`,
  },
  'userSigRS2048.wasm.gz': {
    contentType: 'application/gzip',
    passthrough: true,
    url: `${ZKID_RELEASE}/userSigRS2048.wasm.gz`,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = Array.isArray(req.query.asset)
    ? req.query.asset.join('/')
    : req.query.asset

  if (!path) {
    sendJs(res, 'export * from "./spartan2_wasm.js";\n')
    return
  }

  const asset = ASSETS[path]
  if (!asset) {
    res.status(404).json({ error: 'asset_not_found' })
    return
  }

  try {
    const upstream = await fetch(asset.url, {
      headers: { Accept: '*/*' },
    })

    if (!upstream.ok) {
      res.status(upstream.status).json({
        error: 'asset_fetch_failed',
        status: upstream.status,
        statusText: upstream.statusText,
      })
      return
    }

    if (asset.passthrough) {
      sendAssetHeaders(res, asset.contentType, upstream.headers)
      res.status(200)
      if (req.method === 'HEAD') {
        res.end()
        return
      }
      if (!upstream.body) {
        res.end()
        return
      }
      Readable.fromWeb(upstream.body as unknown as NodeReadableStream).pipe(res)
      return
    }

    const raw = Buffer.from(await upstream.arrayBuffer())
    const source = asset.passthrough ? raw : asset.gzip ? gunzipSync(raw) : raw
    const body = asset.patch ? asset.patch(source) : source

    sendAssetHeaders(res, asset.contentType, upstream.headers)
    res.status(200).send(body)
  } catch (error) {
    res.status(502).json({
      error: 'asset_proxy_failed',
      message: error instanceof Error ? error.message : String(error),
    })
  }
}

export default handler

function sendJs(res: NextApiResponse, source: string) {
  sendAssetHeaders(res, 'application/javascript; charset=utf-8')
  res.status(200).send(source)
}

function sendAssetHeaders(
  res: NextApiResponse,
  contentType: string,
  upstreamHeaders?: Headers
) {
  const contentLength = upstreamHeaders?.get('content-length')
  if (contentLength) {
    res.setHeader('Content-Length', contentLength)
  }
  res.setHeader('Content-Type', contentType)
  res.setHeader('Cache-Control', 'public, max-age=14400, immutable')
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
  res.setHeader('X-Content-Type-Options', 'nosniff')
}

function patchSpartan2WasmJs(body: Buffer) {
  const source = body.toString('utf8')
  return Buffer.from(
    source.replace(
      "import { startWorkers } from './snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.js';",
      [
        'async function startWorkers() {',
        "  throw new Error('Threaded proving is disabled in the Matters browser preflight build.');",
        '}',
      ].join('\n')
    ),
    'utf8'
  )
}
