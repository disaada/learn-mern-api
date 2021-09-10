const { validationResult } = require("express-validator");
const Blog = require("../models/blog");

const create = (req, res) => {
  const validate = validationResult(req);

  if (validate.isEmpty()) {
    if (!req.file) {
      const err = new Error("Foto tidak boleh kosong");
      err.status = 400;
      err.data = validate.array();
      throw err;
    } else {
      const {
        body: { title, body },
        file: { path: image },
      } = req;
      const Post = new Blog({ title, body, image });
      Post.save()
        .then((data) => {
          res.status(201).json({ message: "Blog Created", data });
        })
        .catch((err) => console.log(err));
    }
  } else {
    const err = new Error("Inputan tidak sesuai");
    err.status = 400;
    err.data = validate.array();
    throw err;
  }
};

const getAll = (req, res, next) => {
  Blog.find()
    .then((data) => {
      res.status(200).json({ message: "get all Blog success", data });
    })
    .catch((err) => next(err));
};

const getById = (req, res, next) => {
  Blog.findById(req.params.id)
    .then((data) => {
      if (!data) {
        const err = new Error("Data tidak ditemukan");
        err.status = 404;
        throw err;
      } else res.status(200).json({ message: "get Blog success", data });
    })
    .catch((err) => next(err));
};

const edit = (req, res) => {
  if (!req.file) {
    const err = new Error("Foto tidak boleh kosong");
    err.status = 400;
    err.data = validate.array();
    throw err;
  } else {
    const {
      body: { title, body },
      file: { path: image },
      params: { id },
    } = req;

    Blog.findById(id)
      .then((data) => {
        if (data) {
          data.title = title;
          data.body = body;
          data.image = image;

          data.save();
        } else {
          const err = new Error("Data tidak ditemukan");
          err.status = 404;
          err.data = validate.array();
          throw err;
        }
      })
      .then((data) => res.status(201).json({ message: "Blog Updated", data }))
      .catch((err) => next(err));

    const Post = new Blog({ title, body, image });
    Post.save()
      .then((data) => {
        res.status(201).json({ message: "Blog Created", data });
      })
      .catch((err) => console.log(err));
  }
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
};
