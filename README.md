# Blogging App
This is an api for Blogs

---

## Requirements
1. A user should be able to sign up and sign in into the blog app 
2. User should be able to login with Passport using JWT
3. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
4. Use JWT as authentication strategy and expire the token after 1 hour
5. A blog can be in two states; draft and published
6. Logged in and not logged in users should be able to get a list of published blogs created
7. When a blog is created, it is in draft state.
8. The owner of the blog should be able to update the state of the blog to published
9.  The owner of the blog should be able to delete the blog in draft or published state
10. The owner of the blog should be able to get a list of their blogs. 
   a. The endpoint should be paginated
   b. It should be filterable by state

11. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
12. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, 
  a. default it to 20 blogs per page
  b. It should also be searchable by author, title and tags.
  c. It should also be orderable by read_count, reading_time and timestamp

12. When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1
12. Come up with any algorithm for calculating the reading_time of the blog.
12. Test application

---

## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  email |  string |  required |
|  first_name | string  |  required|
|  last_name  |  string |  optional  |
|  password |   string |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required, unique |
|  description |  date |  required |
|  author | ObjectId  |  required |
|  read_count |  number |  required, default: 0  |
|  reading_time     | string  |  required |
|  tags |   string |  required  |
|  state|  string |  required, enum: ['draft', 'published'], default: 'draft' |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firs_tname": "jon",
  "last_name": "doe"
}
```

---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "email": '"doe@example.com"",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

---




...

## Contributor
- Akanni Agbolahan Babatunde