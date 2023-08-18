const express = require("express");
const router = express.Router();
const Manga = require("../models/Manga.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");









// Importar middlewares
const {
  updateLocals,
  isLoggedIn,
  isAdmin,
} = require("../middlewares/auth.middlewares");
router.use(updateLocals);

// Añadimos las rutas de auth para poder usarlas
const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);

//Ruta para la vista de subir manga
router.get("/subir-manga", isLoggedIn, isAdmin, (req, res) => {
  let isLogged = true;

  res.render("subir-manga.hbs", { isLogged });
});

//Ruta para poder subir un manga
router.post("/subir-manga", isLoggedIn, isAdmin, async (req, res) => {
 
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
    res.status(400).render("subir-manga.hbs", {
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
router.get("/profile", isLoggedIn, async (req, res) => {
  let isLogged = true;
  let puedeSubirManga = false;
  if (req.session.user.role === "admin") {
    puedeSubirManga = true;
  }

  const user = await User.findById(req.session.user._id);

  console.log(user);

  res.render("profile.hbs", { puedeSubirManga, isLogged, user });
});

/* GET home page */
router.get("/", (req, res, next) => {
  let isLogged = false;
  if (req.session.user !== undefined) {
    isLogged = true;
  }
  let objetosSeleccionados;
  Manga.find()
    .then((response) => {
      if (response.length <= 20) {
        objetosSeleccionados = response;
      } else {
        objetosSeleccionados = [];
        while (objetosSeleccionados.length < 20) {
          const indiceAleatorio = Math.floor(Math.random() * response.length);
          const objetoSeleccionado = response[indiceAleatorio];
          objetosSeleccionados.push(objetoSeleccionado);
        }
      }
      res.render("index", {
        isLogged,
        objetosSeleccionados,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//Ruta modificar manga
router.get(
  "/:mangaId/modificar-manga",
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    const manga = await Manga.findById(req.params.mangaId);
    res.render("modificar-manga.hbs", { manga: manga });
  }
);

//Ruta modificar manga loogg
router.post(
  "/:mangaId/modificar-manga",
  isLoggedIn,
  isAdmin,
  async (req, res) => {
    const {
      title,
      numVolume,
      collectionType,
      description,
      author,
      genre,
      image,
    } = req.body;
    await Manga.findByIdAndUpdate(req.params.mangaId, {
      title: title,
      numVolume: numVolume,
      collectionType: collectionType,
      description: description,
      author: author,
      genre: genre,
      image: image,
    });

    res.redirect("/mangas");
  }
);

//Ruta borrar manga
router.post("/:mangaId/borrar-manga", isLoggedIn, isAdmin, async (req, res, next) => {
    await Manga.findByIdAndDelete(req.params.mangaId);
    res.redirect("/mangas");
  }
);

//Ruta mangaID-dislike logg
router.post("/:mangaId/comment", isLoggedIn, async (req, res) => {
  const { comentario } = req.body;

  Comment.create({
    user: req.session.user._id,
    manga: req.params.mangaId,
    text: comentario,
  });

  res.redirect(`/mangas/${req.params.mangaId}`);
});

//Ruta mangaID-dislike logg
router.post("/:mangaId/like", isLoggedIn, async (req, res) => {
  const mangaId = req.params.mangaId;

  await User.findByIdAndUpdate(
    req.session.user._id,
    {
      $addToSet: { likes: mangaId },
    },
    { $new: true }
  );

  res.redirect(`/mangas/${mangaId}`);
});

//Ruta mangaID-dislike
router.post("/:mangaId/dislike", isLoggedIn, async (req, res) => {
  const mangaId = req.params.mangaId;
  console.log(mangaId);

  await User.findByIdAndUpdate(
    req.session.user._id,
    {
      $pull: { likes: mangaId },
    },
    { $new: true }
  );

  res.redirect(`/mangas/${mangaId}`);
});

//Ruta collections
router.get("/collections", isLoggedIn, (req, res, next) => {
  Manga.find({ numVolume: 1 })
    .then((response) => {
      let isLogged = true;
      res.render("collections.hbs", {
        collectionSeries: response,
        isLogged,
      });
    })
    .catch((error) => {
      next(error);
    });
});


//Ruta para todos los mangas
router.get("/mangas", isLoggedIn, (req, res, next) => {
  let isLogged = true;
  Manga.find()
    .select({ title: 1, image: 1 })
    .then((response) => {
      console.log(response);
      res.render("mangas.hbs", {
        mangaTitle: response,
        isLogged,
      });
    })
    .catch((error) => {});
});

//Ruta mostrar mangas
router.get("/mangas/:mangaId", isLoggedIn, async (req, res, next) => {
  try {
    const mangaId = req.params.mangaId;
    console.log(mangaId);

    const isLogged = true;
    let isAdmin = false;
    if (req.session.user.role === "admin") {
      isAdmin = true;
    }

    const comentarios = await Comment.find({ manga: mangaId }).populate("user");
    const user = await User.findById(req.session.user._id);

    let liked = false;
    if (user.likes.includes(req.params.mangaId)) {
      liked = true;
    }

    const likesCounter = await User.find({ likes: mangaId }).countDocuments();

    const mangaResponse = await Manga.findById(mangaId);
    const allMangabyGenreArray = await Manga.find({
      genre: mangaResponse.genre,
    });

    const objetosAleatorios = [];
    const availableIndices = [...Array(allMangabyGenreArray.length).keys()];

    while (objetosAleatorios.length < 3 && availableIndices.length > 0) {
      const indiceAleatorioIndex = Math.floor(
        Math.random() * availableIndices.length
      );
      const indiceAleatorio = availableIndices[indiceAleatorioIndex];

      objetosAleatorios.push(allMangabyGenreArray[indiceAleatorio]);
      availableIndices.splice(indiceAleatorioIndex, 1);
    }
    
    while (objetosAleatorios.length < 3 && availableIndices.length > 0) {
      const indiceAleatorio = getRandomUniqueIndex(availableIndices);
      objetosAleatorios.push(allMangabyGenreArray[indiceAleatorio]);
    }
    
    console.log(objetosAleatorios);
   
    
    
    
    
    
    

    res.render("tomo.hbs", {
      manga: mangaResponse,
      isAdmin,
      isLogged,
      objetosAleatorios,
      comentarios,
      liked,
      likesCounter,
    });
  } catch (error) {
    console.log(error); 
    res.render("errorPage.hbs", {
      errorMessage: "An error occurred while fetching the manga.",
    });
  }
});

//Ruta del buscador
router.get("/search", isLoggedIn, (req, res, next) => {
  let isLogged = true;
  console.log(req.query);
  Manga.find({ title: { $regex: req.query.search } })
    .then((foundManga) => {      
      res.render("tomo-details.hbs", {
        foundManga,
        isLogged,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//Ruta para Generos
router.get("/generos", isLoggedIn, (req, res, next) => {
  let mangaId = req.params.mangaId;
  console.log(mangaId);

  let isLogged = true;

  Manga.findById(mangaId)
    .then((response) => {
      console.log(response);
      res.render("generos.hbs", {
        manga: response,
        isLogged,
      });
    })
    .catch((error) => {
      next(error);
    });
});


//RUTA para los detalles-genero
router.get("/detalles-genero/:generoID", isLoggedIn, (req, res, next) => {
  let genero = req.params.generoID;
  let isLogged = true;
  console.log(genero);

  Manga.find({ genre: genero })
    .then((response) => {
      console.log(response);
      res.render("genero-details.hbs", {
        manga: response,
        isLogged
        
      });
    })
    .catch((error) => {
      next(error);
    });
});



module.exports = router;
