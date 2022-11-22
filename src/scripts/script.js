let input = document.getElementById('url')

function download(){

    let url = input.value

    let data = {url}

    fetch('http://localhost:3000/',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-type':'application/json;charset=UTF-8'}
    })

}