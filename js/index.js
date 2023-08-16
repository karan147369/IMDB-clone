const addToWatchlist = () => { }
(async function () {

    let response = await fetch('https://omdbapi.com/?apikey=2f2e0ecc&s=2023', {
        method: 'GET'
    })
    let data = await response.json();
    const element = document.getElementById('container');

    let str = ``;
    for (let i of data.Search) {

        str += `<a href='#'><div class='child' id='${i.imdbID}'>
        <img src=${i.Poster} height='200px' width='200px'></img>
        <div>${(i.Title).substring(0, 40)}</div>
        <div>${i.Year}</div>
        </div></a>`;
    }
    str += ``;
    element.innerHTML = str;
    const array = document.getElementsByClassName('child');
    Array.from(array).forEach((i) => {
        i.addEventListener('click', async () => {
            const data = await fetch(`https://omdbapi.com/?apikey=2f2e0ecc&i=${i.id}`);
            const movieDetail = await data.json();
            console.log(movieDetail)
            element.innerHTML = `<div class='moveDetails'>
            <div id=''poster><img src=${movieDetail.Poster} alt='Poster Not Available'></img><div>
            <div id='movieDescription>
            <p>${movieDetail.Title}</p>
            <p>${movieDetail.Year}</p>
            <p>${movieDetail.Release}</p>
            <p>${movieDetail.Genre}</p>
            <button id='addtowatchlist'>Add</button>
            </div >
            </div > `
            document.getElementById('addtowatchlist').addEventListener('click', () => {

                let obj = JSON.parse(localStorage.getItem('list'));
                if (obj !== null) localStorage.setItem('list', JSON.stringify({ list: [...obj.list, i.id] }));
                else localStorage.setItem('list', JSON.stringify({ list: [i.id] }));
            })


        })
    })

    const search = document.getElementsByTagName('input')[0];
    search.addEventListener('change', async () => {
        const url = `https://omdbapi.com/?apikey=2f2e0ecc&s=${search.value}`;
        const searchResult = await fetch(url, { method: 'GET' });
        const data = await searchResult.json();
        const container = document.getElementById('container');
        console.log(data)
        let str = ``;
        if (data.Response === 'False') {
            str = `<div id='message'>No Movie found<div>`;
        }
        else {

            for (let i of data.Search) {
                str += `<a href=''><div class='child' id='${i.imdbID}'>
            <img src=${i.Poster} height='200px' width='200px'>
            <div>${(i.Title).substring(0, 40)}</div>
            <div>${i.Year}</div>
            </div>`;
            }
            str += ``;

        }
        container.innerHTML = str;


    });

})()





