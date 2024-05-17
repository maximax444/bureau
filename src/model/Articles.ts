import { Category } from "./Category"

export interface Article {
    readonly id?: number
    title: string
    descr: string
    slug: string
    text?: string
    createdAt?: string
    updatedAt?: string
    articleImg?: string
    Category?: Category
    CategoryId?: number
}