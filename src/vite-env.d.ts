/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />



// type for .env
interface ImportMetaEnv {
    readonly PRODUCTION: boolean
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}