import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PdfModal from './PdfModal'

describe('PdfModal', () => {
  it('renders an iframe with the given src and title', () => {
    render(<PdfModal src="/resume.pdf" title="Resume" onClose={() => {}} />)
    expect(screen.getByTitle('Resume')).toHaveAttribute('src', '/resume.pdf#view=FitH')
  })

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn()
    render(<PdfModal src="/x.pdf" title="X" onClose={onClose} />)
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the Close button is clicked', async () => {
    const onClose = vi.fn()
    render(<PdfModal src="/x.pdf" title="X" onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks body scroll while open and restores it after unmount', () => {
    const { unmount } = render(<PdfModal src="/x.pdf" title="X" onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })
})
