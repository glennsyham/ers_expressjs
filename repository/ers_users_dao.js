const AWS = require('aws-sdk');

// In order to perform AWS operations using the aws-sdk library,
// we need to actually "log in" to AWS through an IAM user
// This would require you to create an IAM user with the appropriate permissions
// for using DynamoDB, and you would need to generate an access key to use to log into that user
// from here

// As previously mentioned a few days ago, aws-sdk will automatically look
// for the access key and secret access key from the following 2 environment variables
// 1. AWS_ACCESS_KEY_ID=<access key value>
// 2. AWS_SECRET_ACCESS_KEY=<secret access key>
// It will use the values of those two environment variables to log in as the IAM user

// You should also set the AWS_DEFAULT_REGION environment variable to the AWS region you are using

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

// CRUD
// Create
// Read
// Update
// Delete

// Create
// addUser function
function addUser(ers_users_id, ers_username, ers_password, user_first_name, user_last_name, user_role_type) {

    const params = {
        TableName: 'ers_users',
        Item: {
            ers_users_id,
            ers_username,
            ers_password,
            user_first_name,
            user_last_name,
            user_role_type
        }
    }

    return docClient.put(params).promise();
};

// Read
// retrieve by id
function retrieveUserById(ers_users_id) {
    const params = {
        TableName: 'ers_users',
        Key: {
            ers_users_id
        }
    }

    return docClient.get(params).promise();
}

// Update

function updateUserById(ers_users_id, ers_password, user_first_name, user_last_name) {
    const params = {
        TableName: 'ers_users',
        Key: {
            ers_users_id
        },
        UpdateExpression: 'set #ers_password = :ers_password, #user_first_name = :user_first_name, #user_last_name = :user_last_name',
        ExpressionAttributeNames: {
            '#ers_password': 'ers_password',
            '#user_first_name': 'user_first_name',
            '#user_last_name': 'user_last_name',
        },
        ExpressionAttributeValues: {
            ':ers_password': ers_password,
            ':user_first_name': user_first_name,
            ':user_last_name': user_last_name
        }
    }

    return docClient.update(params).promise();
}

// Delete
function deleteUserById(grocery_item_id) {
    const params = {
        TableName: 'ers_users',
        Key: {
            grocery_item_id
        }
    }

    return docClient.delete(params).promise();
}


module.exports = {
    addUser,
    retrieveUserById,
    retrieveAllUsers,
    retrieveUsersByCategory,
    updateGroceryNameById,
    deleteUserById
};