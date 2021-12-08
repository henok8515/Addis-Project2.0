import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Post as PostType } from '../../ducks/ducks'
import Post from './Post/Post'
import useStyles from './styles'

type Props = {
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
    input: string
    currentId: string
}

type State = {
    posts: PostType[]
}

const Posts = ({ setCurrentId, input, currentId }: Props) => {
    const posts = useSelector((state: State) => state.posts)
    const classes = useStyles()

    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid
            className={classes.mainContainer}
            container
            alignItems="stretch"
            spacing={3}
        >
            {posts
                // eslint-disable-next-line
                .filter((user) => {
                    if (input === '') {
                        return user
                    } else if (
                        user.creator.toLowerCase().includes(input.toLowerCase())
                    ) {
                        return user
                    }
                })
                .map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6}>
                        <Post
                            post={post}
                            setCurrentId={setCurrentId}
                            currentId={currentId}
                        />
                    </Grid>
                ))}
        </Grid>
    )
}

export default Posts
