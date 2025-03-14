/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />



// type for .env
interface ImportMetaEnv {
    readonly VITE_API_DNS: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}