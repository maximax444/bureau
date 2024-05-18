export interface Block {
    readonly id?: number
    title: string
    path: string
    slug: string
    parent_id: number
    text: string
    createdAt?: string
    updatedAt?: string
}