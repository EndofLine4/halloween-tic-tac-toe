// DOM Variables
const restartBtn = document.getElementById('restartBtn')
const boxes = Array.from(document.querySelectorAll('.grid-box'))


// Game Variables
let pumpkinIsPlaying = true
let winner = null


// Event Handlers
const handleRestart = (e) => {
    pumpkinIsPlaying = true
    winner = null
    document.querySelector('.halloween').innerHTML = 'halloween'

    for (const box of boxes) {
        box.classList.remove('pumpkin')
        box.classList.remove('bones')   
        while (box.firstChild) {
            box.removeChild(box.firstChild);
          }
    }

    document.querySelector('.game-wrapper').classList.remove('gameFadeOut')
    document.querySelector('.game-wrapper').style.display = 'flex'
    document.querySelector('.container').removeChild(document.querySelector('.container').children[2])
}

const handleBoxClick = (e) => {

    const square = e.target
    const img = document.createElement('img')

    console.log(square.classList)

    if (square.classList.length < 1) {
        return 
    } 
        
    if (pumpkinIsPlaying) {
            img.src = "halloween-josy-dom-alexis/svg/Halloween_Pumpkin.svg"
            square.appendChild(img)
            square.classList.add('pumpkin')
            pumpkinIsPlaying = !pumpkinIsPlaying
        } else {
            img.src = "halloween-josy-dom-alexis/svg/Bones.svg"
            square.appendChild(img)
            square.classList.add('bones')
            pumpkinIsPlaying = !pumpkinIsPlaying
        }
    
    gameStatus()
}


// Event Listeners
restartBtn.addEventListener('click', handleRestart)


boxes.forEach(box => 
    box.addEventListener('click', handleBoxClick)    
)


// Status functions
const playerWins = (winner) => {
    
    document.querySelector('.game-wrapper').classList.add('gameFadeOut')

    if (winner === 'pumpkin') {
        setTimeout(() => {document.querySelector('.game-wrapper').style.display = 'none'
    
        let pumpkinGif = document.createElement('img')
        pumpkinGif.src = 'gifs/jack-o-lantern-halloween.gif'
        document.querySelector('.container').appendChild(pumpkinGif)
    
        document.querySelector('.halloween').innerHTML = `${winner} wins!`
        }, 950)} else {
            setTimeout(() => {document.querySelector('.game-wrapper').style.display = 'none'

            let bonesGif = document.createElement('img')
            bonesGif.src = 'gifs/skeleton-dance-party.gif'
            bonesGif.classList.add('bones_gif')
            document.querySelector('.container').appendChild(bonesGif)
        
            document.querySelector('.halloween').innerHTML = `${winner} win!`
            }, 950)
        }
}


const gameStatus = () => {
    const topLeft = document.getElementById('0').classList[1]
    const topCenter = document.getElementById('1').classList[1] 
    const topRight = document.getElementById('2').classList[1] 
    const centerLeft = document.getElementById('3').classList[1] 
    const centerCenter = document.getElementById('4').classList[1] 
    const centerRight = document.getElementById('5').classList[1] 
    const bottomLeft = document.getElementById('6').classList[1] 
    const bottomCenter = document.getElementById('7').classList[1] 
    const bottomRight = document.getElementById('8').classList[1]  

    // Check for winner
    // Horizontal checks
    if (topLeft && topLeft === topCenter && topLeft === topRight) {
        playerWins(topLeft)
    } else if (centerLeft && centerLeft === centerCenter && centerLeft === centerRight) {
        playerWins(centerLeft)
    } else if (bottomLeft && bottomLeft === bottomCenter && bottomLeft === bottomRight) {
        playerWins(bottomLeft)
    }
    
    // Vertical checks
    else if (topLeft && topLeft === centerLeft && topLeft === bottomLeft) {
        playerWins(topLeft)
    } else if (topCenter && topCenter === centerCenter && topCenter === bottomCenter) {
        playerWins(topCenter)
    } else if (topRight && topRight === centerRight && topRight === bottomRight) {
        playerWins(topRight)
    }

    // Diagonal checks
    else if (topLeft && topLeft === centerCenter && topLeft === bottomRight) {
        playerWins(topLeft)
    } else if (topRight && topRight === centerCenter && topRight === bottomLeft) {
        playerWins(topRight)
    }

    // Check for Tie game
    else if (topLeft && topCenter && topRight && centerLeft && centerCenter && centerRight && bottomLeft && bottomCenter && bottomRight) {
    
        document.querySelector('.halloween').innerHTML = `Tie Game!`
    }
}