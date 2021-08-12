import * as chalk from 'chalk';
import { Page } from 'playwright';
import { waits } from '../helpers/waits';
import { allureInterfaceStep } from '../pageConditions';

const {ALLURE} = process.env;

export class BaseElement {
  page;
  selector;
  currentElement;
  id;
  constructor(page, selector, elementName?) {
    this.page = page;
    this.selector = selector
    this.currentElement = null
    this.id = elementName
  }

  _replacePage(page) {
    this.page = page
    this.currentElement = null
  }

  async initThisElement() {
    await waits(this.page).waitVisibility(this.selector);

    if (this.currentElement) {
      return this.currentElement;
    }

    const el = await this.page.$(this.selector);
    this.currentElement = el;
    return this.currentElement
  }
}

export function $element(page: Page, selector, elementName?): BaseElement {
  const baseEl = new BaseElement(page, selector, elementName);
  return new Proxy(baseEl, {
    get(_t, value) {

      if (value === '_replacePage') {
        return (page) => baseEl._replacePage(page)
      }

      return (...args) => baseEl.initThisElement().then((curEl) => {
        if (!baseEl.id) {
          baseEl.id = `BaseElement`
        }

        let message = `\t ${baseEl.id} execute ${value as string} `

        if (args.length) {
          message = `${message} with arguments ${JSON.stringify(args)}`
        }

        if (ALLURE) {
          return allureInterfaceStep(message, curEl[value].bind(curEl, ...args))
        }
        console.log(chalk.green(message))
        return curEl[value].call(curEl, ...args)
      })
    }
  })
}
