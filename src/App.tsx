import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
// @ts-ignore:next-line
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import { getPosts } from './actions/posts'
import Header from './components/Header/Header'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import { Post as PostType } from './reducers/posts'
import { useSelector } from 'react-redux'

type State = {
    posts: PostType[]
}

const App = () => {
    const [currentId, setCurrentId] = useState('')
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    // const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    const posts = useSelector((state: State) => state.posts)
    console.log(posts, 'this is post')

    return (
        <Router>
            <Container maxWidth="lg">
                <Header setInput={setInput} />
                <Grow in>
                    <Switch>
                        <Container>
                            <Grid
                                container
                                justify="space-between"
                                alignItems="stretch"
                                spacing={3}
                            >
                                <Grid item xs={12} sm={7}>
                                    <Route
                                        exact
                                        path="/"
                                        render={(
                                            props: JSX.IntrinsicAttributes & {
                                                setCurrentId: React.Dispatch<
                                                    React.SetStateAction<string>
                                                >
                                                input: string
                                                currentId: string
                                            }
                                        ) => (
                                            <Posts
                                                {...props}
                                                input={input}
                                                setCurrentId={setCurrentId}
                                                currentId={currentId}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Route
                                        exact
                                        path="/"
                                        render={(
                                            props: JSX.IntrinsicAttributes & {
                                                setCurrentId: React.Dispatch<
                                                    React.SetStateAction<string>
                                                >
                                                input: string
                                                currentId: string
                                            }
                                        ) => (
                                            <Form
                                                {...props}
                                                setCurrentId={setCurrentId}
                                                currentId={currentId}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Route exact path="/signin" component={Signin} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                        </Container>
                    </Switch>
                </Grow>
            </Container>
        </Router>
    )
}

export default App
