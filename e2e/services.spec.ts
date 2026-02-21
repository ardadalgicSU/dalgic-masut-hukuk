import { test, expect } from "@playwright/test";

test.describe("Hizmetler Sayfası", () => {
  test("hizmetler sayfası yüklenir", async ({ page }) => {
    await page.goto("/hizmetler");
    await expect(page).toHaveTitle(/Hizmetlerimiz/);
    await expect(page.getByRole("heading", { name: /hizmetlerimiz/i })).toBeVisible();
  });

  test("en az bir hizmet kartı görünür", async ({ page }) => {
    await page.goto("/hizmetler");
    // Hizmet listesi ya da linkler mevcutsa test geçer
    await expect(page.locator("a[href^='/hizmetler/']").first()).toBeVisible();
  });

  test("hizmet detay sayfasına gidilebilir", async ({ page }) => {
    await page.goto("/hizmetler");
    const firstServiceLink = page.locator("a[href^='/hizmetler/']").first();
    const href = await firstServiceLink.getAttribute("href");

    if (href) {
      await page.goto(href);
      await expect(page.getByRole("heading").first()).toBeVisible();
    }
  });
});

test.describe("sitemap ve robots", () => {
  test("sitemap.xml erişilebilir", async ({ page }) => {
    const response = await page.request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("dalgicmasut.av.tr");
  });

  test("robots.txt erişilebilir", async ({ page }) => {
    const response = await page.request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("User-agent");
    expect(body).toContain("Sitemap");
  });
});
