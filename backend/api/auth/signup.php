<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, X-Requested-With');

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/config/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Auth.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Profile.php');

// Fetch POST data
$json = file_get_contents('php://input');
$data = json_decode($json);

// Initialize the necessary classes
// For database connection
$database = new Database();
$conn = $database->getConnection();

// To check if email id already exists
$Auth = new Auth();

// To create new account
$Profile = new Profile(); 

// Check if POST data exists
if($data){       
    // Sanitize the user inputs
    $email = mysqli_real_escape_string($conn, filter_var($data->email, FILTER_SANITIZE_STRING));
    $password = md5($data->password);
    $username = mysqli_real_escape_string($conn,filter_var($data->username, FILTER_SANITIZE_STRING));
    $bio = mysqli_real_escape_string($conn,filter_var($data->bio, FILTER_SANITIZE_STRING));

    // Check if the email id is not registered earlier
    if($Auth->checkEmail($email)){
        // Not registered -> register by creating profile.
        if($Profile->create($username, $email, $password, $bio)){      
            echo json_encode(
                array(
                    "title"=>"Message",
                    "message"=>"User account created successfully!"
                )
            );
        }
        // Error occured while creating profile
        else{
                echo json_encode(
                    array(
                        "title"=>"Error",
                        "error"=>"Error occurred. Try again after sometime!"
                    )
                );
        }
    }
    // Email id already registered
    else{
        echo json_encode(
            array(
                "title"=>"Error",
                "error"=>"User account already exists!"
            )
        );
    }
}
// No POST data found
else{
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No sign up data found!"
        )
    );
 }


?>