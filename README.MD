# PAPER AIRPLANES

Full Stack Project that allows users to anonymously send and respond to messages with positive messages focused in mental health improvement.

## HOW TO USE

1. Clone this repo.
2. Go to the server folder in the terminal and npm install the dependencies.
3. Got to the client folder in the terminal and npm install the dependencies.
4. Create .env file using the .env-example as a template.<br />
   4.1 (Here is an [Article](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e) about creating databases if needed.)
5. Go to the server folder and start the server side with npm start in the terminal.
6. Go to the client folder and start the client side with npm start in the terminal.
7. To log-in you can use the user peter-griffin@gmail.com, no password is needed.<br />
   7.1 **Obs:** _In order to practice React, the authentication is used with UserContext. So the log-in information does not persist when the page is refreshed. In order to keep logged in, go to /client/UserContext and set the userID to 5_

## FEATURES

1. The user can choose between 3 types of paper airplanes they want to send.

- Looking for advice: Which allow other users to respond to their plane with positive messages and adivices.
- Just Venting: This type does not allow any user to interact with this plane. The idea is to encourage users to let the problems out without worring about getting any response.
- Good Vibes: Sometimes users only want to read good messages in order to be more positive. This type allow users to write inpirational posts so others can read.

!["gif showing the functionality of the types that can be selected"](https://github.com/JohnBorges52/paper-airplanes/blob/master/client/public/types%20demonstration.gif)

2. If necessary, the user is able to delete specific responses they judge as not helpfull. They can do the same thing to their own planes if they want. Regarding planes others wrote, if users find that it is toxic or inapropriate, they can flag it once and after the plane is flagged 3 times, the plane is hidden to everyone.

!["gif showing the delete functionality"](https://github.com/JohnBorges52/paper-airplanes/blob/master/client/public/delete%20function%20demo.gif)

3. Using a TensorFlow Machine Learning model for toxicity detection, toxic messages written are not allowed to be sent. A message appears encouraging the user to be more positive to others.

!["gif showing the toxicity block functionality"](https://github.com/JohnBorges52/paper-airplanes/blob/master/client/public/tensorFlow%20demo.gif)

4. The user has the option to listen to lo-fi music to get inspiration when writing letters by clicking the music icon on the bottom right of the page.

!["gif showing the music functionality"](https://github.com/JohnBorges52/paper-airplanes/blob/master/client/public/music%20function%20demo.gif)

5. Every time a user receive a response on one of their letters the notification number inscreases. If they click on the bell, they will be redirect to their own planes.

## DEPENDENCIES

- Express
- NodeJS
- React
- Postgres
- Material UI
- TensorFlow Machine Learning model for toxicity detection.
