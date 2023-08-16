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
            str += `<tr>
            <td>${jsonData.Title}</td>
            <td>${jsonData.Director}</td>
            <td></td>
            </tr>`;
            element.innerHTML = str;
        })()

    }
}

func();



