import type { NextApiRequest, NextApiResponse } from 'next'
import { gunzipSync } from 'zlib'

type ProverAsset = {
  contentType: string
  patch?: (body: Buffer) => Buffer
  url: string
  gzip?: boolean
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

    const raw = Buffer.from(await upstream.arrayBuffer())
    const body = asset.patch
      ? asset.patch(asset.gzip ? gunzipSync(raw) : raw)
      : asset.gzip
        ? gunzipSync(raw)
        : raw

    res.setHeader('Content-Type', asset.contentType)
    res.setHeader('Cache-Control', 'public, max-age=3600, immutable')
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
    res.setHeader('X-Content-Type-Options', 'nosniff')
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
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, immutable')
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.status(200).send(source)
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
