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

export default {
  links: linkActions,
  tags: tagActions,
  users: userActions
};
