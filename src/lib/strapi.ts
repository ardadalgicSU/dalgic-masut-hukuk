import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export const getStrapiUrl = () => STRAPI_URL;

export const buildMediaUrl = (url?: string | null) => {
  if (!url) {
    return undefined;
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
};

type FetchParams = Record<string, unknown> | undefined;

type FetchOptions = {
  params?: FetchParams;
  init?: RequestInit;
};

export const strapiFetch = async <T>(
  path: string,
  { params, init }: FetchOptions = {},
): Promise<T | null> => {
  const query = params
    ? qs.stringify(params, { encodeValuesOnly: true })
    : "";

  const url = `${STRAPI_URL}/api${path}${query ? `?${query}` : ""}`;

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  if (STRAPI_TOKEN) {
    headers.set("Authorization", `Bearer ${STRAPI_TOKEN}`);
  }

  try {
    const response = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 60, ...(init?.next ?? {}) },
      ...init,
      headers,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        `Strapi request failed: ${response.status} ${response.statusText} - ${message}`,
      );
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
};
