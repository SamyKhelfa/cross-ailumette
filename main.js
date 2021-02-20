const prompt = require('prompt-sync')({sigint: true})

let array = [
    [' ',' ',' ','|',' ',' ',' '],
    [' ',' ','|','|','|',' ',' '],
    [' ','|','|','|','|','|',' '],
    ['|','|','|','|','|','|','|']
]

function render(){
    console.log('*********')
    for (i=0; i<array.length; i++){
        process.stdout.write('*')
        for (j=0; j<array[i].length; j++){
            process.stdout.write(array[i][j])
            
        }
        console.log('*')
    }
    console.log('*********')
}

function checkVariable(variable){
    if (variable == undefined){
        return false
    }
    else if(variable > 4 || variable < 1){
        console.log('Veuillez saisir une ligne valide')
        return false
    }
    else if(isNaN(variable)){
        console.log('Veuillez saisir un nombre')
        return false
    }
    else {
        return true
    }
}

function countMatches(ligne){
    let compteur = 0
    for (i=0; i<array[ligne]; i++){
        if(array[ligne][i] = '|'){
            compteur ++
        }
    }
    return compteur
}

function checkVariable2(variable2, ligne){
    if (variable2 == undefined){
        return false
    }
    else if (countMatches(ligne) < variable2) {
        console.log('Il n\'y a pas assez d\'allumettes sur cette ligne')
        return false
    }
    else if(isNaN(variable)){
        console.log('Veuillez saisir un nombre')
    }
    else if (isNaN(variable2)){
        console.log('Veuillez saisir un nombre')
        return false
    }
    else if (variable2 <= 0){
        console.log('Veuillez saisir un nombre positif')
        return false
    }
    else{
        return true
    }
}



function input(){
    let variable
    let variable2
    while(!checkVariable(variable - 1)){
      variable = prompt('Quelle ligne selectionnez vous ?')
    }
   while(!checkVariable2(variable2, variable)){
    variable2 = prompt("Combien d'alumettes ?")
   }
   return variable, variable2
    
}




function main(){
    render()
    input()
}

main()

