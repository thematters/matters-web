type GraphQLResponse<T> = {
  data?: T
  errors?: Array<{ message?: string }>
}

export const requestMattersGraphQL = async <T>({
  cookie,
  query,
  variables,
}: {
  cookie?: string
  query: string
  variables?: Record<string, unknown>
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('matters_api_missing_config')
  }

  const response = await fetch(apiUrl, {
    body: JSON.stringify({ query, variables }),
    headers: {
      ...(cookie ? { cookie } : null),
      'content-type': 'application/json',
    },
    method: 'POST',
  })
  const body = (await response.json()) as GraphQLResponse<T>

  if (!response.ok || body.errors?.length) {
    throw new Error(
      body.errors?.[0]?.message || `matters_api_error_${response.status}`
    )
  }

  if (!body.data) {
    throw new Error('matters_api_empty_response')
  }

  return body.data
}
