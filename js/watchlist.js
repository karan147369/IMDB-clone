const obj = JSON.parse(localStorage.getItem('list'));
const arr = obj.list;
let str = ``;
const element = document.getElementById('tbody');
const func = async function () {
    for (let i of arr) {
        (async function () {

            const data = (await fetch(`https://omdbapi.com/?apikey=2f2e0ecc&i=${i}`));
            const jsonData = await data.json();
            console.log(jsonData);
            str += `<tr >
            <td>${jsonData.Title}</td>
            <td>${jsonData.Director}</td>
            <td><button class='remove' id=${jsonData.imdbID}>Remove</button></td>
            </tr>`;
            element.innerHTML = str;
            console.log(jsonData.imdbId)
            const buttons = document.getElementsByClassName('remove');
            for (let j of buttons) {

                j.addEventListener('click', () => {
                    const list = JSON.parse(localStorage.getItem('list'));
                    const arr = [];

                    for (let k of list.list) {
                        if (k !== j.id) arr.push(k);
                    }
                    localStorage.setItem('list', JSON.stringify({ 'list': arr }))
                    location.reload()
                })
            }

        })()

    }
}

func();



