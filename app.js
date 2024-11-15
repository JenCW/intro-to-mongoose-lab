
//INVOKING THE DEPENDENCIES
//==============================================================================================================================================================

const dotenv = require('dotenv'); // we do this to import the environmental variables from the .env file
dotenv.config(); // we do this to import the environmental variables from the .env file and make them available in our application

const mongoose = require('mongoose'); // we do this to import the mongoose library to connect to MongoDB database and interact with it
const prompt = require('prompt-sync')(); // we do this to import the prompt-sync library to get user input from the console


//GLOBAL VARIABLES
//==============================================================================================================================================================

const Customer = require('./models/customer'); // we do this to import the Customer model from the models/customer.js file we created in a separate file

//FUNCTION TO CONNECT TO THE MONGODB DATABASE
//==============================================================================================================================================================

const connectToDatabase = async () => {//
    try {//
        await mongoose.connect(process.env.MONGODB_URI);// we do this to CONNECT to the MongoDB database using the MONGODB_URI environmental variable
        console.log('Connected to MongoDB');// we do this to DISPLAY a message to the user if the connection to the MongoDB database is successful
    } catch (error) {// we do this to HANDLE ANY ERRORS that occur when connecting to the MongoDB database
        console.error('Error connecting to MongoDB:', error.message);// we do this to DISPLAY an error message to the user if there is an error connecting to the MongoDB database
        process.exit(1);       }   // we do this to EXIT THE APPLICATION if there is an error connecting to the MongoDB database
};


//CRUD OPERATIONS
//==============================================================================================================================================================

const createCustomer = async () => {  // we do this to DEFINE an asynchronous function to CREATE a new customer in the MongoDB database
    const name = prompt('Enter customer name: ');   // we do this TO GET the customer name from the user
    const age = parseInt(prompt('Enter customer age: '));   // we do this TO CONVERT the user input to a number
    const customer = new Customer({ name, age });   // we do this TO CREATE A NEW CUSTOMER OBJECT using the Customer model
    await customer.save();   // we do this to SAVE the new customer to the MongoDB database
    console.log('Customer created:', customer);   // we do this to DISPLAY the newly created customer to the user
}

const viewCustomers = async () => {  // we do this to DEFINE an asynchronous function to VIEW ALL customers in the MongoDB database
    const customers = await Customer.find();   // we do this to RETREIVE ALL CUSTOMERS from the MongoDB database
    console.log('\nList of customers:');   // we do this to DISPLAY a message to the user
    customers.forEach((customer) =>   // we do this to ITERATE OVER each customer and DISPLAY their details
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`)   // we do this to DISPLAY the customer details to the user
    );
};

const updateCustomer = async () => {   // we do this to DEFINE an asynchronous function to UPDATE a customer in the MongoDB database
    await viewCustomers(); // DISPLAY customers for user selection
    const id = prompt('Copy and paste the id of the customer you would like to update here: ');  // we do this to GET THE ID of the customer to update from the user
    const name = prompt('What is the customer’s new name? ');// we do this to GET THE NEW NAME of the customer from the user
    const age = parseInt(prompt('What is the customer’s new age? '));   //  we do this to GET THE NEW AGE of the customer from the user

    const customer = await Customer.findByIdAndUpdate(  // we do this to FIND THE CUSTOMER BY ID and UPDATE their details
        id,  // we do this to FIND THE CUSTOMER BY ID and UPDATE their details
        { name, age },  // we do this to SET THE NEW NAME AND AGE of the customer
        { new: true } // Return the updated document instead of the original document
    );
    if (customer) {  // we do this to CHECK IF THE CUSTOMER WAS FOUND AND UPDATED
        console.log('Customer updated:', customer);  // we do this to DISPLAY the updated customer to the user
    } else { // we do this to HANDLE THE CASE WHERE THE CUSTOMER WAS NOT FOUND
        console.log('Customer not found.');  // we do this to DISPLAY A MESSAGE TO THE USER
    }
};

const deleteCustomer = async () => {    // we do this to DEFINE an asynchronous function to DELETE a customer from the MongoDB database
    await viewCustomers(); // DISPLAY customers for user selection
    const id = prompt('Copy and paste the id of the customer you would like to delete here: ');     // we do this to GET THE ID of the customer to delete from the user
    const result = await Customer.findByIdAndDelete(id);    // we do this to FIND THE CUSTOMER BY ID and DELETE them
    if (result) {   // we do this to CHECK IF THE CUSTOMER WAS FOUND AND DELETED
        console.log('Customer deleted.');         // we do this to DISPLAY A MESSAGE TO THE USER
    } else {
        console.log('Customer not found.');   // we do this to HANDLE THE CASE WHERE THE CUSTOMER WAS NOT FOUND
    }
};
//MENU SYSTEM
//==============================================================================================================================================================

const mainMenu = async () => {  // we do this to DEFINE an asynchronous function to DISPLAY THE MAIN MENU of the application
    let exit = false;   // we do this to DEFINE A VARIABLE TO CONTROL THE APPLICATION LOOP

    while (!exit) {  // we do this to CREATE A LOOP THAT RUNS UNTIL THE USER DECIDES TO EXIT THE APPLICATION
        console.log(`
What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit
        `);

        const choice = parseInt(prompt('Number of action to run: '));  // we do this to GET THE USER'S CHOICE from the menu

        switch (choice) {  // we do this to CHECK THE USER'S CHOICE AND RUN THE APPROPRIATE FUNCTION
            case 1: // we do this to RUN THE FUNCTION TO CREATE A NEW CUSTOMER
                await createCustomer(); // we do this to CALL the createCustomer function to create a new customer in the MongoDB database
                break; // we do this    to EXIT THE SWITCH STATEMENT
            case 2:     // we do this to RUN THE FUNCTION TO VIEW ALL CUSTOMERS
                await viewCustomers();  // we do this to CALL the viewCustomers function to view all customers in the MongoDB database
                break;  // we do this       to EXIT THE SWITCH STATEMENT
            case 3: // we do this to RUN THE FUNCTION TO UPDATE A CUSTOMER
                await updateCustomer(); // we do this to CALL the updateCustomer function to update a customer in the MongoDB database
                break;  // we do this       to EXIT THE SWITCH STATEMENT
            case 4: // we do this to RUN THE FUNCTION TO DELETE A CUSTOMER
                await deleteCustomer(); // we do this to CALL the deleteCustomer function to delete a customer from the MongoDB database
                break;  // we do this       to EXIT THE SWITCH STATEMENT
            case 5: // we do this to EXIT THE APPLICATION
                console.log('Exiting the application...');  // we do this to DISPLAY A MESSAGE TO THE USER
                await mongoose.connection.close(); // Close MongoDB connection
                exit = true;    // we do this to SET THE EXIT VARIABLE TO TRUE TO EXIT THE APPLICATION
                break;  // we do this       to EXIT THE SWITCH STATEMENT
            default:    // we do this to HANDLE INVALID CHOICES
                console.log('Invalid choice. Please select a number between 1 and 5.'); // we do this to DISPLAY A MESSAGE TO THE USER
        }
    }
};

//START APPLICATION
//==============================================================================================================================================================

const startApp = async () => { // we do this to DEFINE an asynchronous function to START THE APPLICATION
    await connectToDatabase();  // we do this to CONNECT TO THE MONGODB DATABASE
    console.log('\nWelcome to the CRM');            // we do this to DISPLAY A WELCOME MESSAGE TO THE USER
    await mainMenu();   // we do this to CALL THE MAIN MENU FUNCTION to display the menu options to the user
};

startApp(); // we do this to CALL the startApp function to start the application































// Call the function for testing
createCustomer(); // we do this to CALL the createCustomer function to test creating a new customer in the MongoDB database
