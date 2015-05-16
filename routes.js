import React from 'react';
import Index from './components/index.jsx';
import Profile from './components/profile.jsx';
import Tags from './components/tags.jsx';

export default {
  "/": Index,
  "/profile": Profile,
  "/tags": Tags,
  "/tags/:id": Tags
};
