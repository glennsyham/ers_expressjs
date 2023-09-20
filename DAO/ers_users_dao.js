const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

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
        },
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
        },
        ConditionExpression: 'attribute_exists(ers_users_id)',
    }

    return docClient.update(params).promise();
}

// Delete
function deleteUserById(ers_users_id) {
    const params = {
        TableName: 'ers_users',
        Key: {
            ers_users_id
        }
    }

    return docClient.delete(params).promise();
}


module.exports = {
    addUser,
    retrieveUserById,
    updateUserById,
    deleteUserById
};