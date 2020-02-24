## Models
```
User
	first_name
	last_name
	email
	password
	address 
		address 
		city
		state
		zip
		country 


Business
	owner FK: User
	category
	image
	business_name
	about
	address 
		address
		city
		state
		zip
		country


Post
	business FK: Business
	image
	content
	date


Subscription
	following FK: Business
	follower FK: User 

Comment 
	post FK: Post
	commenter FK: User
	content
	date


--Stretch Goal--

Message
	sender FK: User 
	recipient FK: User 
	content
	date 



```
## User Story

* user can register for an account and log in

* user can log out

* user can register their business once they have an account

* user with a business can make posts about products or where to find them

* user with a business can delete their posts

* user with a business can edit their posts

* user can view businesses in their area based on the category they choose 

* user can view a businesses' profile to see a collection of all their posts 
as well as a description of the business

* user can subscribe to businesses to stay updated on their latests posts 
(newsfeed shows posts of businesses user is subscribed to)

* user with or without a business can comment on a post

* user can delete their comments 


--Stretch Goals--

* user can search by keyword for a business  

* user can direct message a business to ask questions 

* delievery/pick up subscription between users and businesses 


## Routes

| Route | HTTP Method | Description |
|:------|:------------|------------:|
|/api/v1/users/register | POST | user register route |
|/api/v1/users/login | POST | user login route |
|/api/v1/users/logout | GET | user logout route |
|/api/v1/posts | GET | post index route |
|/api/v1/posts | POST | post create route |
|/api/v1/posts/<id> | DELETE | post destroy route |
|/api/v1/posts/<id> | PUT | post update route |
|/api/v1/comments/<post_id> | GET | comment index route |
|/api/v1/comments/<post_id> | POST | comment create route |
|/api/v1/comments/<post_id> | DELETE | comment destroy route |
|/api/v1/businesses | GET | business index route |
|/api/v1/businesses/<id> | GET | business show route |
|/api/v1/businesses | POST | business create route |
|/api/v1/businesses/<id> | DELETE | business destroy route |
|/api/v1/businesses/<id> | PUT | business update route |
|/api/v1/subscription/<business_id> | GET | subscription index route |
|/api/v1/subscription/<business_id> | POST | subscription create route |
|/api/v1/subscription/<business_id> | DELETE | subscription destroy route |


## Technologies Used

* React
* Javascript
* Flask
* Python
* Sqlite
* Postgres


