import {useEffect, useState, useRef} from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({text: '', severity: ''})
    const [loginVisible, setLoginVisible] = useState(false)


    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            showError(`Wrong credentials: ${exception.response.data.error}`)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const showNotification = (message) => {
        console.log('message: ',message)
        setMessage({text: message, severity: 'notification'})
        setTimeout(() => {
            setMessage({text: '', severity: ''})
        }, 5000)
    }

    const showError = (message) => {
        setMessage({text: message, severity: 'error'})
        setTimeout(() => {
            setMessage({text: '', severity: ''})
        }, 5000)
    }

    const createBlog = async (blogObject) => {
        try {
            await blogService.create(blogObject)

            blogService.getAll().then((blogs) => setBlogs(blogs))
            showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`);
            blogFormRef.current.toggleVisibility();
        } catch (exception) {
            showError({text: exception.response.data.error, severity: 'error'})
        }
    }

    const updateBlog = async (blog) => {
        try {
            const changedBlog = {...blog, likes: blog.likes + 1}

            const updatedBlog = await blogService.update(changedBlog.id, changedBlog)

            await setBlogs(
                blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
            )
        } catch (exception) {
            const error = exception.response.data.error
            showError(error)
        }
    }

    const loginForm = () => {
        const hideWhenVisible = {display: loginVisible ? 'none' : ''}
        const showWhenVisible = {display: loginVisible ? '' : 'none'}

        return (<>

            <div style={hideWhenVisible}>
                <button onClick={() => setLoginVisible(true)}>log in</button>
            </div>

            <div style={showWhenVisible}>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({target}) => setUsername(target.value)}
                    handlePasswordChange={({target}) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
                <button onClick={() => setLoginVisible(false)}>cancel</button>
            </div>

        </>)
    }

    const blogFormRef = useRef();

    const blogForm = () => (
        <>{blogs.map(blog => <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
        />)}</>)


    return (<>
        <h1>blogs</h1>
        <Notification text={message.text} severity={message.severity}/>
        {user === null ? loginForm() : <div>
            <p>{user.name} logged-in</p>
            <button onClick={handleLogout}>logout</button>
            {blogForm()}
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm
                    createBlog={createBlog}
                />
            </Togglable>
        </div>}
        <Footer/>
    </>)
}

export default App
