import { takeEvery, put, call } from 'redux-saga/effects'
import * as api from '../api/index'

// Action Types
import {
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    FETCH_ALL,
} from '../constants/actionTypes'

// actions

export const getPosts =
    () => async (dispatch: (arg0: { type: any; payload: any }) => void) => {
        try {
            const { data } = await api.fetchPosts()

            dispatch({ type: FETCH_ALL, payload: data })
        } catch (error: any) {
            console.log(error.message)
        }
    }

function* createPost(post: any) {
    try {
        const { data } = yield call(api.createPost, post)
        console.log(data, 'post data')
        yield put({ type: CREATE, payload: data })
    } catch (error) {
        yield put({ type: 'FAILED', error })
    }
}
function* updatePost(id: any, post: any) {
    try {
        const { data } = yield call(api.updatePost, id, post)

        yield put({ type: UPDATE, payload: data })
    } catch (error) {
        yield put({ type: 'FAILED', error })
    }
}
function* likePost(id: any) {
    try {
        const { data } = yield call(api.likePost, id)

        yield put({ type: LIKE, payload: data })
    } catch (error) {
        yield put({ type: 'FAILED', error })
    }
}
function* deletePost(id: any) {
    try {
        yield call(api.deletePost, id)

        yield put({ type: DELETE, payload: id })
    } catch (error) {
        yield put({ type: 'FAILED', error })
    }
}

export function* mySaga() {
    yield [
        //   takeLatest(FETCH_ALL, fetchPost),
        takeEvery(CREATE, createPost),
        ///takeEvery(UPDATE, updatePost),
        takeEvery(LIKE, likePost),
        takeEvery(DELETE, deletePost),
    ]
}

// type-Script types

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

// Reducer
export const posts = (posts: Post[] = [], action: Action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case LIKE:
            return posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            )
        case CREATE:
            return [action.payload]
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

// export const getPosts = () => ({
//     type: FETCH_ALL,
// })
// function* fetchPost() {
//     try {
//         const { data } = yield call( api.fetchPosts)
// const posts =yield select(selector.posts)
// console.log(posts, 'posts')
//        yield put({type: FETCH_ALL, payload:data });

//     } catch (e) {
//        yield put( {message: e.message});
//     }
//  }
// type Props = {
//     post: PostType
// }
