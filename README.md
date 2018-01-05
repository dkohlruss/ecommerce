This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Ecommerce Single Page Web App

This app is a sample Ecommerce website -- You are viewing the repo for the front-end of this project. A working copy of this project can be found [here](https://dkohlruss.github.io/ecommerce) (note that the backend for this site is hosted via Heroku's free tier and likely will need to be reloaded after a few seconds in order for data being pulled from the backend API to be properly displayed).

This app includes user login/registration using PassportJS, storing a user's cart via database or via session storage if the user isn't logged in.  Items can be added or removed from their cart -- There is no checkout functionality, of course.

User data along with product data is all stored on a MongoDB database, which is loaded live from the backend via API requets.

Session storage is managed via Redux, with views displayed with React.

## To View

A working copy of this project can be found [here](https://dkohlruss.github.io/ecommerce).  The backend repository can be viewed [here](https://www.github.com/dkohlruss/ecommerce-backend).
