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
    title: string
    descr: string
    slug: string
    fieldId: number
    blockId: number
    value: string
    createdAt?: string
    updatedAt?: string
}
export interface fvMap {
    [key: string]: FieldsValues
}