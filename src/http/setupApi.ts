import { $host } from "./index"

export const setup = async (server: String, db: String, user: String, password: String) => {
    const response = await $host.post('setup', { server, db, user, password })
        .catch((err) => {
            throw err
        })
    return response
}