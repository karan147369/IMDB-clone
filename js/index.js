fetch('https://omdbapi.com/?apikey=2f2e0ecc&s=christopher', { method: 'GET' }).then((res) => {
    const element = document.getElementById('container');
    element.innerHTML = `<div>${res}</div>`
})
console.log(data);