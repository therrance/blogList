import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState({text: null, severity: null})

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
            setMessage({text: null, severity: null})
        }, 5000)
    }

    const showError = (message) => {
        setMessage({text: message, severity: 'error'})
        setTimeout(() => {
            setMessage({text: null, severity: null})
        }, 5000)
    }

    const createBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = {
                title,
                author,
                url,
            }

            await blogService.create(blog)

            setTitle('')
            setAuthor('')
            setUrl('')
            blogService.getAll().then((blogs) => setBlogs(blogs))
            showNotification(`a new blog ${title} by ${author} added`)
        } catch (exception){
            showError({text: exception.response.data.error, severity: 'error'})
        }
    }

    const loginForm = () => (<>
        <h1>blogs</h1>

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
        <Footer/>
    </>)

    const blogForm = () => (<>{blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}</>)


    return (<>
        <Notification text={message.text} severity={message.severity}/>
        {user === null ? loginForm() : <div>
            <p>{user.name} logged-in</p>
            <button onClick={handleLogout}>logout</button>
            {blogForm()}
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>}
    </>)
}

export default App
