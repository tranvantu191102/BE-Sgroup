const router = require("express").Router();
const pollControllers = require("../controllers/poll.controller");
const { verifyAccessToken } = require("../middlewares/jwt");

router.post("/", [verifyAccessToken], pollControllers.createPoll);
router.delete("/:pollId", [verifyAccessToken], pollControllers.deletePoll);
router.get("/:pollId", [verifyAccessToken], pollControllers.getPoll);
router.put("/:pollId", [verifyAccessToken], pollControllers.updatePoll);
router.put(
  "/new-option/:pollId",
  [verifyAccessToken],
  pollControllers.addNewOption
);
router.put(
  "/edit-option/:optionId",
  [verifyAccessToken],
  pollControllers.editOption
);
router.delete(
  "/delete-option/:optionId",
  [verifyAccessToken],
  pollControllers.removeOption
);
router.post(
  "/submit-option",
  [verifyAccessToken],
  pollControllers.submitOption
);
router.post(
  "/un-submit-option",
  [verifyAccessToken],
  pollControllers.unSubmitOption
);

module.exports = router;
