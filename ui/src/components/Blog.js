import {useState} from "react";

const Blog = ({blog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
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
                        <button>like</button>
                    </div>
                    <div>{blog.user ? blog.user.name : 'Undefined author'}</div>
                </>
            )
        }
    </div>
}

export default Blog