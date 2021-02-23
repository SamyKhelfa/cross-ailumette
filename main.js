const prompt = require('prompt-sync')({sigint: true})
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lineArray =     "*********"
let firstLine, secondLine, thirdLine ,fourthLine, matchLefts, rangeLine, rangeMatch, countAiError

let arena = [lineArray,firstLine,secondLine,thirdLine,fourthLine,lineArray]

let array = [
    "*********",
    "*   |   *",
    "*  |||  *",
    "* ||||| *",
    "*|||||||*",
    "*********"
    ]

matchLefts = 16;



Player()

async function Player() {

    console.log('Votre tour :')
    rl.question('Ligne : ', async(numLine) => {

        rl.question('Allumettes : ', async(numMatch) => {

                console.log(`Le joueur a enlevé ${numMatch} allumettes de la ligne ${numLine}`)
                for(i=0;i<numMatch;i++) {
                    let line = array[numLine]
                    line = line.replaceAt(line.lastIndexOf('|'),' ')
                    array[numLine] = line
                    matchLefts--
                }
                console.log(concatLine(array))
        })
    })
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function concatLine(tab) {
    let string = ""
    for(let i = 0; i < tab.length; i++){
        string = string + tab[i]
        if(i != tab.length - 1){
            string = string + "\n"
        }
    }
    return string
}

function randomRange(array) {
    return array[Math.floor(Math.random() * array.length)]
}

async function AI() {
    if(matchLefts==0) {
        console.log('Vous avez perdu')
        return EndGame()
    }

    numLine = randomRange(rangeLine)
    numMatch = randomRange(rangeMatch)
    
    if(arena[numLine].match(/\|/gm) == null) {
        matchsLeftOnLine = 0
    }
    else {
        matchsLeftOnLine = (arena[numLine].match(/\|/gm)).length
    }
    
    if (numMatch > matchsLeftOnLine) {
        let err=['AI',matchsLeftOnLine,numLine]
        errFunc(err)
    }
    else {
        console.log("Au tour de l'adversaire")
        console.log(`L'adversaire a retiré ${numMatch} allumettes de la ligne ${numLine}`)
        for(i=0;i<numMatch;i++) {
            let line = arena[numLine]
            line = line.replaceAt(line.lastIndexOf('|'),' ')
            arena[numLine] = line
            matchLefts--
        }
        console.log(concatLine(arena))
        return Player()
    }
}

function errFunc(err) {
    if (err[0]=='joueur') {
        if(err[1]=='ligne') {
            if(err[2]==undefined || err[2]>4) {
                console.log('Cette ligne est hors de portée !')
            }
            if(err[2]<0 || err[2]==0 || isNaN(err[2])) {
                console.log('Vous devez choisir un nombre positif')
            }
        }
        if(err[1]=='allumettes') {
            if(err[2]>0) {
                console.log("Pas assez d'allumettes sur cette ligne")
            }
            if(err[2]==0 || err[2]==undefined || err[2]<0 || isNaN(err[2])) {
                console.log('Vous devez choisir un nombre positif !')
            }
        }
        return Player()
    }
    if(err[0]=='Adversaire') {
        countAiError++
        if(err[1]==0) {
            rangeLine.splice(rangeLine.indexOf(err[2]),1)
        }
        return AI()
    }
}

function EndGame() {
    rl.question('Voulez vous recommencer ?(y,n)',answer => {
        answer = answer.toLowerCase()
        if(answer=='y' || answer=='yes') {
            console.log("C'est reparti !!")
            return Main()
        }
        if(answer=='n' || answer =='no') {
            process.exit()
        }
        else {
            return EndGame()
        }
    })
}
    

function InitModelArena() {
    countAiError=0
    matchLefts = 16
    rangeLine = [1,2,3,4]
    rangeMatch = [1,2,3,4,5,6]
    arena[1] = "*   |   *"
    arena[2] = "*  |||  *"
    arena[3] = "* ||||| *"
    arena[4] = "*|||||||*"
    return console.log(concatLine(arena))
}



function Main() {
    InitModelArena()
    Player()
}

