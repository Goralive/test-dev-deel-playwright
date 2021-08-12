export function waits(page) {
  return {
    waitVisibility: (selector) => page.waitForSelector(selector, {state: 'attached', timeout: 15000})
  }
}
