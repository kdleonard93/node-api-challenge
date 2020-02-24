const actionData = require("../helpers/actionModel");

function validateActionData() {
  return (req, res, next) => {
    if (!req.body.name) {
      // if we return, function doesn't move on to "next".
      // it cancels the middleware stack and returns a response immediately
      return res.status(400).json({
        message: "Missing hub name"
      });
    } else if (!req.body.description || !req.body.notes) {
      res.status(400).json({
        message: "missing fields"
      });
    } else {
      next();
    }
  };
}

function validateActionId(idParam) {
  return (req, res, next) => {
    actionData
      .findById(req.params.id)
      .then(actionData => {
        if (actionData) {
          // attach a value to our request, so it's available
          // in other middleware functions
          req.actionData = actionData;

          next(); // move to the route handler, or next piece of middleware
        } else {
          res.status(404).json({
            message: "Action data not found"
          });
        }
      })
      .catch(error => {
        // calling next with a parameter will move directly to the error middleware,
        // defined in our index.js at the bottom of the stack
        next(error);
      });
  };
}

module.exports = {
  validateActionData,
  validateActionId
};
