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