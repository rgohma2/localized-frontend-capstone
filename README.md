## Models
```
User
	-first_name
	-last_name
	-email
	-password
	-address addr1 add2 city state zip 


Business
	-owner FK: User
	-category
	-image
	-business_name
	-products *** 
	-about
	-address(maybe) -- addr1, addr2, city, state, zip


Post
	-business FK: Business
	-image
	-content
	-date


Subscription
	-following FK: Business
	-follower FK: User 

Comment 
	-post FK: POST
	-commenter FK: User
	-content
	-date

--Stretch Goal--

Message
	-sender FK: User 
	-recipient FK: User 
	-content
	-date 



```
## User story
```
-user can register for an account and log in
-user can log out
-user can register their business once they have an account
-user with a business can make posts about products or where to find them 
-user with a business can delete their posts
-user with a business can edit their posts
-user can view businesses in their area based on the category they choose 
-user can view a businesses' profile to see a collection of all their posts 
as well as a description of the business
-user can subscribe to businesses to stay updated on their latests posts (newsfeed shows posts of businesses user is subscribed to)
-user with or without a business can comment on a post 
-user can delete their comments 


--Stretch Goals--

-users can search by keywords for a business  
-users can direct message a business to ask questions 
-delievery/pick up subscription between user and businesses 

```
## Routes
```
/api/v1/users/register (POST) 
/api/v1/users/login (POST)
/api/v1/users/logout (GET)
/api/v1/users/<id> (GET)

/api/v1/posts (GET)
/api/v1/posts (POST)
/api/v1/posts/<id> (DELETE)
/api/v1/posts/<id> (PUT)

/api/v1/comments/<post_id> (GET)
/api/v1/comments/<post_id> (POST)
/api/v1/comments/<post_id> (DELETE)

/api/v1/businesses (GET)
/api/v1/businesses/<id> (GET)
/api/v1/businesses (POST)
/api/v1/businesses/<id> (DELETE)
/api/v1/businesses/<id> (PUT)

/api/v1/subscription/<business_id> (GET)
/api/v1/subscription/<business_id> (POST)
/api/v1/subscription/<business_id> (DELETE)

```
## Technologies Used
```
-React
-Javascript
-Flask
-Python
-Sqlite
-Postgres

```
