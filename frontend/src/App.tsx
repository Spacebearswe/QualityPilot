import { useEffect, useState, type FormEvent } from 'react'
import {
  Alert, AppBar, Box, Button, CircularProgress, Container, CssBaseline, Paper,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Toolbar, Typography,
} from '@mui/material'
import { productsApi, type Product, type ProductDetails } from './api'

type Editor = { mode: 'create' } | { mode: 'edit'; id: number }
type TextFieldKey = 'name' | 'description' | 'manufacturer' | 'designation'

function newProduct(): ProductDetails {
  return { name: '', description: '', manufacturer: '', designation: '', applicationDate: new Date().toISOString() }
}

function localDateTime(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (part: number) => String(part).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'An unexpected error occurred.'
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [editor, setEditor] = useState<Editor | null>(null)
  const [form, setForm] = useState<ProductDetails>(newProduct)
  const [dateInput, setDateInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true
    productsApi.list()
      .then((items) => { if (active) setProducts(items) })
      .catch((reason: unknown) => {
        if (active) {
          setLoadFailed(true)
          setError(errorMessage(reason))
        }
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [loadAttempt])

  const openCreate = () => {
    const details = newProduct()
    setForm(details)
    setDateInput(localDateTime(details.applicationDate))
    setEditor({ mode: 'create' })
    setError(null)
  }

  const openEdit = (product: Product) => {
    const { id, ...details } = product
    setForm(details)
    setDateInput(localDateTime(details.applicationDate))
    setEditor({ mode: 'edit', id })
    setError(null)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editor || saving) return
    if (![form.name, form.description, form.manufacturer, form.designation].every((value) => value.trim())) {
      setError('Name, description, manufacturer, and designation are required.')
      return
    }
    if (!dateInput || Number.isNaN(new Date(dateInput).getTime())) {
      setError('Please enter a valid application date.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (editor.mode === 'create') {
        const product = await productsApi.create(form)
        setProducts((current) => [...current, product])
      } else {
        await productsApi.update(editor.id, form)
        setProducts((current) => current.map((product) => product.id === editor.id ? { id: editor.id, ...form } : product))
      }
      setEditor(null)
    } catch (reason: unknown) {
      setError(errorMessage(reason))
    } finally {
      setSaving(false)
    }
  }

  const remove = async (product: Product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return
    setSaving(true)
    setError(null)
    try {
      await productsApi.remove(product.id)
      setProducts((current) => current.filter((item) => item.id !== product.id))
      if (editor?.mode === 'edit' && editor.id === product.id) setEditor(null)
    } catch (reason: unknown) {
      setError(errorMessage(reason))
    } finally {
      setSaving(false)
    }
  }

  const field = (key: TextFieldKey, label: string) => (
    <TextField
      label={label}
      value={form[key]}
      onChange={(event) => setForm({ ...form, [key]: event.target.value })}
      required
      fullWidth
      disabled={saving}
      multiline={key === 'description'}
      minRows={key === 'description' ? 3 : undefined}
      slotProps={key === 'name' ? { htmlInput: { maxLength: 200 } } : undefined}
    />
  )

  return (
    <>
      <CssBaseline />
      <AppBar position="static"><Toolbar><Typography variant="h6">QualityPilot</Typography></Toolbar></AppBar>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">Products</Typography>
          <Button variant="contained" onClick={openCreate} disabled={loading || loadFailed || saving}>Create product</Button>
        </Stack>
        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-start' }}>
          <Paper variant="outlined" sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            {loading ? <Box sx={{ p: 3 }}><CircularProgress aria-label="Loading products" /></Box> : loadFailed ? (
              <Box sx={{ p: 3 }}>
                <Typography>Products could not be loaded.</Typography>
                <Button onClick={() => { setError(null); setLoadFailed(false); setLoading(true); setLoadAttempt((attempt) => attempt + 1) }}>Retry</Button>
              </Box>
            ) : (
              <TableContainer>
                <Table aria-label="Products">
                  <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Manufacturer</TableCell><TableCell>Designation</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
                  <TableBody>
                    {products.length === 0 ? (
                      <TableRow><TableCell colSpan={4}>No products found.</TableCell></TableRow>
                    ) : products.map((product) => (
                      <TableRow key={product.id} selected={editor?.mode === 'edit' && editor.id === product.id}>
                        <TableCell>{product.name}</TableCell><TableCell>{product.manufacturer}</TableCell><TableCell>{product.designation}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                            <Button size="small" onClick={() => openEdit(product)} disabled={saving} aria-label={`Edit ${product.name}`}>Edit</Button>
                            <Button size="small" color="error" onClick={() => remove(product)} disabled={saving} aria-label={`Delete ${product.name}`}>Delete</Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
          {editor && (
            <Paper component="section" variant="outlined" sx={{ p: 3, width: { xs: '100%', md: 400 }, flexShrink: 0 }}>
              <Typography component="h2" variant="h6" sx={{ mb: 2 }}>{editor.mode === 'create' ? 'Create product' : 'Edit product'}</Typography>
              <Box component="form" onSubmit={submit}>
                <Stack spacing={2}>
                  {field('name', 'Name')}
                  {field('description', 'Description')}
                  {field('manufacturer', 'Manufacturer')}
                  {field('designation', 'Designation')}
                  <TextField
                    label="Application date and time"
                    type="datetime-local"
                    value={dateInput}
                    onChange={(event) => {
                      const value = event.target.value
                      setDateInput(value)
                      const date = new Date(value)
                      if (value && !Number.isNaN(date.getTime())) setForm({ ...form, applicationDate: date.toISOString() })
                    }}
                    required
                    disabled={saving}
                    slotProps={{ inputLabel: { shrink: true }, htmlInput: { step: 1 } }}
                  />
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                    <Button onClick={() => setEditor(null)} disabled={saving}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          )}
        </Box>
      </Container>
    </>
  )
}