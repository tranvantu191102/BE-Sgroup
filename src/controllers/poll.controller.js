const pollServices = require("../services/poll.service");

const createPoll = async (req, res) => {
  const { id } = req.payload;
  const poll = await pollServices.createPoll({ ...req.body, userId: id });

  if (poll.statusCode === 500) {
    return res.status(500).json({
      message: poll.message,
    });
  }
  if (poll.statusCode === 400) {
    return res.status(400).json({
      message: poll.message,
    });
  }
  return res.status(200).json({
    data: poll,
  });
};

const deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { id } = req.payload;
    const poll = await pollServices.deletePoll({ pollId, userId: id });

    if (poll.statusCode === 500) {
      return res.status(500).json({
        message: poll.message,
      });
    }
    if (poll.statusCode === 400) {
      return res.status(400).json({
        message: poll.message,
      });
    }
    return res.status(200).json({
      message: poll.message,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getPoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { id } = req.payload;
    const poll = await pollServices.getPoll({ pollId, userId: id });

    if (poll.statusCode === 500) {
      return res.status(500).json({
        message: poll.message,
      });
    }
    if (poll.statusCode === 400) {
      return res.status(400).json({
        message: poll.message,
      });
    }
    return res.status(200).json({
      data: poll,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { id } = req.payload;
    const { question } = req.body;
    const poll = await pollServices.updatePoll({
      pollId,
      userId: id,
      question,
    });

    if (poll.statusCode === 500) {
      return res.status(500).json({
        message: poll.message,
      });
    }
    if (poll.statusCode === 400) {
      return res.status(400).json({
        message: poll.message,
      });
    }
    return res.status(200).json({
      data: poll,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const addNewOption = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Missing input!",
      });
    }
    const poll = await pollServices.addNewOption({
      pollId,
      title,
    });

    if (poll.statusCode === 500) {
      return res.status(500).json({
        message: poll.message,
      });
    }
    if (poll.statusCode === 400) {
      return res.status(400).json({
        message: poll.message,
      });
    }
    return res.status(200).json({
      data: poll,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const editOption = async (req, res) => {
  try {
    const { optionId } = req.params;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Missing input!",
      });
    }
    const option = await pollServices.editOption({
      optionId,
      title,
    });

    if (option.statusCode === 500) {
      return res.status(500).json({
        message: option.message,
      });
    }
    if (option.statusCode === 400) {
      return res.status(400).json({
        message: option.message,
      });
    }
    return res.status(200).json({
      data: option,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const removeOption = async (req, res) => {
  try {
    const { optionId } = req.params;

    const option = await pollServices.removeOption({
      optionId,
    });

    if (option.statusCode === 500) {
      return res.status(500).json({
        message: option.message,
      });
    }
    if (option.statusCode === 400) {
      return res.status(400).json({
        message: option.message,
      });
    }
    return res.status(200).json({
      data: option,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const submitOption = async (req, res) => {
  try {
    const { optionId } = req.body;
    const { id } = req.payload;

    if (!optionId) {
      return res.status(400).json({
        message: "Missing input!",
      });
    }

    const option = await pollServices.submitOption({
      optionId,
      userId: id,
    });

    if (option.statusCode === 500) {
      return res.status(500).json({
        message: option.message,
      });
    }
    if (option.statusCode === 400) {
      return res.status(400).json({
        message: option.message,
      });
    }
    return res.status(200).json({
      data: option,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const unSubmitOption = async (req, res) => {
  try {
    const { optionId } = req.body;
    const { id } = req.payload;

    if (!optionId) {
      return res.status(400).json({
        message: "Missing input!",
      });
    }

    const option = await pollServices.unSubmitOption({
      optionId,
      userId: id,
    });

    if (option.statusCode === 500) {
      return res.status(500).json({
        message: option.message,
      });
    }
    if (option.statusCode === 400) {
      return res.status(400).json({
        message: option.message,
      });
    }
    return res.status(200).json({
      data: option,
    });
  } catch (error) {
    throw new Error(error);
  }
};

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
