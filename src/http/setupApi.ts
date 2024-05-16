import { $host } from "./index"

export const setup = async (server: String, db: String, user: String, password: String) => {
    const response = await $host.post('setup', { server, db, user, password })
        .catch((err) => {
            throw err
        })
    return response
}

export const register = async (name1: String, name2: String, email: String, password: String) => {
    const response = await $host.post('/api/users/add', { name1, name2, email, password })
        .catch((err) => {
            throw err
        })
    return response
}

export const login = async (email: String, password: String) => {
    const response = await $host.post('login', { email, password })
        .catch((err) => {
            throw err
        })
    return response
}

export const getPages = async () => {
    const response = await $host.get('api/pages')
        .catch((err) => {
            throw err
        })
    return response
}

export const addPage = async (title: String, slug: String, parent_id: String) => {
    const response = await $host.post('api/pages', { title, slug, parent_id })
        .catch((err) => {
            throw err
        })
    return response
}

export const addCat = async (title: String, slug: String) => {
    const response = await $host.post('api/categories', { title, slug })
        .catch((err) => {
            throw err
        })
    return response
}