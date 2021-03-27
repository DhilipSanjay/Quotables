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
$Auth = new Auth();

// To insert quotes and tags
$Quotes = new Quotes(); 
$Tags = new Tags();

// Check if POST data exists
if($data){
    $uid = $data->uid;
    $username = $data->username;
    $email = $data->email;

    // Verify JWT token
    if($auth->verifyToken($uid, $username, $email)){
        try{
            // Insert code goes here
            
            
        }
        catch(Exception $e){
            echo json_encode(
                array(
                    "title"=>"Error",
                    "error"=>"Error occurred. Try again after sometime!"
                )
            );
          }
    }
    else{
        echo json_encode(
            array(
                "title"=>"Error",
                "error"=>"Unauthorized - Your token did not match the expected token."
            )
        );
    }
}
// No POST data
else {
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No user data found!"
        )
    );
}

?>