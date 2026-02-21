import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "../ContactForm";

// fetch mock
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ContactForm", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("form alanları render edilir", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/ad soyad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-posta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mesajınız/i)).toBeInTheDocument();
  });

  it("Gönder butonu render edilir", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /gönder/i })).toBeInTheDocument();
  });

  it("boş form gönderilince validasyon hataları görünür", async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button", { name: /gönder/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/adınızı girin/i)).toBeInTheDocument();
    });
  });

  it("KVKK checkbox işaretlenmeden form API'ye gönderilmez", async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/ad soyad/i), "Ali Yılmaz");
    await user.type(screen.getByLabelText(/e-posta/i), "ali@example.com");
    await user.type(screen.getByLabelText(/konu/i), "Test Konusu");
    await user.type(screen.getByLabelText(/mesajınız/i), "Bu bir test mesajıdır, yeterli uzunlukta.");

    const button = screen.getByRole("button", { name: /gönder/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  it("başarılı gönderim sonrası fetch çağrılır", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/ad soyad/i), "Ali Yılmaz");
    await user.type(screen.getByLabelText(/e-posta/i), "ali@example.com");
    await user.type(screen.getByLabelText(/konu/i), "Test Konusu");
    await user.type(screen.getByLabelText(/mesajınız/i), "Bu bir test mesajıdır, yeterli uzunlukta.");

    // KVKK checkbox
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    const button = screen.getByRole("button", { name: /gönder/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/contact", expect.any(Object));
    });
  });
});
