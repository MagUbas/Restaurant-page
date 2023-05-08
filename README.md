# Generic Restaurant Webpage
![Restaurant_page2](https://user-images.githubusercontent.com/105423536/176177922-ab1f9a18-a7b9-428a-b55d-4ae1ab6fa8e6.gif)

## Motivations  
I wanted to create a page that could exist somewhere as a 'real' restaurant ordering page.  <br />
My goal was to: <br />
 - Teach myslef how to work in React in connection with Redux
 - Make something useful
 
## Project info
As a technological stack I've used React for functional implementation, Redux for state management and Firebase as a database.<br />

Main features:
  * Dynamic layouts that adjust based on the screen/window size
  * Working ordering mechanism:
    * Order basket
    * Summary page
    * Order form with field validation
  * Quick shortcuts
  * Sidebar with additional info and links
  * Backend prepared with Firebase
    * Accounts
      * Ability to log in and create new accounts
      * View of previous orders with ability to reorder
      * Password management
    * Restaurant menu
  * Automatic logout after set time
  * Order form contains field validation
  
  ### Additional details
My own implementation of react hooks (with use of Fetch API) was required for data related actions (fetching, sending to database).

## How to run this project  
```
git clone https://github.com/MagUbas/Restaurant-page

npm install

npm start / npm run build
```

 
 
 
 
