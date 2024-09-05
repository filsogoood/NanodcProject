function handleClick(path) {
    window.location.href = path;
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
}