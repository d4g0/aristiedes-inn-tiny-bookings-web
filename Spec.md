## Anatomy

### Basket
The place to keep client orders

```js

var basket = {
    search_dates: { start_date : '', end_date:'' },
    rooms:[RoomItem]
}

```

### Listings
The Search Results Unit

```js

var Listings = [RoomItem]


var RoomItem = {
    id: 234,
    hotel_id: 176,
    room_name: "69fe1219-8",
    night_price: "10",
    capacity: 2,
    number_of_beds: 1,
    created_at: "2022-04-26 03:16:46",
    room_type_id: 103,
    room_type_key: "bfe2b40e-6",
    room_pictures: [{ room_picture_id: 28, filename: "supper-foo-picture" }],
    room_amenities: [{ amenity_id: 39, amenity: "06d9fae7-2" }],
};
```