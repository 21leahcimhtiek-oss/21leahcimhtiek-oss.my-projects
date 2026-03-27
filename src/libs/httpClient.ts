import { logger } from './logger';

export async function httpGet<T>(url: string, headers?: Record<string, string>): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    logger.error('httpGet failed', { url, status: res.status });
    throw new Error(`HTTP ${res.status} — ${url}`);
  }
  return res.json() as Promise<T>;
}

export async function httpPost<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    logger.error('httpPost failed', { url, status: res.status });
    throw new Error(`HTTP ${res.status} — ${url}`);
  }
  return res.json() as Promise<T>;
}