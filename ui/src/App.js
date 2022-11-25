import {useState, useEffect} from 'react'
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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
            setBlogs(blogs);
          }
      )
    }
  },[])

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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
      <>
        <h1>Notes</h1>
        <Notification message={errorMessage}/>

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
      </>
  )

  const blogForm = () => (
     <>{blogs.map(blog =>
         <Blog key={blog.id} blog={blog} />
     )}</>
  )


  return (
    <div>
      <h2>blogs</h2>

      {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged-in</p>
            {blogForm()}
          </div>
      }

    </div>
  )
}

export default App
