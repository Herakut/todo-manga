const shojo=[
    {
        title:"Ultra Maniac. Los trucos de Nina",
        author: "Wataru Yoshizumi",
        numVolume: 1,
        collectionType:"Ultra Maniac",
        description:"Ayu Tateishi es la chica más popular del instituto. Su universo se centra en su imagen y en suspirar por el chico número uno, Tetsushi Kaji.La joven lleva una vida relativamente tranquila hasta que se cruza en su camino Nina Sakura. Ayu le ayuda a buscar un mini-ordenador, y la nueva estudiante, en agradecimiento, decide convertirse en su mejor amiga.El problema es que Nina es en realidad una bruja bastante inexperta, y la pobre Ayu va a sufrir las consecuencias de sus conjuros.",
        author:"Wataru Yoshizumi",
        genre:"Shojo",
        image:"https://www.panini.es/media/catalog/product/cache/a87cfc69c89e7921deea3a8e066ac416/s/u/sultr001_0.jpg",
    },
    {
        title:"Ultra Maniac. Los trucos de Nina",
        author: "Wataru Yoshizumi",
        numVolume:2 ,
        collectionType:"Ultra Maniac",
        description:"Ayu Tateishi es la chica más popular del instituto. Su universo se centra en su imagen y en suspirar por el chico número uno, Tetsushi Kaji.La joven lleva una vida relativamente tranquila hasta que se cruza en su camino Nina Sakura. Ayu le ayuda a buscar un mini-ordenador, y la nueva estudiante, en agradecimiento, decide convertirse en su mejor amiga.El problema es que Nina es en realidad una bruja bastante inexperta, y la pobre Ayu va a sufrir las consecuencias de sus conjuros.",
        author:"Wataru Yoshizumi",
        genre:"Shojo",
        image:"https://www.panini.es/media/catalog/product/cache/a87cfc69c89e7921deea3a8e066ac416/s/u/sultr002_0.jpg",
    },
    {
        title:"Ultra Maniac. Los trucos de Nina",
        author: "Wataru Yoshizumi",
        numVolume:3 ,
        collectionType:"Ultra Maniac",
        description:"Ayu Tateishi es la chica más popular del instituto. Su universo se centra en su imagen y en suspirar por el chico número uno, Tetsushi Kaji.La joven lleva una vida relativamente tranquila hasta que se cruza en su camino Nina Sakura. Ayu le ayuda a buscar un mini-ordenador, y la nueva estudiante, en agradecimiento, decide convertirse en su mejor amiga.El problema es que Nina es en realidad una bruja bastante inexperta, y la pobre Ayu va a sufrir las consecuencias de sus conjuros.",
        author:"Wataru Yoshizumi",
        genre:"Shojo",
        image:"https://www.panini.es/media/catalog/product/cache/a87cfc69c89e7921deea3a8e066ac416/s/u/sultr003_0.jpg",
    },
    {
        title:"Ultra Maniac. Los trucos de Nina",
        author: "Wataru Yoshizumi",
        numVolume:4 ,
        collectionType:"Ultra Maniac",
        description:"Ayu Tateishi es la chica más popular del instituto. Su universo se centra en su imagen y en suspirar por el chico número uno, Tetsushi Kaji.La joven lleva una vida relativamente tranquila hasta que se cruza en su camino Nina Sakura. Ayu le ayuda a buscar un mini-ordenador, y la nueva estudiante, en agradecimiento, decide convertirse en su mejor amiga.El problema es que Nina es en realidad una bruja bastante inexperta, y la pobre Ayu va a sufrir las consecuencias de sus conjuros.",
        author:"Wataru Yoshizumi",
        genre:"Shojo",
        image:"https://www.panini.es/media/catalog/product/cache/a87cfc69c89e7921deea3a8e066ac416/s/u/sultr004_0.jpg",
    },
    {
        title:"Ultra Maniac. Los trucos de Nina",
        author: "Wataru Yoshizumi",
        numVolume:5 ,
        collectionType:"Ultra Maniac",
        description:"Ayu Tateishi es la chica más popular del instituto. Su universo se centra en su imagen y en suspirar por el chico número uno, Tetsushi Kaji.La joven lleva una vida relativamente tranquila hasta que se cruza en su camino Nina Sakura. Ayu le ayuda a buscar un mini-ordenador, y la nueva estudiante, en agradecimiento, decide convertirse en su mejor amiga.El problema es que Nina es en realidad una bruja bastante inexperta, y la pobre Ayu va a sufrir las consecuencias de sus conjuros.",
        author:"Wataru Yoshizumi",
        genre:"Shojo",
        image:"https://www.panini.es/media/catalog/product/cache/a87cfc69c89e7921deea3a8e066ac416/s/u/sultr005_0.jpg",
    },  
        
    
]
const mongoose = require("mongoose");
const Manga = require("../models/Manga.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/todo-manga")
  .then(() => {
    return Manga.insertMany(shojo)
  })
  .then(() => {
    console.log("Información insertada en la base de datos.");
  })
  .catch((error) => {
    console.log(error);
  });