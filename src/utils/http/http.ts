// http.ts

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpError extends Error {
  status: number;
  body?: unknown;
}

async function parseError(res: Response): Promise<HttpError> {
  let body: unknown;

  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }

  const error: HttpError = new Error(
    typeof body === 'string' ? body : `HTTP ${res.status}`
  ) as HttpError;

  error.status = res.status;
  error.body = body;

  return error;
}

export async function http<T>(
  url: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
    headers?: HeadersInit;
    fetchOptions?: Omit<RequestInit, 'method' | 'body' | 'headers'>;
  } = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers,
    fetchOptions,
  } = options;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
    ...fetchOptions,
  });

  if (!res.ok) {
    throw await parseError(res);
  }

  // 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}