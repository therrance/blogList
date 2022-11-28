import {useState} from "react";

const Blog = ({blog, updateBlog, deleteBlog, user}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const removeButtonStyle = {
        backgroundColor: '#008CBA',
        borderRadius: '5px',
        border: 'none',
    }

    const [visible, setVisible] = useState(false);

    return <div style={blogStyle}>
        <div onClick={() => setVisible(!visible)}>
            {blog.title} {blog.author}{' '}
            <button onClick={() => setVisible(!visible)}>
                {visible ? 'hide' : 'show'}
            </button>
        </div>
        {
            visible && (
                <>
                    <div>{blog.url}</div>
                    <div>
                        likes {blog.likes}
                        <button onClick={() => updateBlog(blog)}>like</button>
                    </div>
                    <div>{blog.user ? blog.user.name : 'Undefined user'}</div>
                    {user.username === blog.user?.username && (
                        <button style={removeButtonStyle} onClick={() => deleteBlog(blog)}>
                            remove
                        </button>)}
                </>
            )
        }
    </div>
}

export default Blog