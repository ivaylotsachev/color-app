const styles = {
    root: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid black',
        cursor: 'pointer',
        '&:hover': {},
        '&:hover svg': {
            cursor: 'pointer',
            opacity: '1'
        }
    },
    colors: {
        backgroundColor: '#dae1e3',
        height: '150px',
        width: '100%',
        borderRadius: '5px'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        paddingTop: '0.5rem',
        margin: '0',
        // fontSize: '1rem',
        position: 'relative'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-3.5px'
    },
    delete: {
        position: 'relative'
    },
    deleteIcon: {
        color: 'white',
        backgroundColor: '#eb3d30',
        width: '30px',
        height: '30px',
        position: 'absolute',
        right: '0',
        top: '0',
        padding: '5px',
        zIndex: 10,
        opacity: 0,
        transition: 'all 0.3s ease-in-out'
    }
};

export default styles;
