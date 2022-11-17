
// Part 2: Deck of Cards
const baseURL = 'https://deckofcardsapi.com/api/deck/'

// TIP: replace <<deck_id>> with "new" to create a shuffled deck and draw cards from that deck in the same request.

// 1)
axios.get(`${baseURL}new/draw`)
    .then(resp => {
        let {suit, value, code, image, images} = resp.data.cards[0]
        // console.log(resp);
        // console.log(suit)
        // console.log(value)
        console.log(`1))) ${value} OF ${suit}`)
    })
    .catch(err => console.log(err))


// 2)
// Must instantiate firstCard here so that we have access to it in the second .then()
let firstCard = '';
axios.get(`${baseURL}new/draw`)
    .then(resp => {
        console.log('2)))', resp);
        firstCard = resp.data.cards[0]
        console.log('First card:', firstCard)
        let deckID = resp.data.deck_id        
        return axios.get(`${baseURL}/${deckID}/draw`)
    })
    .then(resp => {
        console.log('2)))', resp);
        let secondCard = resp.data.cards[0]
        console.log('Second card:', secondCard)



        console.log(`First card is: ${firstCard.value} OF ${firstCard.suit} -- Second card is: ${secondCard.value} OF ${secondCard.suit}`)
    })
    .catch(err => console.log(err))


// 3)
document.addEventListener("DOMContentLoaded", function() {

    const button = document.getElementById("button")
    const title = document.getElementById("title")
    const img = document.getElementById("img")
    const remaining = document.getElementById("remaining")
    const buttonDiv = document.getElementById("button-div")
    button.addEventListener('click', drawCard)

    axios.get(`${baseURL}new/shuffle`)
        .then(response => {
            console.log('3)))', response.data)
            deck_id = response.data.deck_id;
            console.log("3))) Deck ID:", deck_id)
        })

    let deck_id = '';

    function drawCard() {
        axios.get(`${baseURL}/${deck_id}/draw`)
            .then(response => {
                if (response.data.remaining === 0) {
                    buttonDiv.style.display = "none";
                }
                console.log('3)))', response.data);
                title.innerText = `${response.data.cards[0].value} OF ${response.data.cards[0].suit}`;
                img.src = response.data.cards[0].image;
                remaining.innerText = response.data.remaining;
            })
            .catch(err => console.log(err))
    }























});

