export const Msg = ({body, user, ultimaMsg}) => {
    const estiloMsg = {
        borderStyle: 'solid',
        marginTop: '1px'
    }

    return (
        <div ref={ultimaMsg} style={estiloMsg}><b>{user.name}</b>: {body}</div>
    );
}
