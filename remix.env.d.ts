/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
    }
  }
}

export {}
