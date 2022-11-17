
// Part 1: Number Facts

let BASEURL = 'http://numbersapi.com'
let myNum = 3;
let type = 'math';

const ul1 = document.getElementById('ul-num-1')
const ul2 = document.getElementById('ul-num-2')
const ul3 = document.getElementById('ul-num-3')


// 1)
axios.get(`${BASEURL}/${myNum}/${type}?json`)
    .then(response => {
        console.log('1)))', response);
        let li = document.createElement("li");
        li.innerText = response.data.text
        ul1.append(li);
    })


// 2)
axios.get(`${BASEURL}/${[100, 250, 500, 750]}/${type}?json`)
    .then(response => {
        console.log('2)))', response);
        let respObj = response.data;
        for (let each of Object.values(respObj)) {
            let li = document.createElement("li");
            li.innerText = each;
            ul2.append(li);
        }
    })


// 3)
let myFavNum = 3;
let allPromises = [];

for (let i = 1; i < 5; i++) {
    allPromises.push(
        axios.get(`${BASEURL}/${myFavNum}/${type}`)
    );
};

Promise.all(allPromises, console.log(allPromises))
    .then(array => {
        console.log('3)))', array);
        for (let promise of array) {
            console.log(promise.data)
            let li = document.createElement("li");
            li.innerText = promise.data;
            ul3.append(li);
        }
    })
    .catch(error => console.log(error))
