# Dream Journal
My Dream Journal project is a fully responsive Full Stack CRUD application which allows you to log your dreams and share them publicly with others. It is coded using an Node.js, Express
and Mongoose based back end and fully rendered using the Handlebars templating engine. Users are able to log into the app through Google OAuth 2.0 authentication, with
their registered Google accounts, which will take data such as their name and profile picture and store it in MongoDB along with a unique user ID, plus session storage
using the express-session and connect-mongo modules in Node.js.

![image](https://user-images.githubusercontent.com/101055915/186526526-e64cbfe7-99fc-4772-90c4-83b7737be750.png)

# Features
- Dashboard showing all the dreams a user has logged, both public and private, along with edit and delete functions for each dream
- An add button that allows a user to log a new dream with a title, story and lucid dreaming toggle (WIP)
- A public compendium of dreams from all users, allowing you to view all dreams with a "public" property in MongoDB
- View onky stories from specific users, by clicking on their profile name

![image](https://user-images.githubusercontent.com/101055915/186528633-680208f3-bd55-4dfa-ba53-11bcf7b4fa17.png)

# Things I would like to add
- I need to finish implementing the lucid dream toggle
- I want to allow the user to add tags to a dream and let users view public dream by tag names
- Consider adding more authentication methods such as a field based registration/login and other passport auth methods such as Twitter authentication

# Required modules
express, path, mongoose, dotenv, morgan, express-handlebars, method-override, passport, express-session, connect-mongo

# What I have learned
I have learned how to use Handlebars as a templating engine, which varies a fair amount from others I have used such as EJS, with many features such as built in
helpers that let you integrate data from your model in meaningful ways, plus the ability to craft your own helpers to modify the retrieved data. I have also learned how to
integrate authentication using the passport module and Google OAuth 2.0. I want to extend this functionality to the other CRUD apps I have built as it will allow each user
to have a unique portal when logging into each respective site. Finally, I also used my first CSS framework, by implementing Materialize into my front end, allowing me to build a fast,
modern responsive layout effortlessly. It was a great experience to be able to get amazing results without having to hard-code the CSS, including all of the @media queries
needed for full responsiveness. I would like to use this experience to learn and integrate a different popular framework such as Tailwind or Bootstrap into my next project and get a feel
for the differences and features each framework brings to a project, so I can find which product integrates best into my workflow, while producing the results that match
the wireframes I draft up before I build my front end.
