function Message() {
    const firstname = 'Abhishek'
    const lastname = 'Choudhary'

    return (
        <div>
            <h1>Hello World!</h1>
            {firstname && lastname && (
            <p>{firstname} {lastname}</p>
            )}
        </div>
    )
}

export default Message