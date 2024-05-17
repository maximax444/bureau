import { $host } from "./index"
import axios from "axios"

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

export const getCats = async () => {
    const response = await $host.get('api/categories')
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

export const updateCat = async (id: Number, title: String, slug: String) => {
    const response = await $host.put('api/categories', { id, title, slug })
        .catch((err) => {
            throw err
        })
    return response
}

export const deleteCat = async (id: Number) => {
    const response = await $host.delete('api/categories/' + id)
        .catch((err) => {
            throw err
        })
    return response
}

export const getArts = async () => {
    const response = await $host.get('api/articles')
        .catch((err) => {
            throw err
        })
    return response
}
export const getSingleArt = async (id: Number) => {
    const response = await $host.get('api/articles/' + id)
        .catch((err) => {
            throw err
        })
    return response
}

// export const addArt = async (title: String, descr: String, slug: String, category_id: number, file: string) => {
//     const response = await $host.post('api/articles', { title, descr, slug, category_id, file })
//         .catch((err) => {
//             throw err
//         })
//     return response
// }


export const addArt = async (formdata: FormData) => axios.post("http://localhost:3500/api/articles", formdata, {
    headers: {
        "Authorization": `Basic ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"
    }
})

export const deleteArt = async (id: Number) => {
    const response = await $host.delete('api/articles/' + id)
        .catch((err) => {
            throw err
        })
    return response
}