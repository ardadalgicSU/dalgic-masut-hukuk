import { test, expect } from "@playwright/test";

test.describe("İletişim Sayfası", () => {
  test("iletişim sayfası yüklenir", async ({ page }) => {
    await page.goto("/iletisim");
    await expect(page).toHaveTitle(/İletişim/);
    await expect(page.getByRole("heading", { name: /bize ulaşın/i })).toBeVisible();
  });

  test("form alanları görünür", async ({ page }) => {
    await page.goto("/iletisim");
    await expect(page.getByLabel(/ad soyad/i)).toBeVisible();
    await expect(page.getByLabel(/e-posta/i)).toBeVisible();
    await expect(page.getByLabel(/mesaj/i)).toBeVisible();
  });

  test("boş form gönderilince validasyon hatası görünür", async ({ page }) => {
    await page.goto("/iletisim");
    await page.getByRole("button", { name: /gönder/i }).click();
    // Validation hatalarından en az biri görünmeli
    await expect(page.locator("p.text-red-600, p[class*='text-red']").first()).toBeVisible();
  });

  test("geçersiz email validasyon hatası gösterir", async ({ page }) => {
    await page.goto("/iletisim");
    await page.getByLabel(/ad soyad/i).fill("Test Kullanıcı");
    await page.getByLabel(/e-posta/i).fill("gecersiz-email");
    await page.getByLabel(/mesaj/i).fill("Test mesajı içeriği burada.");
    await page.getByRole("button", { name: /gönder/i }).click();

    await expect(page.getByText(/e-posta/i)).toBeVisible();
  });
});
