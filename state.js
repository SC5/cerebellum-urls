import {createState} from 'cerebellum/store';

const initialState = {
  links: {
    "/": []
  },
  users: {
    "/": []
  },
  tags: {
    "/": []
  },
  linkForm: {
    selectedLink: {
      _id: null,
      title: "",
      url: "",
      tags: ""
    },
    errors: []
  }
};

let state = initialState;

// NOTE: client side store state must be only initialized once
// TODO: more elegant solution than checking for window global
if (typeof window !== "undefined") {
  state = createState(initialState);
}

export default state;
