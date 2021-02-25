import Actice from './1.jpg'
import style from'./index.scss'
console.log(style);
const img = new Image();
img.src = Actice;
img.className += style.img;
let app = document.getElementById('app');
app.appendChild(img)
