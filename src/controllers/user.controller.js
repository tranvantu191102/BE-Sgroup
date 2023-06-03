const { knexConnection } = require("../database/knex");
const userServices = require("../services/user.service");

const createUser = async (req, res) => {
  const { id } = req.payload;
  const userData = await userServices.createUser({ ...req.body, id });
  if (userData.statusCode === 500) {
    return res.status(500).json({
      message: userData.message,
    });
  }
  if (userData.statusCode === 400) {
    return res.status(400).json({
      message: userData.message,
    });
  }
  return res.status(200).json({
    data: userData,
  });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = await userServices.updateUser({ ...req.body, id });
  if (userData.statusCode === 500) {
    return res.status(500).json({
      message: userData.message,
    });
  }
  if (userData.statusCode === 400) {
    return res.status(400).json({
      message: userData.message,
    });
  }
  return res.status(200).json({
    data: userData,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userData = await userServices.deleteUser(id);
  if (userData.statusCode === 500) {
    return res.status(500).json({
      message: userData.message,
    });
  }
  if (userData.statusCode === 400) {
    return res.status(400).json({
      message: userData.message,
    });
  }
  return res.status(200).json({
    data: userData,
  });
};

const getUsers = async (req, res) => {
  const { search, page, limit } = req.query;
  const limitRow = limit || 5;
  const userData = await userServices.getUsers({ search, page, limitRow });
  if (userData.statusCode === 500) {
    return res.status(500).json({
      message: userData.message,
    });
  }
  if (userData.statusCode === 400) {
    return res.status(400).json({
      message: userData.message,
    });
  }
  return res.status(200).json({
    data: userData,
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
