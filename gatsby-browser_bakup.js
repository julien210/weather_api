
// liste des deux  images qui fonctionnent
//images : https://raw.githubusercontent.com/julien210/thion/julien210-assets/fredpaq.jpg
// images: https://freepngimg.com/thumb/mario/20723-2-mario-image.png

const insertJS = () => {
    const addJS = ( ) => {

    const i = document.createElement(`img`)
    i.alt = 'image fred'
    // i.height = window.innerHeight
    // i.width = window.innerWidth
    i.src = 'https://freepngimg.com/thumb/mario/20723-2-mario-image.png'

    const d = document.createElement(`div`)
    d.innerHTML = " ce quie l on voit en  premier"
    d.style.backgroundColor = "red" 

    // const c = document.createElement(`canvas`)
    // c.width = window.innerWidth
    // c.height = window.innerHeight
   // c.style.backgroundColor = 'purple' 
    

    const s = document.createElement(`script`)
    s.type = `text/javascript`
    s.src = 'https://cdn.babylonjs.com/babylon.js'  
    
    const sGui = document.createElement(`script`)
    sGui.type = `text/javascript`
    sGui.src = 'https://cdn.babylonjs.com/babylon.max.js'  
    
   // document.getElementsByTagName(`body`)[0].appendChild(c)
    document.getElementsByTagName(`body`)[0].appendChild(d)
    document.getElementsByTagName(`body`)[0].appendChild(i)
    document.getElementsByTagName(`body`)[0].appendChild(s)
    document.getElementsByTagName(`body`)[0].appendChild(sGui)
    }
    addJS()
}

///////  attach  du  canvas   et  engine
//insertJS()

// var  canvas  = document.getElementsByTagName('canvas')
// console.log(canvas.length)

// exports.onInitialClientRender = () => {
//    insertJS()
//     console.log("image ajoutée")
//   }

// const i = document.createElement(`img`)
// i.alt = 'image  moi'
//  i.height = window.innerHeight/2
//  i.width = window.innerWidth/2
// const  im =  document.body.append(i)
