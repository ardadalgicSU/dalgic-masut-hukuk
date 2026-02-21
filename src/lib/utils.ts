import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export const toPlainText = (html?: string) => {
  if (!html) {
    return "";
  }

  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
};

export const truncate = (text: string, limit = 160) => {
  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit).trim()}…`;
};

export const markdownToHtml = (markdown?: string): string => {
  if (!markdown) {
    return "";
  }

  const raw = marked.parse(markdown) as string;
  return DOMPurify.sanitize(raw);
};

export const sanitizeHtml = (html?: string): string => {
  if (!html) return "";
  return DOMPurify.sanitize(html);
};
