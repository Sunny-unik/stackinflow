const tagSchema = require("../models/tagSchema");

const tagController = {
  listTags: async (req, res) => {
    tagSchema
      .find()
      .sort({ questionCount: -1 })
      .then((tags) => res.send({ msg: tags.length, data: tags }))
      .catch((err) => res.status(500).send(err));
  },

  countTags: async (req, res) => {
    tagSchema
      .countDocuments(
        req.query.search
          ? { name: { $regex: req.query.search, $options: "i" } }
          : {}
      )
      .then((count) => res.send({ msg: "success", data: count }))
      .catch((err) => res.status(500).send(err));
  },

  tagsPerPage: async (req, res) => {
    const [limit, page, type] = [
      +req.query.limit || 30,
      +req.query.page || 0,
      req.query.type || "popular"
    ];
    const sortBy = {
      popular: { questionsCount: -1 },
      newest: { createdAt: -1 },
      name: { name: 1 }
    };
    tagSchema
      .find()
      .sort(sortBy[type] || sortBy["popular"])
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .then((tags) => res.send({ data: tags, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  },

  tagsSearch: async (req, res) => {
    const { search, limit, page } = req.query;
    const { askedTags } = req.body;
    tagSchema
      .find({
        $and: [
          { name: { $regex: search || "", $options: "i" } },
          { name: { $nin: askedTags || [] } }
        ]
      })
      .limit((+limit || 20) * 1)
      .skip((+page || 0) * 1 * (+limit || 20))
      .sort({ questionsCount: -1, _id: 1 })
      .then((tags) => res.send({ data: tags, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  }
};

module.exports = tagController;
