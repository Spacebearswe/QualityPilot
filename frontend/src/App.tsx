import { useEffect, useState, type FormEvent } from 'react'
import { productsApi, type Product, type ProductDetails } from './api'

const emptyForm: ProductDetails = {
  name: '',
  description: '',
  manufacturer: '',
  designation: '',
  applicationDate: new Date().toISOString(),
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductDetails>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  const load = () =>
    productsApi.list().then(setProducts).catch((e: Error) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await productsApi.create({ ...form, applicationDate: new Date().toISOString() })
      setForm(emptyForm)
      setError(null)
      await load()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const remove = async (id: number) => {
    try {
      await productsApi.remove(id)
      await load()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const field = (key: 'name' | 'description' | 'manufacturer' | 'designation') => (
    <input
      placeholder={key}
      value={form[key]}
      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      required
    />
  )

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>QualityPilot – Products</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <form onSubmit={submit} style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
        {field('name')}
        {field('description')}
        {field('manufacturer')}
        {field('designation')}
        <button type="submit">Add product</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.manufacturer} ({p.designation}){' '}
            <button onClick={() => remove(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  )
}