const BlogForm = ({
                      onSubmit,
                      handleTitleChange,
                      handleAuthorChange,
                      handleURLChange,
                      titleValue,
                      authorValue,
                      urlValue
                  }) => {
    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={onSubmit}>
                <div>
                    title
                    <input
                        value={titleValue}
                        onChange={({ target }) => handleTitleChange(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={authorValue}
                        onChange={({ target }) => handleAuthorChange(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        value={urlValue}
                        onChange={({ target }) => handleURLChange(target.value)}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm;