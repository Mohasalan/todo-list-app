// Define the AngularJS module
angular.module('todoApp', [])
    // Define the controller for the todo application
    .controller('TodoController', function() {
        // Assign the controller instance to a variable for easier reference
        var self = this;

        // Initialize the todos array to store todo items
        self.todos = [];

        // Initialize the newTodo variable to store the text of a new todo item
        self.newTodo = '';

        // Function to add a new todo item
        self.addTodo = function() {
            // Log the value of newTodo to the console
            console.log('Adding new todo:', self.newTodo);

            // Add todo functionality code here
            // For now, let's just push the new todo to the todos array
            self.todos.push({ text: self.newTodo });

            // Clear the input field after adding the todo
            self.newTodo = '';

            // Log the updated todos array to verify
            console.log('Updated todos:', self.todos);
        };

        // Function to remove a todo item
        self.removeTodo = function(todo) {
            // Log the todo item to be removed
            console.log('Removing todo:', todo);

            // Find the index of the todo item in the todos array
            var index = self.todos.indexOf(todo);
            if (index !== -1) {
                // Remove the todo item from the todos array
                self.todos.splice(index, 1);
                // Log the updated todos array after removal
                console.log('Updated todos after removal:', self.todos);
            }
        };
    });
