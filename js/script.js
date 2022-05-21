import {
    movies
} from "../modules/db.js";





let ul = document.querySelector('.promo__interactive-list')
let promo__bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelector(".promo__genre");
let promo__title = document.querySelector(".promo__title");
let imdb = document.querySelector(".imdb");
let reserch = document.querySelector(".reserch");
let inp = document.querySelector('#search')
let adverts = document.querySelector('.promo__adv')
let links = document.querySelectorAll('.promo__menu-item')
let promo__descr = document.querySelector('.promo__descr')
let filterEd = document.querySelector('.filterEd')
let moviesArr = movies

adverts.childNodes.forEach((item, index )  => {
    if(index % 2 !== 0) {
        item.style.display ="none"
    }
})

inp.onkeyup = () => {
    moviesArr = movies.filter(item => item.Title.toLowerCase().includes(inp.value.toLowerCase()))

    changeFilm(moviesArr[0])

    reload(moviesArr)
}

links.forEach(l => {
    l.onclick = () => {
        let link = document.querySelector('.promo__menu-item_active')
        link.classList.remove('promo__menu-item_active')
        l.classList.add('promo__menu-item_active')
    }
})

function reload(arr) {
    ul.innerHTML = ""

    arr.forEach((movie, index) => {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.innerHTML = `${index + 1}. ${movie.Title}`
        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            changeFilm(movie)
        }

        del.onclick = () => {
            moviesArr = moviesArr.filter(film => film.ID !== movie.ID)

            reload(moviesArr)
        }    
    
    });
    




}
reload(movies)




function changeFilm(props) {
    promo__bg.style.backgroundImage = `url("${props.Poster}")`
    promo__genre.innerHTML = `${props.Genre};`
    promo__title.innerHTML = `${props.Title};`
    imdb.innerHTML = `IMDb: ${props.imdbRating}`
    reserch.innerHTML = `Кинопоиск: ${props.Metascore}`
    promo__descr.innerHTML = `${props.Plot}`
}

