import { test, expect } from "@playwright/test";

test.describe("Ana Sayfa", () => {
  test("sayfa başarıyla yüklenir", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Dalgıç-Masüt/);
  });

  test("header render edilir", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Dalgıç-Masüt")).toBeVisible();
  });

  test("navigasyon linkleri görünür", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /hizmetler/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /hakkımızda/i }).first()).toBeVisible();
  });

  test("CTA butonu görünür", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Randevu Oluşturun").first()).toBeVisible();
  });

  test("footer render edilir", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByText(/Dalgıç-Masüt Hukuk Bürosu/i).first()).toBeVisible();
  });
});
