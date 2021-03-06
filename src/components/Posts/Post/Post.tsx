import React from 'react'
import { Card, CardMedia, Button, Typography } from '@material-ui/core/'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { Post as PostType } from '../../../ducks/ducks'
// import useStyles from './styles';
import EditIcon from '@mui/icons-material/Edit'
import { DELETE, UPDATE } from '../../../constants/actionTypes'

type Props = {
    currentId: string
    post: PostType
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
}

const Post = ({ post, setCurrentId, currentId }: Props) => {
    const dispatch = useDispatch()

    const idUpdater = () => {
        setCurrentId(post._id)
        console.log(post._id, 'PSOST ID')
    }

    return (
        <Card>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <CardMedia
                    image={
                        post.selectedFile ||
                        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                    }
                    component="img"
                    height="140"
                    alt="green iguana"
                    style={{
                        height: '200px',
                        width: '200px',
                        borderRadius: '50%',
                        marginTop: '10px',
                    }}
                />
            </div>
            <CardContent
                style={{
                    textAlign: 'center',
                }}
            >
                <Typography
                    style={{ textTransform: 'capitalize' }}
                    variant="h4"
                >
                    {post.creator}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    {post.message}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                    {post.title}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="h2">
                    {post.tags}
                </Typography>
            </CardContent>
            <CardActions
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                {!currentId ? (
                    <Button
                        style={{ color: 'blue' }}
                        size="medium"
                        color="secondary"
                        onClick={() =>
                            dispatch({ type: DELETE, payload: post._id })
                        }
                    >
                        <DeleteIcon fontSize="small" />
                    </Button>
                ) : (
                    <h1>nottt</h1>
                )}

                <Button
                    style={{ color: 'blue' }}
                    size="small"
                    onClick={() =>
                        dispatch({
                            type: UPDATE,
                            payload: idUpdater,
                        })
                    }
                >
                    <EditIcon fontSize="small" />
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
