import { FETCH_ALL, UPDATE } from '../constants/actionTypes'

import * as api from '../api/index'

export const getPosts =
    () => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
        try {
            const { data } = await api.fetchPosts()

            dispatch({ type: FETCH_ALL, payload: data })
        } catch (error: any) {
            console.log(error.message)
        }
    }

// export const createPost = (post) => async (dispatch) => {
//   try {
//     const { data } = await api.createPost(post);

//     dispatch({ type: CREATE, payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const updatePost =
    (id: any, post: any) =>
    async (dispatch: (arg0: { type: any; payload: any }) => void) => {
        try {
            const { data } = await api.updatePost(id, post)

            dispatch({ type: UPDATE, payload: data })
        } catch (error) {
            console.log({ type: 'editing error', error })
        }
    }

// export const likePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.likePost(id);

//     dispatch({ type: LIKE, payload: data });
//   } catch (error) {
//     console.log(error.message);   console.log('post dada', postData)
//   }
// };

// export const deletePost = (id) => async (dispatch) => {
//   try {
//     await api.deletePost(id);

//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
