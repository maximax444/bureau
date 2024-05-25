export interface Page {
    readonly id?: number
    title: string
    slug: string
    parent_id: string
    path?: string
    blocks?: string
    children?: Page[]
    createdAt?: string
    updatedAt?: string
}