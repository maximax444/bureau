export interface Settings {
    readonly id?: number
    title: string
    descr: string
    slug: string
    val: string
    createdAt?: string
    updatedAt?: string
}

export interface numberMap {
    [key: string]: Settings
}