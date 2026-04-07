export interface RequestConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export const defaultRequestConfig: RequestConfig = {
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
};

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function normalizeHeaders(
  headers?: HeadersInit
): Record<string, string> | undefined {
  if (!headers) {
    return undefined;
  }

  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return headers;
}

export function createRequestClient(overrides: Partial<RequestConfig> = {}) {
  const config: RequestConfig = {
    ...defaultRequestConfig,
    ...overrides,
    headers: {
      ...defaultRequestConfig.headers,
      ...overrides.headers
    }
  };

  const buildUrl = (path: string) =>
    `${config.baseURL.replace(/\/$/, "")}${normalizePath(path)}`;

  const get = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = globalThis.setTimeout(
      () => controller.abort(),
      config.timeout
    );

    try {
      const response = await fetch(buildUrl(path), {
        ...init,
        method: "GET",
        headers: {
          ...config.headers,
          ...normalizeHeaders(init.headers)
        },
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return (await response.json()) as T;
    } finally {
      globalThis.clearTimeout(timeoutId);
    }
  };

  return {
    config,
    buildUrl,
    get
  };
}
