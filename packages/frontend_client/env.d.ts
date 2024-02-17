/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_AMAP: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
