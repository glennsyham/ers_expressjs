const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2'
});

const docClient = new AWS.DynamoDB.DocumentClient();

// Create
// addTicket function
function addTicket(reimb_id, reimb_amount, reimb_description, reimb_author, reimb_resolver, reimb_type) {
    let reimb_submitted = Math.floor(Date.now() / 1000);
    let reimb_status = "pending";
    const item = {
        'reimb_id': reimb_id,
        'reimb_amount': reimb_amount,
        'reimb_description': reimb_description,
        'reimb_submitted': reimb_submitted,
        'reimb_author': reimb_author,
        'reimb_resolver': reimb_resolver,
        'reimb_status': reimb_status,
        'reimb_type': reimb_type,


    };
    const params = {
        TableName: 'ers_reimbursement',
        Item: item,
    }

    return docClient.put(params).promise();
};

// Read
// retrieve by id
function retrieveTicketById(reimb_id) {
    const params = {
        TableName: 'ers_reimbursement',
        Key: {
            reimb_id
        }
    }

    return docClient.get(params).promise();
}

// Update
function updateTicketById(reimb_id, reimb_amount, reimb_description, reimb_type) {
    const params = {
        TableName: 'ers_reimbursement',
        Key: {
            reimb_id
        },
        UpdateExpression: 'set #reimb_amount = :reimb_amount, #reimb_description = :reimb_description, #reimb_type = :reimb_type',
        ExpressionAttributeNames: {
            '#reimb_amount': 'reimb_amount',
            '#reimb_description': 'reimb_description',
            '#reimb_type': 'reimb_type',
        },
        ExpressionAttributeValues: {
            ':reimb_amount': reimb_amount,
            ':reimb_description': reimb_description,
            ':reimb_type': reimb_type,
        },
        ConditionExpression: 'attribute_exists(reimb_id)',
    }

    return docClient.update(params).promise();
}

// Update
function updateTicketStatusById(reimb_id, reimb_status, reimb_resolver) {
    const params = {
        TableName: 'ers_reimbursement',
        Key: {
            reimb_id
        },
        UpdateExpression: 'set #reimb_status = :reimb_status, #reimb_resolver = :reimb_resolver',
        ExpressionAttributeNames: {
            '#reimb_status': 'reimb_status',
            '#reimb_resolver': 'reimb_resolver',
        },
        ExpressionAttributeValues: {
            ':reimb_status': reimb_status,
            ':reimb_resolver': reimb_resolver
        },
        ConditionExpression: 'attribute_exists(reimb_id)',
    }

    return docClient.update(params).promise();
}


// Delete
function deleteTicketById(reimb_id) {
    const params = {
        TableName: 'ers_reimbursement',
        Key: {
            reimb_id
        }
    }

    return docClient.delete(params).promise();
}

// Read
// retrieve by Author
function retrieveTicketByAuthor(reimb_author) {
    const params = {
        TableName: "ers_reimbursement",
        IndexName: "reimb_author-reimb_submitted-index",
        KeyConditionExpression:
            "reimb_author = :reimb_author",
        ExpressionAttributeValues: {
            ":reimb_author": reimb_author
        },
        ScanIndexForward: false
    }
    return docClient.query(params).promise();
}


// Read
// retrieve by Author
function retrieveTicketByStatus(reimb_status) {
    const params = {
        TableName: "ers_reimbursement",
        IndexName: "reimb_status-manager-index",
        KeyConditionExpression:
            "reimb_status = :reimb_status",
        ExpressionAttributeValues: {
            ":reimb_status": reimb_status
        },
        ScanIndexForward: false
    }
    return docClient.query(params).promise();
}


module.exports = {
    addTicket,
    retrieveTicketById,
    updateTicketById,
    updateTicketStatusById,
    deleteTicketById,
    retrieveTicketByAuthor,
    retrieveTicketByStatus
};