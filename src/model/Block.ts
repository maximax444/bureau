export interface Block {
    readonly id?: number
    title: string
    descr: string
    slug: string
    content?: string
    fields?: string
    createdAt?: string
    updatedAt?: string
}