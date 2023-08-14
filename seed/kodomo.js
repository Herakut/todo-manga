const kodomo=[
    {
        title:"Doraemon Color nº 01",
        author:  "Fujiko F. Fujio",
        numVolume: 1,
        collectionType:"Doraemon",
        description:"Tomo manga Kodomo de Doraemon, con elque se podrá disfrutar del personaje en su color original. Una colección que, además, recoge historias no publicadas en la edición más conocida del personaje.",
        genre:"Kodomo",
        image:"https://m.media-amazon.com/images/I/51NYhOsPSSL._SX365_BO1,204,203,200_.jpg",
    },
    {
        title:"Doraemon Color nº 02",
        author:  "Fujiko F. Fujio",
        numVolume: 2,
        collectionType:"Doraemon",
        description:"Tomo manga Kodomo de Doraemon, con elque se podrá disfrutar del personaje en su color original. Una colección que, además, recoge historias no publicadas en la edición más conocida del personaje.",
        genre:"Kodomo",
        image:"https://m.media-amazon.com/images/I/51ca0oHIo4L._SX355_BO1,204,203,200_.jpg",
    },
    {
        title:"Doraemon Color nº 03",
        author:  "Fujiko F. Fujio",
        numVolume: 3,
        collectionType:"Doraemon",
        description:"Tomo manga Kodomo de Doraemon, con elque se podrá disfrutar del personaje en su color original. Una colección que, además, recoge historias no publicadas en la edición más conocida del personaje.",
        genre:"Kodomo",
        image:"https://m.media-amazon.com/images/I/61ZstE4E6sL._SX357_BO1,204,203,200_.jpg",
    },
    {
        title:"Doraemon Color nº 04",
        author:  "Fujiko F. Fujio",
        numVolume: 4,
        collectionType:"Doraemon",
        description:"Tomo manga Kodomo de Doraemon, con elque se podrá disfrutar del personaje en su color original. Una colección que, además, recoge historias no publicadas en la edición más conocida del personaje.",
        genre:"Kodomo",
        image:"https://m.media-amazon.com/images/I/61PzQyBNjkL._SX352_BO1,204,203,200_.jpg",
    },
    {
        title:"Doraemon Color nº 05",
        author:  "Fujiko F. Fujio",
        numVolume: 5,
        collectionType:"Doraemon",
        description:"Tomo manga Kodomo de Doraemon, con elque se podrá disfrutar del personaje en su color original. Una colección que, además, recoge historias no publicadas en la edición más conocida del personaje.",
        genre:"Kodomo",
        image:"https://m.media-amazon.com/images/I/51bUSG2OYeL._SX355_BO1,204,203,200_.jpg",
    },
    {
        title:"Doraemon Color nº 06",
        author:  "Fujiko F. Fujio",
        numVolume: 6,
        collectionType:"Doraemon",
        description:"Tomo manga Kodomo de Doraemon, con elque se podrá disfrutar del personaje en su color original. Una colección que, además, recoge historias no publicadas en la edición más conocida del personaje.",
        genre:"Kodomo",
        image:"https://m.media-amazon.com/images/I/51DlDOcMG4L._SX354_BO1,204,203,200_.jpg",
    },
    
    
]
const mongoose = require("mongoose");
const Manga = require("../models/Manga.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/todo-manga")
  .then(() => {
    return Manga.insertMany(kodomo)
  })
  .then(() => {
    console.log("Información insertada en la base de datos.");
  })
  .catch((error) => {
    console.log(error);
  });