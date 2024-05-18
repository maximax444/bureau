export interface Field {
    readonly id?: number
    title: string
    descr: string
    slug: string
    createdAt?: string
    updatedAt?: string
}

export interface FieldsValues {
    readonly id?: number
    fieldId: number
    blockId: number
    value: string
}