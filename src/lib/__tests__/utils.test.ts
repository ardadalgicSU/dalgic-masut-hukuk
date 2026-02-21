import { describe, it, expect } from "vitest";
import { toPlainText, truncate, markdownToHtml, sanitizeHtml } from "../utils";

describe("toPlainText", () => {
  it("HTML taglarını temizler", () => {
    expect(toPlainText("<p>Merhaba <strong>dünya</strong></p>")).toBe("Merhaba dünya");
  });

  it("boş string için boş döner", () => {
    expect(toPlainText("")).toBe("");
  });

  it("undefined için boş döner", () => {
    expect(toPlainText(undefined)).toBe("");
  });

  it("fazla boşlukları sıkıştırır", () => {
    expect(toPlainText("<p>kelime1</p><p>kelime2</p>")).toBe("kelime1 kelime2");
  });
});

describe("truncate", () => {
  it("limit altındaki metni olduğu gibi döner", () => {
    expect(truncate("kısa metin", 160)).toBe("kısa metin");
  });

  it("limiti aşan metni kırpar ve … ekler", () => {
    const uzunMetin = "a".repeat(200);
    const sonuc = truncate(uzunMetin, 160);
    expect(sonuc.endsWith("…")).toBe(true);
    expect(sonuc.length).toBeLessThanOrEqual(161);
  });

  it("varsayılan limit 160 karakter", () => {
    const metin = "x".repeat(161);
    expect(truncate(metin)).toHaveLength(161); // 160 + …
  });

  it("tam limit eşitse kırpmaz", () => {
    const metin = "a".repeat(160);
    expect(truncate(metin, 160)).toBe(metin);
  });
});

describe("markdownToHtml", () => {
  it("markdown'ı HTML'e dönüştürür", () => {
    const html = markdownToHtml("**kalın**");
    expect(html).toContain("<strong>kalın</strong>");
  });

  it("boş string için boş döner", () => {
    expect(markdownToHtml("")).toBe("");
  });

  it("undefined için boş döner", () => {
    expect(markdownToHtml(undefined)).toBe("");
  });

  it("XSS script taglarını temizler", () => {
    const html = markdownToHtml('<script>alert("xss")</script>');
    expect(html).not.toContain("<script>");
  });
});

describe("sanitizeHtml", () => {
  it("temiz HTML'i olduğu gibi döner", () => {
    const html = sanitizeHtml("<p>Güvenli <strong>içerik</strong></p>");
    expect(html).toContain("<p>");
    expect(html).toContain("<strong>");
  });

  it("script taglarını kaldırır", () => {
    const html = sanitizeHtml('<p>Metin</p><script>alert("xss")</script>');
    expect(html).not.toContain("<script>");
    expect(html).toContain("<p>Metin</p>");
  });

  it("onerror gibi event handler'ları kaldırır", () => {
    const html = sanitizeHtml('<img src="x" onerror="alert(1)">');
    expect(html).not.toContain("onerror");
  });

  it("boş string için boş döner", () => {
    expect(sanitizeHtml("")).toBe("");
  });

  it("undefined için boş döner", () => {
    expect(sanitizeHtml(undefined)).toBe("");
  });
});
