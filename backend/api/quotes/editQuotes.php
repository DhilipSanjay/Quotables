<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, X-Requested-With');

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/config/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Auth.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Quotes.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Tags.php');

// Fetch POST data
$json = file_get_contents('php://input');
$data = json_decode($json);

// Initialize the necessary classes
// For database connection
$database = new Database();
$conn = $database->getConnection();

// To verify token
$Auth = new Auth($conn);

// To edit quotes and tags
$Quotes = new Quotes($conn); 
$Tags = new Tags($conn);

// Check if POST data exists
if($data){
    try{
        $uid = $data->uid;
        $username = mysqli_real_escape_string($conn, filter_var($data->username));
        $email = mysqli_real_escape_string($conn, filter_var($data->email));
        $qid = $data->qid;
        $oldquote = mysqli_real_escape_string($conn, filter_var($data->oldquote));
        $oldauthor = mysqli_real_escape_string($conn, filter_var($data->oldauthor));
        $newquote = mysqli_real_escape_string($conn, filter_var($data->newquote));
        $newauthor = mysqli_real_escape_string($conn, filter_var($data->newauthor));

        // Verify JWT token
        if($Auth->verifyToken($uid, $username, $email)){
            // Check if the quote exists in database and it belongs to the authorized user
            if($Quotes->readQuoteId($uid, $oldquote, $oldauthor) && $Quotes->qid === $qid)
            {
                // Edit the quote and author
                // Editing the tags must be added
                if($Quotes->quoteEdit($uid, $qid, $newquote, $newauthor)){
                    echo json_encode(
                        array(
                            "title"=>"Message",
                            "message"=>"Quote edited successfully!"
                        )
                    );
                }
                // Error occured while deleting quote
                else{
                    echo json_encode(
                        array(
                            "title"=>"Error",
                            "error"=>"Error occurred. Quote not edited!"
                        )
                    );
                }
            }
            // Quote id, quote or author mismatch
            else{
                echo json_encode(
                    array(
                        "title"=>"Error",
                        "error"=>"Are you sure it's your quote?"
                    )
                );
            }

        }
        // Token verification failed
        else{
            echo json_encode(
                array(
                    "title"=>"Error",
                    "error"=>"Unauthorized - Your token did not match the expected token."
                )
            );
        }
    }

    catch(Throwable $e){
        echo json_encode(
            array(
                "title"=>"Error",
                "error"=>"Error occurred. Try again after sometime!"
            )
        );
    }
    
}
// No POST data
else {
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No post data found!"
        )
    );
}

?>