import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
} from '../constants/actionTypes'

type Date = {
    type: string
    default: string
}

export type Post = {
    _id: string
    title: string
    email: string
    message: string
    creator: string
    tags: string
    selectedFile: string
    createdAt?: Date
}

type Action =
    | { type: typeof FETCH_ALL; payload: Post[] }
    | { type: typeof LIKE; payload: { _id: string } }
    | { type: typeof CREATE; payload: { _id: string } }
    | { type: typeof UPDATE; payload: { _id: string } }
    | { type: typeof DELETE; payload: string }

export default (posts: Post[] = [], action: Action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case LIKE:
            return posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            )
        case CREATE:
            return [...posts, action.payload]
        case UPDATE:
            return posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            )
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts
    }
}
