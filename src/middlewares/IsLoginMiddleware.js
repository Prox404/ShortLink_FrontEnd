function IsLoginMiddleware() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '/';
    }
}

export default IsLoginMiddleware;