import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
// @ts-ignore:next-line
import FileBase from 'react-file-base64'
import useStyles from './styles'
import { CREATE } from '../../constants/actionTypes'
import { Post as PostType } from '../../reducers/posts'
import { updatePost } from '../../actions/posts'

type State = {
    posts: PostType[]
}
type Props = {
    setCurrentId: React.Dispatch<React.SetStateAction<string>>
    input: string
    currentId: string
}

const Form = ({ currentId, setCurrentId }: Props) => {
    const [postData, setPostData] = useState<PostType>({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        email: '',
        _id: '',
    })
    const post = useSelector((state: State) =>
        currentId
            ? state.posts.find((message) => message._id === currentId)
            : null
    )
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const clear = () => {
        setCurrentId('')
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
            email: '',
            _id: '',
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (
            (postData.creator,
            postData.title,
            postData.message,
            postData.tags === '')
        ) {
            return
        }

        if (currentId === '') {
            dispatch({ type: CREATE, payload: postData })
            console.log('this is createa')
            clear()
        } else {
            dispatch(updatePost(postData, currentId))
            clear()
        }
    }

    const formRef = React.useRef<HTMLFormElement>(null)

    return (
        <Paper className={classes.paper}>
            <form
                ref={formRef}
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId
                        ? `Editing "${post?.creator}"`
                        : 'Add  Employee '}
                </Typography>
                <TextField
                    required
                    name="FullName"
                    variant="outlined"
                    label="Full Name  "
                    fullWidth
                    value={postData.creator}
                    onChange={(e: { target: { value: any } }) =>
                        setPostData({ ...postData, creator: e.target.value })
                    }
                />
                <TextField
                    required
                    name="Job-Title"
                    variant="outlined"
                    label="Job -Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
                <TextField
                    required
                    name="email"
                    type="email"
                    variant="outlined"
                    label="Email"
                    fullWidth
                    value={postData.message}
                    onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />
                <TextField
                    required
                    type="number"
                    name="tags"
                    variant="outlined"
                    label="Salary "
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value,
                        })
                    }
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }: any) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>
                <Button
                    onClick={() => formRef.current?.reportValidity()}
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form
