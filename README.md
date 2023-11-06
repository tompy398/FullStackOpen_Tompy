<!--- Reminder that Ctrl + Shift + V to Preview Markdown in VS Code -->
<!--- Emoji for easy copy & paste: ✅ -->

# Part 4
More backend development concepts/implementation with MongoDB  

Might be better to use the REST extension than Postman -- for now  

## a. Structure of backend application, introduction to testing
### Project Structure
Each component is separated into controllers, models, requests, and utils.  
**Controllers** defines the Router object and its functionalities.  
**Models** define the MongoDB database schema.  
**Requests** is a directory for various client requests.  
**Utils** contains the middleware used and miscellanous environment variables. The middlware.js is the main controlling component while it calls upon others.  
There also seems to be a distinction between the application module (app.js) and entry point (index.js).  
You also seem to not have to include the route as it's managed in app.js by called .use('\<URL_Path\>', \<Router_Object\>).  
The .env file must be at the root of the project directory
### Note on exports 
    - Exercise 4.1 ✅
    - Exercise 4.2 ✅
Mongoose's findByIdAndRemove function for the DELETE protocol can't be used right now.
Instead, it's better to use findOneAndDelete & findOneAndUpdate for now.

### Testing Node Applications
    - Exercise 4.3 ✅
    - Exercise 4.4 ✅
    - Exercise 4.5 ✅
    - Exercise 4.6 ✅
    - Exercise 4.7 ✅
## b. Testing the backend
## c. User administration
## d. Token authentication