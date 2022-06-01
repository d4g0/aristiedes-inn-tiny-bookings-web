# Tiny Bookings web client

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
  - pages middlewares [one]
  - Sing Up [one]
    - captcha script loader [one]
    - singup form [one]
    - captcha box [one]
    - api call [one]
    - [9 of may]
  - Search
    - calendar inputs [one]
    - search api [one] --- 15 may
  -  Listings
    - storage
    - render listings --- [one] 16 may
    - select & save to basket  
  - Basket
    - storage
    - handler
    - card
      - removal off particular offers from basket
    - sort [defered]
      - by capacity 
      - by price 
  - Check out page


## Todos
- define what to do when the basket is populated and the user hits the search again
  - posibility 1: keep current basket and compare his elements with new results, if are present keep them if not remove them and show a notice to the user
- Addres the now known fact that luxon months are 1-12 instead native js dates 0-11
  - fix that into search form search api hits

## Task Expantions

### Basket
#### Storage

- Define booking obj initialization [deffer for api integration when pilot deployed]


## Search Days
Make a computed format dates for check-in & check-out dates from `d/m/y` to `mont, day` form.




#### Sing Up
##### singup form
- variables
client_name
  - validation: string().min(1).max(60)
client_last_name
  - validation: string().min(1).max(60)
password: 
  - validation string().min(8).max(24)
email
  - valid email







## TODOS




[one]
Evaluate how to put all login logut redirection logic inside store 

Make app auth state multitab aware and redirect on change when appropiate

[one]
Since home is public when admin ask for to server it get's it back, middleware runs in the server with no admin so it delivers the page normal; favor on mounted handling for admin redirection to his home dashboard
Remove home middleware from public home

[done]
Fix focus styles non show up in non chrome browsers (autoprefixer) was tailwind 3.0.23, downgrade it to .10


### New Tasks

Resources
    Rooms
    Rooms Types
    Amenities
Operations
Rooms
    Create a room
    Delete a Room
    Edit a Room
Rooms Types
    Create RoomType
    Delete RoomType
    Edit RoomType
Amenities
    CreateRoomAmenity
    Edit RoomAMenity
    Delete RoomAmenity


#### Priority map Order
- Rooms Types
  - [x] Create  [29 april 4 - 6pm]
  - [x] List Room Types [29 april 21:32 - 30 april 00:27]
      - [x] List Item
      - [x] Delete RoomType
      - [x] Edit RoomType

- Amenities
    - [x] CreateRoomAmenity [30 april 21:19 - 22:31]
    - [x] List RoomAmenities [30 april 23:00 - 24 april  00:18]
          - [x] Edit RoomAmenity [- 24 april 00:00]
          - [x] Delete RoomAmenity [- 24 april  00:18]
- Rooms
    - [] Rooms Sec 
      - [] Room Sec Entities Loader  [31 april 18:17 - ]
        - [x] how to use pinia in composables [ - 18:59]
        - [x] Room deps loader [ 19:24 - 19:46 ]
    - [] Create a room [31 april  19:48 - ]
      - * wrap create room comp inside  Room_deps_loader and pass `isLoadingdeps` prop
    - [] Delete a Room
    - [] Edit a Room


#### Questions to answer
- how to reset vuelidate forms to initial state