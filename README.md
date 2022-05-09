# app

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```


## Planing
-   Lang [done] (setup)
-   Meta [done] (setup)
-   SEO  [done] (setup)
-   Navigation
    -   Public
    -   Client
-   SingUp
-   Login
-   SearchBookings



## Specs

### Navigation

#### Public
-   Home
    -   Search Available offers page
-   Sing Up
    -   clients sing up page
-   Login
    -   clients, admins login page
when a clients logins or singups redirect them to home and use navigation for authenticated clients;

#### Authenticated Client
-   Home
-   Logout
-   Bookings
-   Payments

## Tasks
- Login
  - form [done]
    - errors handling [done]
  - call api [done]
    - errors handling [done]
  - procced with redirections to client or admin space [one]
  - session recovery hanling [one]
  - pages middlewares


## TODOS
Evaluate how to put all login logut redirection logic inside store

Make app auth state multitab aware and redirect on change when appropiate

[one]
Since home is public when admin ask for to server it get's it back, middleware runs in the server with no admin so it delivers the page normal; favor on mounted handling for admin redirection to his home dashboard
Remove home middleware from public home

[done]
Fix focus styles non show up in non chrome browsers (autoprefixer)
