import '@testing-library/jest-dom'

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe(target) {
    this.callback([{ isIntersecting: true, target }], this)
  }

  unobserve() {}

  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver
