import {collection as CollectionActions} from 'cerebellum/actions';

const userActions = {
  ...CollectionActions()
};

const linkActions = {
  ...CollectionActions()
};

const tagActions = {
  ...CollectionActions()
};

const linkFormActions = {
  selectLink(state, selectedLink={}) {
    return {
      ...state,
      selectedLink: selectedLink
    };
  },
  setErrors(state, response) {
    return {
      ...state,
      errors: Object.keys(response.errors).map(key => response.errors[key].message)
    };
  },
  clearErrors(state) {
    return {...state, errors: []};
  },
  clear(state) {
    return {
      ...state,
      selectedLink: {
        title: "",
        url: "",
        tags: "",
        _id: null
      },
      errors: []
    };
  },
  update(state, key, value) {
    return {
      ...state,
      selectedLink: {
        ...state.selectedLink,
        [key]: value
      }
    };
  }
};

export default {
  links: linkActions,
  tags: tagActions,
  users: userActions,
  linkForm: linkFormActions
};
