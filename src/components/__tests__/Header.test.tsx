import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

// next/navigation mock
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// next/image mock
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

const defaultProps = {
  firm: { name: "Dalgıç-Masüt Hukuk Bürosu", tagline: "", description: "" },
  contact: {
    phone: "+90 530 159 81 32",
    email: "info@dalgicmasut.av.tr",
    address: "Eskişehir",
    workingHours: "Pzt–Cum: 09:00–18:00",
  },
  navigation: [
    { id: 1, label: "Hakkımızda", href: "/hakkimizda" },
    { id: 2, label: "Hizmetler", href: "/hizmetler" },
    { id: 3, label: "İletişim", href: "/iletisim" },
  ],
};

describe("Header", () => {
  it("firma adı render edilir", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText("Dalgıç-Masüt")).toBeInTheDocument();
  });

  it("navigasyon linkleri render edilir", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("Hizmetler")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
  });

  it("telefon numarası DOM'da bulunur", () => {
    render(<Header {...defaultProps} />);
    // Telefon hem href'te hem span'de var; tüm eşleşmeleri kontrol et
    const phoneLinks = screen.getAllByRole("link").filter(
      (el) => el.getAttribute("href")?.includes("tel:"),
    );
    expect(phoneLinks.length).toBeGreaterThan(0);
  });

  it("Randevu Oluşturun butonu render edilir", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText("Randevu Oluşturun")).toBeInTheDocument();
  });

  it("iletişim bilgisi yoksa hata vermez", () => {
    render(<Header firm={defaultProps.firm} navigation={defaultProps.navigation} />);
    expect(screen.getByText("Dalgıç-Masüt")).toBeInTheDocument();
  });
});
