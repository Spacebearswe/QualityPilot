export interface Product {
  id: number
  name: string
  description: string
  manufacturer: string
  designation: string
  applicationDate: string
}

export type ProductDetails = Omit<Product, 'id'>

const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? ''

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  // const response = await fetch(`/api${path}`, {
  const response = await fetch(`${apiOrigin}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? `Request failed (${response.status})`)
  }
  return response.status === 204 ? (undefined as T) : response.json()
}

export const productsApi = {
  list: () => request<Product[]>('/products'),
  create: (details: ProductDetails) =>
    request<Product>('/products', { method: 'POST', body: JSON.stringify(details) }),
  update: (id: number, details: ProductDetails) =>
    request<void>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(details) }),
  remove: (id: number) => request<void>(`/products/${id}`, { method: 'DELETE' }),
}
