const linkReactions = {
  "(create|update) fail": (actions, event) => {
    actions.linkForm.setErrors(event.args[2].data);
  },
  "(create|update) success": (actions, event) => {
    actions.linkFrom.clear();
  }
};

export default {
  links: linkReactions
};
