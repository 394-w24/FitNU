
### FitNu

## feature/top-level-view
Basiclly the app right now looks like this:

It is deployed on the firebase
https://fitnu-305a3.web.app


## How to run locally:

``` bash
npm i vite

```

``` bash
npm start

```
and open the URL displayed

## File Purpose

There are 3 component rendered in the root DOM right now: <Header />, <Navbar /> and <Router /> 

# Navbar.jsx,  <Navbar />
Display the three buttons in the lower down

# Header.jsx,  <Header />
Display the FitNU and profile icon in the top

# Router.jsx <Router /> 
For routing purposes, and add the component <PersonalizedView /> to the Dom

# So the basic layout of the app is now

<Header />          

<PersonalizedView />

<Navbar />


Future changes like profile layout and accept reject botton should take place in the <PersonalizedView /> component

Feel free to change any current CSS and content.











