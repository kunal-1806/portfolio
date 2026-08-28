import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the hero name', async () => {
    render(<App />)
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kunal Tyagi'),
    )
  })

  it('View Resume opens the resume modal and Close dismisses it', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /view resume/i }))
    expect(screen.getByRole('dialog', { name: /Kunal Tyagi — Resume/i })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /close viewer/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
