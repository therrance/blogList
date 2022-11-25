const Notification = ({ text, severity }) => {
    if (text === null) {
        return null
    }

    return (
        <div className={severity}>
            {text}
        </div>
    )
}

export default Notification