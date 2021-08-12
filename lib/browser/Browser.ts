import { chromium, Page } from 'playwright';
import { Enviroments } from '../../test-data/enviroment';

export class Browser {
    page;
    browser;

    constructor() {
        //
    }

    async init(): Promise<Page> {
        this.browser = await chromium.launch({ headless: false });
        const context = await this.browser.newContext();
        this.page = await context.newPage();

        await this.page.goto(Enviroments.deel.dev);
        await this.page.on('load', () => {
            console.log('Loaded');
        });
        return this.page;
    }

    async get(url: string) {
        await this.page.goto(url);
    }

    async close() {
        await this.browser.close();
    }
}
