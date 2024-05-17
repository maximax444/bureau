export interface Page {
    readonly id?: number
    title: string
    slug: string
    parent_id: string
    path?: string
    text?: Text
    children?: Page[]
    createdAt?: string
    updatedAt?: string
}