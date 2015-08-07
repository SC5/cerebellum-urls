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
  selectLink: (state, selectedLink={}) => state.update(oldState => {
    return {
      ...oldState,
      selectedLink: selectedLink
    };
  }),
  setErrors: (state, response) => state.update(oldState => {
    return {
      ...oldState,
      errors: Object.keys(response.errors).map(key => response.errors[key].message)
    };
  }),
  clearErrors: (state) => state.update(oldState => {
    return {...oldState, errors: []};
  }),
  clear: (state) => state.update(oldState => {
    return {
      ...oldState,
      selectedLink: {
        title: "",
        url: "",
        tags: "",
        _id: null
      },
      errors: []
    };
  }),
  update: (state, key, value) => state.update(oldState => {
    return {
      ...oldState,
      selectedLink: {
        ...oldState.selectedLink,
        [key]: value
      }
    };
  })
};

export default {
  links: linkActions,
  tags: tagActions,
  users: userActions,
  linkForm: linkFormActions
};
