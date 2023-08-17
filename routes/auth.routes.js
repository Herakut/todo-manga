const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User.model.js");
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", async (req, res, next) => {
  console.log(req.body)
  const { username, email, password } = req.body;

  if (username === "" || email === "" || password === "") {
    res.status(400).render("auth/signup.hbs", {
      errorMessage: "Todos los campos deben estar llenos",
    });
    return; // detener la ejecucion de la ruta
  }

  // Validación para comprobar que la contraseña cumple unos requisitos
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\/\\])(?=.{8,})/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).render("auth/signup.hbs", {
      errorMessage:
        "La contraseña debe tener al menos una mayúscula, una minúscula, un caracter especial y tener 8 caracteres o más",
    });
    return;
  }

  // Creación del usuario
  try {
    // Validacion para comprobar que el usuario no está duplicado
    const foundUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (foundUser !== null) {
      res.status(400).render("auth/signup.hbs", {
        errorMessage:
          "Ya existe un usuario con ese nombre de usuario o correo electronico",
      });
      return;
    }

    // Cifrado de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await User.create({
      username: username,
      email: email,
      password: passwordHash,
    });

    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

// GET "/auth/login" => renderiza al usuario un formulario de acceso
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST "/auth/login" => recibir las credenciales del usuario y validarlo/autenticarlo
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });
    console.log("foundUser", foundUser);
    if (foundUser === null) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Usuario no existe con ese correo",
      });
      return; // detener la ejecucion de la ruta
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    console.log(isPasswordCorrect); // true or false

    if (isPasswordCorrect === false) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Contraseña no valida",
      });
      return; // detener la ejecucion de la ruta
    }

    req.session.user = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };

    req.session.save(() => {
      // Si todo sale bien...
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});







module.exports = router;


