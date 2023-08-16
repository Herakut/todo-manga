const express = require("express");
const router = express.Router();
const Manga = require("../models/Manga.model");

// Importamos los middlewares para usarlos en las rutas
const {
  updateLocals,
  isLoggedIn,
  isAdmin,
} = require("../middlewares/auth.middlewares");
router.use(updateLocals);

// Añadimos las rutas de auth para poder usarlas
const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);
 
// de aqui a arriba no tocar
// -------------------------------------------------------------------



//Ruta para la vista de subir manga
router.get("/subir-manga", (req, res) => {
  res.render("subir-manga.hbs");
});


//Ruta para poder subir un manga
router.post("/subir-manga", async (req, res) => {
  const {
    title,
    numVolume,
    collectionType,
    description,
    author,
    genre,
    image,
  } = req.body;

  if (
    !title ||
    !numVolume ||
    !collectionType ||
    !description ||
    !author ||
    !genre ||
    !image
  ) {
    res.status(400).render("/subir-manga.hbs", {
      errorMessage: "Todos los campos deben estar llenos",
    });
    return;
  }

  await Manga.create({
    title: title,
    numVolume: numVolume,
    collectionType: collectionType,
    description: description,
    author: author,
    genre: genre,
    image: image,
  });

  res.redirect("/mangas");
});


// Ruta del perfil de usuario
router.get("/profile", (req, res) => {
  let puedeSubirManga = false;
  if (req.session.user.role === "admin") {
    puedeSubirManga = true;
  }

  res.render("profile.hbs", { puedeSubirManga });
});


// Ruta del perfil de usuario-----PARECE QUE ES LO MISMO QUE EL DE ARRIBA, MIRAR
// router.get("/profile", (req, res) => {
//   let puedeSubirManga = false;
//   if (req.session?.user.role === "admin") {
//     puedeSubirManga = true;
//   }

//   res.render("profile.hbs", { puedeSubirManga });
// });



// Ruben
// -------------------------------------------------------------------------------
// Daniel




/* GET home page */
router.get("/", (req, res, next) => {
  let isLogged = false;

  if (req.session.user !== undefined) {
    isLogged = true;
  }
  console.log(isLogged);

  res.render("index", {
    isLogged,
  });
});


//Ruta collection
router.get("/collections", (req, res, next) => {
  res.render("collections");

  // Manga.find({ collection: collection})
});


//Ruta para todos los mangas 
router.get("/mangas", isLoggedIn, (req, res, next) => {
  Manga.find()
    .select({ title: 1, image: 1 })

    .then((response) => {
      console.log(response);
      res.render("mangas.hbs", {
        mangaTitle: response,
      });
    })
    .catch((error) => {});
});


//Ruta para monstrar los tomos al clickar
router.get("/mangas/:mangaId", (req, res, next) => {
  let mangaId = req.params.mangaId;
  console.log(mangaId);

  Manga.findById(mangaId)
    .then((response) => {
      console.log(response);
      res.render("tomo.hbs", {
        manga: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//Ruta del buscador
router.get("/search", (req, res, next) => {
  console.log(req.query);
  Manga.find({ title: { $regex: req.query.search } })

    .then((foundManga) => {
      console.log("hoilaaaaaaaaaaaaaaaaaa");
      res.render("tomo-details.hbs", {
        foundManga,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//Ruta para Generos
router.get("/generos", (req, res, next) => {
  let mangaId = req.params.mangaId;
  console.log(mangaId);

  Manga.findById(mangaId)
    .then((response) => {
      console.log(response);
      res.render("generos.hbs", {
        manga: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//RUTA para los detalles-genero
router.get("/detalles-genero/:genero", (req, res, next) => {
  let genero = req.params.genero;
  console.log(genero);

  Manga.find({ genre: genero })
    .then((response) => {
      console.log(response);
      res.render("genero-details.hbs", {
        manga: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});



// de aqui a abajo por mirar, modificar o borrar 
// ----------------------------------------------------------------

//Ruta para todos los mangas------>POR COMODIDAD ESTA AQUI PERO HAY QUE BORRARLO, DEJAMOS EL DE ARRIBA SOLO
router.get("/mangas", (req, res, next) => {
  Manga.find()
    .select({ title: 1, image: 1 })

    .then((response) => {
      console.log(response);
      res.render("mangas.hbs", {
        mangaTitle: response,
      });
    })
    .catch((error) => {});
});





module.exports = router;
