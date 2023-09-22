import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly usernameInput: Locator

    constructor(page: Page) {
        //super(page)
        this.page = page
        this.usernameInput = page.getByPlaceholder('Login')
        this.passwordInput = page.getByPlaceholder('Password')
        this.submitButton = page.getByRole('button', { name: 'Login' })
    }
    
    async login(username: string, password: string) {
      await this.usernameInput.fill(username)
      await this.passwordInput.fill(password)
      await this.submitButton.click()
}
}