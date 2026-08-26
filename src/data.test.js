import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { CERTIFICATES, RESUME } from './data'

const publicDir = path.join(process.cwd(), 'public')

describe('asset integrity', () => {
  it.each(CERTIFICATES.map((c) => [c.title, c.src]))('%s file exists on disk', (_title, src) => {
    expect(fs.existsSync(path.join(publicDir, src))).toBe(true)
  })

  it('resume view file exists (/resume.pdf)', () => {
    expect(fs.existsSync(path.join(publicDir, RESUME.viewSrc))).toBe(true)
  })

  it('resume download file exists (/cv-pel134.pdf)', () => {
    expect(fs.existsSync(path.join(publicDir, RESUME.downloadHref))).toBe(true)
  })
})
