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
    -   [x] Search Available offers page []
-   Sing Up [defered]
    -   clients sing up page
-   Login
    -   clients, [defered] 
    -   [x] admins login page


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


## TODOS

-	[x] Evaluate how to put all login logut redirection logic inside store 
-	[x] Make app auth state multitab aware and redirect on change when appropiate



### Admin Dashboard Tasks

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
        - [x] Room deps loader [ 19:24 - 19:46 ] / refactor to composable [ - 21:14 ]
    - [x] Hotel Selector [ - 22:30 ]
    - [x] Create a room [ 23:30 - 24 april 00:24]
    - [ ] Room List (edit menu) [24 april 10:58 - ]
      - [x] `Smart Query Controler` and `Room Sec Edit Menu` rooms data reload on selectedHotel change [ - 12:20 ]
      - [x] Delete a Room [- 17:23]
      - [] Edit a Room
        - [x] Room Type [ - 19:~30 ]
        - [x] Room Amenities [ - 25 april 14:00]
          - [x] new updateARoomIsAmenities backend api [ 11:30 - 00:40]
        - [x] Room Data [- 15:35]
          - [x] Name [- 14:53]
          - [x] Price [14:53 - 15:04]
          - [x] Beds [15:08 - 15:15 ]
          - [x] Capacity [ - 15:35 ]
        - [x] Room Pictures
- [ ] Bookings [13 Jun 01:24 - ]
  - [ ] Create
  - [ ] List
  - [ ] Cancel


#### Bugs
- Home
  - [x] Client Experience Room Image bugs fix  [ 17:23 - 17: 41 ]


#### Questions to answer
- how to reset vuelidate forms to initial state R:{native}[form.reset()]
- when a watch props get's change all the watcher fns have been runned before the prop change againg it's runing  (probably not)