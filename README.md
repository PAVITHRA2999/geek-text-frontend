# Geek Text

Geek Text, online web application bookstore built using the MERN stack.

This web app was developed as a group project for CEN 4010 Software Engineering.

Visit [geek-text.ga](https://www.geek-text.ga/) to see it live.

<!--  
<img alt="demo" src="demo.gif" width="400" height="auto"/>
-->

## Features

| <div style="width:130px">Feature</div>     | Description | <div style="width:230px">Benefit</div> |
| ----------- | ----------- | ----------- |
| Book Browsing and Sorting | Allow user to browse books by genre, top sellers in our book store, and book rating with pagination based on 10 or 20 results. Allow Sort by book title, author, price, book rating, and release date. | Users will have a simple and enjoyable way to discover new books and Authors and sort results. |
| Profile Management | Users can manage their login credentials (ID, password), personal information (name, email address, home address), nickname for book rating and commenting, credit card information (multiple), and shipping address (multiple). Physical addresses, email addresses, and credit card info should be verified as valid. Passwords must meet our current security standards | Users can create and maintain their profiles rather than enter in their information each time they order|
| Shopping Cart | Users can easily access their cart from any page, view the same information displayed in the book list, change the quantity, remove it from their cart or save it for later. A subtotal for all items in their shopping cart should be displayed. Items saved for later should appear below the cart items. | Users can manage items in a shopping cart for immediate or future Purchase |
| Book Details | Display book name, book cover (which can be enlarged when clicked), author and bio, book description, genre, publishing info (publisher, release date, etc.), book rating, and comments. Hyperlink author’s name to a list of other books by the same author. | Users can see informative and enticing details about a book |
| Book Rating and Commenting | For Rating: Use a five-star rating system. Users can rate any book. For Commenting: A single comment should be limited to the number of characters, which can fit within half the browser window (so that there are at least two comments which can appear at the same time). | Users can rate AND comment on books they’ve purchased to help others in their selection |
| Wishlist Management | The wishlist section shows the items that have been added to the list by the user and each item can be added to the cart. Items can be added to the list from the item details page, browser, and cart. Items can be removed from the list in this section. | Users can have a wishlist which can have books moved to the shopping cart. |

## Running Locally
First, make sure the backend is already running locally and a server connection has been established successfully. For instructions on how to run the backend locally please go to [geek-text-backend](https://github.com/LeanetAlfonso/geek-text-backend).

Clone the repo

```
git clone https://github.com/LeanetAlfonso/geek-text-frontend.git
```

Change directory

```
cd geek-text-frontend
```

Install dependencies

```
npm install
```

Add environment variable

```
touch .env
echo REACT_APP_BACKEND_URL={enter_backend_url_here} >> .env
```


Run app

```
npm start
```
