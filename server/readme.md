#Spookyfy
Spookyfy is an app for first group portofolio in phase 2 hacktiv8. This app has:
*RESTFUL endpoint for asset's CRUD operation
*JSON formatted response
*Show Favourite user songs
*Register to this app and login

### RESTFUL endpoints

### GET all songs
>FIND ALL SONGS

_REQUEST HEADER_
```
{
    "token" : "<your access token>"
}
```

_REQUEST BODY_
```
not needed
```

_Response(200 - OK)_
```

{
    "songs": [
        {
            "id": 1,
            "title": "bad guy",
            "artist": "billie eilish",
            "picture": "https://en.wikipedia.org/wiki/Billie_Eilish#/media/File:Billie_Eilish_2019_by_Glenn_Francis_(cropped)_2.jpg",
            "user_id": 7,
            "createdAt": "2020-10-01T09:42:51.492Z",
            "updatedAt": "2020-10-01T09:42:51.492Z"
        },
        ...
}
```

_Response (401 - Unauthorized)_
```
{
    "errors": [
        "you do not have access to this page"
    ]
}
```

### POST /songs
> CREATE NEW SONGS

_REQUEST HEADER_
```
{
    "token" : "<your access token>"
}
```

_REQUEST BODY_
```
    "title":"<string>"
    "artist":"<string>"
```

_Response(201 - CREATED)_
```
{
    "song": {
        "id": 5,
        "title": "titanic",
        "artist": "celine dion",
        "picture": null,
        "user_id": 7,
        "updatedAt": "2020-10-01T16:49:22.666Z",
        "createdAt": "2020-10-01T16:49:22.666Z"
    }
}
```
_Response (401 - Unauthorized)_
```
{
    "errors": [
        "you do not have access to this page"
    ]
}
```

### DELETE /songs
> DELETE Songs

_REQUEST HEADER_
```
{
    "token" : "<your access token>"
}
```

_REQUEST BODY_
```
not needed
```

_REQUEST PARAMS_
```
{
    "id": "integer"
}
```

_Response(200 - OK)_
```
{
    "msg": "successfully deleted the task"
}
```
_Response (401 - Unauthorized)_
```
{
    "errors": [
        "you do not have access to this page"
    ]
}
```

_Response (404 - Not Found)_
```
{
    "errors": [
        "song not found"
    ]
}
```

### POST /users/register
> CREATE NEW TODO

_REQUEST HEADER_
```
    not needed
```

_REQUEST BODY_
```
    "name":"<string>"
    "email":"<string>"
    "password":"<string>"
```

_Response(201 - CREATED)_
```
{
    "msg": "successfully create new user"
}

_Response (400 - Bad Request)_
```
{
    "errors": [
        "fill in your name",
        "fill in your email",
        "fill in the valid email",
        "fill in the password"
    ]
}
```

```
_Response (400 - Bad Request)_
```
{
    "errors": [
        "this email has been used"
    ]
}
```

### POST /users/login
USER CAN :
> ADD SONGS
> DELETE SONGS

_REQUEST HEADER_
```
{
    "token" : "<your access token>"
}
```

_REQUEST BODY_
```
    "email":<string>
    "password":"<string>"
```


_Response(200 - OK)_
```
{    
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjAxNTcxMzI2fQ.y8n9EjMX4z6xZHXNW7HxBiut3VcKtfRjhskllvbMMhM"
}
```
_Response (401 - Bad Request)_
```
{
    "errors": [
        "invalid email or password"
    ]
}
```

### 3rd PARTY API ###

### GET /weathers/

USER CAN
-GET CURRENT WEATHER INFORMATION

_REQUEST HEADER_
```
{
    not needed
}
```

_REQUEST BODY_
```
    not needed
```


_Response(200 - OK)_
```
{    
     "cities": {
        "coord": {
            "lon": 106.85,
            "lat": -6.21
        },
        "weather": [
            {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
            }
        ],
        ...
}
```
_Response (404 - NOT FOUND)_
```
{
    "errors": [
        "can not get route /weather"
    ]
}
```

### GET /songs/search/:track

USER CAN
-SEARCH SONG AND ADD TO FAVOURITES

_REQUEST PARAMS
```
    "track":string
```

_REQUEST HEADER_
```
{
    "token" : "<your access token>",
    "config.headers.Authorization" : "Bearer <spotify_token>"
}
```

_REQUEST BODY_
```
    NOT NEEDED
```

_Response(200 - OK)_
```
{
    "musicData": {
        "album": {
            "album_type": "album",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU"
                    },
                    "href": "https://api.spotify.com/v1/artists/4gzpq5DPGxSnKTe4SA8HAU",
                    "id": "4gzpq5DPGxSnKTe4SA8HAU",
                    "name": "Coldplay",
                    "type": "artist",
                    "uri": "spotify:artist:4gzpq5DPGxSnKTe4SA8HAU"
                }
            ],
            ...
        }
    }
}
```
_Response (401 - NOT FOUND)_
```
{
    "errors": [
        "Request failed with status code 401"
    ]
}
```

### GET /:artist/:songname

USER CAN
-SEARCH SONG AND GET ITS LYRIC

_REQUEST PARAMS
```
    "artist":string
    "songname":string
```

_REQUEST HEADER_
```
{
    "token" : "<your access token>"
}
```

_REQUEST BODY_
```
    NOT NEEDED
```

_Response(200 - OK)_
```
{
    "lyrics": {
        "lyrics": "I used to rule the world \nSeas would rise when I gave the word \nNow in the morning I sleep alone \nSweep the streets that I used to own\r\nI used to roll the dice \n\nFeel the fear in my enemy's eyes \n\nListen as the crowd would sing: \n\n"Now the old king is dead! \n\nLong live the king!"\n\n\n\nOne minute I held the key \n\nNext the walls were closed on me \n\nAnd I discovered that 
        ..."
    }
}
```
_Response (404 - NOT FOUND)_
```
{
    "errors": [
        "lyrics not found"
    ]
}
```