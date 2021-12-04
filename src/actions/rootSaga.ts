import {
    FETCH_ALL,
    CREATE,
    //  UPDATE,
    DELETE,
    LIKE,
} from '../constants/actionTypes'
import { takeEvery, put, call } from 'redux-saga/effects'

import * as api from '../api/index'
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
function* createPost(post: any) {
    try {
        const { data } = yield call(api.createPost, post)

        yield put({ type: CREATE, payload: data })
    } catch (error) {
        yield put({ type: 'FAILED', error })
    }
}
// function* updatePost(id: string, post: any, e: any) {
//     console.log(e)
//     try {
//         const { data } = yield call(api.updatePost, id, post)

//         yield put({ type: UPDATE, payload: data })
//     } catch (error) {
//         yield put({ type: 'FAILED', error })
//     }
// }
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
        //   takeEvery(UPDATE, updatePost),
        takeEvery(LIKE, likePost),
        takeEvery(DELETE, deletePost),
    ]
}

export const getPosts = () => ({
    type: FETCH_ALL,
})
