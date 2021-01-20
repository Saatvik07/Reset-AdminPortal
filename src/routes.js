import React from 'react';

const newAdminLogin = React.lazy(()=> import("./views/Login/NewAdminLogin"));
const addAvailability = React.lazy(() => import('./views/addAvailability/addAvailability'));
const addCategory = React.lazy(()=> import("./views/addCategory/addCategory"));
const addKeyword = React.lazy(()=>import("./views/addKeyword/addKeyword"));
const addFilter = React.lazy(()=>import("./views/addFilter/addFilter"));
const addNewGuru = React.lazy(()=>import("./views/addNewGuru/addNewGuru"));
const addNewVideo = React.lazy(()=>import("./views/addNewVideo/addNewVideo"));
const updateGuru = React.lazy(()=>import("./views/updateGuru/updateGuru"));
const viewAllGurus = React.lazy(()=>import("./views/viewAllGurus/viewAllGurus"));
const signIn = React.lazy(()=>import("./views/Login/Login"));
const routes = [
  {
    path: '/add-availability',
    component: addAvailability
  },
  {
    path: '/add-category',
    component: addCategory
  },
  { path: '/add-keyword',
    component: addKeyword
  },
  { path:"/add-filter",
    component:addFilter
  },
  {
    path: '/add-new-guru',
    component: addNewGuru
  },
  {
    path: '/add-new-video',
    component: addNewVideo
  },
  {
    path: '/update-guru',
    component: updateGuru
  },
  {
    path: '/view-all-guru',
    component: viewAllGurus
  },
  {
    path: "/",
    component: signIn
  },
  {
    path:"/new-admin-login",
    component: newAdminLogin
  }
];

export default routes;
