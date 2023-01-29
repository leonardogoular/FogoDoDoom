const FirePixelsArray =[]
const fireWidth = 40
const fireHeight = 40
const paletaDefogo = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

//main
function start(){

    createFireDataStructure()
    createFireSource()
    renderFire()
    setInterval(calculateFirePropagation, 10)

}
//cria a estrutura do fogo
function createFireDataStructure(){
    const numberOfPixils = fireHeight*fireWidth
    for(let i =0; i<numberOfPixils; i++){
        FirePixelsArray[i]=0
    }
}
// calcula o valor da propagação de fogo
function calculateFirePropagation(){
    for(let column=0;column< fireWidth ;column++){
        for(let row = 0;row < fireHeight; row++){
            const pixelIndex = column+(fireWidth * row)
            updateFireIntensityperPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityperPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth
    if(belowPixelIndex >= fireWidth * fireHeight){
        return
    }
    // cria o efeito de fogo 
    const decay = Math.floor(Math.random()*3)
    const belowPixelFireIntensity =FirePixelsArray[belowPixelIndex]
    //define o limite de intecidade do fogo como zero 
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay:0
    //cria o efeito de vento na animação
    FirePixelsArray[currentPixelIndex -decay ]=newFireIntensity
}


//cria o visual do fogo
function renderFire(){
    const debug =false
    let html ='<table cellpadding =0 cellspacing=0>'
    for(let row=0; row <fireHeight; row++){
        html +='<tr>'
        for(let column =0; column < fireWidth; column++){
            //indice da celula
            const pixelIndex = column + (fireWidth * row)
            // valor de intencidade do fogo 
            const fireIntensity =FirePixelsArray[pixelIndex]

            if(debug == true){
                html +='<td>'
                html += `<div class = "pixel-index">${pixelIndex}</div>`
                html+= fireIntensity;
                html+='</td>'
                }
            else{
                const color = paletaDefogo[fireIntensity]
                const colorString =`${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }

        }
            html +='</tr>'
    }

    html+='</table>'
    document.querySelector('#fireCanvas').innerHTML = html
}

//cria o fogo 
function createFireSource(){
    for(let column=0; column<=fireHeight; column++){
        const overflowPixelIndex =fireWidth * fireHeight
        const pixelIndex =(overflowPixelIndex - fireWidth) + column

        FirePixelsArray[pixelIndex]=36
    }
}

start();