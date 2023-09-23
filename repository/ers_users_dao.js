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
        UpdateExpression: 'set #user_role_type = :ers_password, #user_first_name = :user_first_name, #user_last_name = :user_last_name',
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

// Update

function updateUserRoleTypeById(ers_users_id, user_role_type) {
    const params = {
        TableName: 'ers_users',
        Key: {
            ers_users_id
        },
        UpdateExpression: 'set #user_role_type = :user_role_type',
        ExpressionAttributeNames: {
            '#user_role_type': 'user_role_type'
        },
        ExpressionAttributeValues: {
            ':user_role_type': user_role_type
        },
        ConditionExpression: 'attribute_exists(ers_users_id)',
    }

    return docClient.update(params).promise();
}

function retrieveUserByUername(ers_username) {
    const params = {
        TableName: "ers_users",
        IndexName: "ers_username-index",
        KeyConditionExpression:
            "ers_username = :ers_username",
        ExpressionAttributeValues: {
            ":ers_username": ers_username
        },
        ScanIndexForward: false
    }
    return docClient.query(params).promise();
}


module.exports = {
    addUser,
    retrieveUserById,
    updateUserById,
    deleteUserById,
    updateUserRoleTypeById,
    retrieveUserByUername
};