const { knexConnection } = require("../database/knex");

const createPoll = (data) =>
  new Promise((resolve, reject) => {
    try {
      let poll = {};
      const { question, userId, options } = data;
      // console.log(data);

      knexConnection.transaction(function (knex) {
        const dataInsert = {
          question,
          createdBy: userId,
          createdAt: new Date(),
        };

        return knexConnection
          .insert(dataInsert)
          .into("polls")
          .transacting(knex)
          .then((resPoll) => {
            // console.log(resPoll);
            const dataOptionsInsert = options.map((option) => ({
              poll_id: resPoll[0],
              ...option,
            }));
            return knexConnection
              .insert(dataOptionsInsert)
              .into("options")
              .transacting(knex)
              .then((result) => {
                if (!result) {
                  poll.statusCode = 500;
                  poll.message = "Error from server!";
                  return resolve(poll);
                }
                poll.statusCode = 200;
                poll = { ...poll, ...result[0], ...resPoll[0] };
                resolve(poll);
              });
          });
      });
    } catch (error) {
      reject(error);
    }
  });

const deletePoll = (data) =>
  new Promise((resolve, reject) => {
    try {
      let poll = {};
      const { pollId } = data;
      knexConnection("polls")
        .where("id", pollId)
        .del()
        .then((result) => {
          if (!result) {
            poll.statusCode = 500;
            poll.message = "Error from server!";
            return resolve(poll);
          }

          poll.statusCode = 200;
          poll.message = "Deleted!";
          return resolve(poll);
        });
    } catch (error) {
      reject(error);
    }
  });

const getPoll = (data) =>
  new Promise((resolve, reject) => {
    try {
      let poll = {};
      const { pollId } = data;
      if (!pollId) {
        poll.statusCode = 400;
        poll.message = "Missing poll id!";
        return resolve(poll);
      }
      knexConnection
        .select(
          "polls.*",
          knexConnection.raw(
            '(SELECT JSON_ARRAYAGG(JSON_OBJECT("id", id, "title", title)) FROM options WHERE options.poll_id = polls.id) AS options'
          )
        )
        .from("polls")
        .where("polls.id", pollId)
        .then((rows) => {
          if (!rows) {
            poll.statusCode = 500;
            poll.message = "Error from server!";
            return resolve(poll);
          }

          poll.statusCode = 200;
          poll.data = rows[0] || {};
          return resolve(poll);
        });
    } catch (error) {
      reject(error);
    }
  });
const updatePoll = (data) =>
  new Promise((resolve, reject) => {
    try {
      let poll = {};
      const { pollId, question } = data;
      knexConnection("polls")
        .where("id", pollId)
        .then((resPoll) => {
          if (!resPoll) {
            poll.statusCode = 500;
            poll.message = "Error from server!";
            return resolve(poll);
          }

          if (resPoll.length === 0) {
            poll.statusCode = 400;
            poll.message = "Not found the poll!";
            return resolve(poll);
          }

          knexConnection("polls")
            .where("id", pollId)
            .update({ question })
            .then((rows) => {
              if (!rows) {
                poll.statusCode = 500;
                poll.message = "Error from server!";
                return resolve(poll);
              }

              poll.statusCode = 200;
              poll.message = "updated users";
              return resolve(poll);
            });
        });
    } catch (error) {
      reject(error);
    }
  });

const addNewOption = (data) =>
  new Promise((resolve, reject) => {
    try {
      let poll = {};
      const { pollId, title } = data;

      knexConnection
        .insert({
          poll_id: pollId,
          title,
        })
        .into("options")
        .then((result) => {
          if (!result) {
            poll.statusCode = 500;
            poll.message = "Error from server!";
            return resolve(poll);
          }
          poll.statusCode = 200;
          poll = { ...poll, ...result[0] };
          resolve(poll);
        });
    } catch (error) {
      reject(error);
    }
  });

const editOption = (data) =>
  new Promise((resolve, reject) => {
    try {
      let option = {};
      const { optionId, title } = data;
      knexConnection("options")
        .where("id", optionId)
        .then((resOption) => {
          if (!resOption) {
            option.statusCode = 500;
            option.message = "Error from server!";
            return resolve(option);
          }

          if (resOption.length === 0) {
            option.statusCode = 400;
            option.message = "Not found the option!";
            return resolve(option);
          }

          knexConnection("options")
            .where("id", optionId)
            .update({ title })
            .then((rows) => {
              if (!rows) {
                option.statusCode = 500;
                option.message = "Error from server!";
                return resolve(option);
              }

              option.statusCode = 200;
              option.message = "updated option";
              return resolve(option);
            });
        });
    } catch (error) {
      reject(error);
    }
  });

const removeOption = (data) =>
  new Promise((resolve, reject) => {
    try {
      const option = {};
      const { optionId } = data;
      knexConnection("options")
        .where("id", optionId)
        .del()
        .then((result) => {
          if (!result) {
            option.statusCode = 500;
            option.message = "Error from server!";
            return resolve(option);
          }

          option.statusCode = 200;
          option.message = "Deleted!";
          return resolve(option);
        });
    } catch (error) {
      reject(error);
    }
  });

const submitOption = (data) =>
  new Promise((resolve, reject) => {
    try {
      let option = {};
      const { optionId, userId } = data;

      knexConnection("options")
        .select("*")
        .where("id", optionId)
        .then((optionExist) => {
          if (!optionExist) {
            option.statusCode = 500;
            option.message = "Error from server!";
            return resolve(option);
          }

          if (optionExist.length === 0) {
            option.statusCode = 400;
            option.message = "Option not exist!";
            return resolve(option);
          }

          knexConnection
            .insert({
              option_id: optionId,
              user_id: userId,
              time_vote: new Date(),
            })
            .into("user_option")
            .then((result) => {
              if (!result) {
                option.statusCode = 500;
                option.message = "Error from server!";
                return resolve(option);
              }
              option.statusCode = 200;
              option = { ...option, ...result[0] };
              resolve(option);
            });
        });
    } catch (error) {
      reject(error);
    }
  });

const unSubmitOption = (data) =>
  new Promise((resolve, reject) => {
    try {
      let option = {};
      const { optionId, userId } = data;
      knexConnection("user_option")
        .where({
          user_id: userId,
          option_id: optionId,
        })
        .del()
        .then((result) => {
          if (!result) {
            option.statusCode = 500;
            option.message = "Error from server!";
            return resolve(option);
          }

          option.statusCode = 200;
          option.message = "Deleted!";
          return resolve(option);
        });
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  createPoll,
  deletePoll,
  getPoll,
  updatePoll,
  addNewOption,
  editOption,
  removeOption,
  submitOption,
  unSubmitOption,
};
