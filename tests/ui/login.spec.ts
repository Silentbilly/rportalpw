import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe.parallel('Login and logout flow @login', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await page.goto('http://localhost:8080/')
  })

  test('Login and logout - positive scenario', async ({ page }) => {
    await loginPage.login('default', '1q2w3e')

    await expect(page).toHaveURL('http://localhost:8080/ui/#default_personal/dashboard')
  })
})