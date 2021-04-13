<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/config/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Auth.php');

// Fetch POST data
$json = file_get_contents('php://input');
$data = json_decode($json);

// Initialize the necessary classes
// For database connection
$database = new Database();
$conn = $database->getConnection();

// To verify email id and password
$Auth = new Auth($conn);

// Check if POST data exists
if($data){
    try{
        // Sanitize the user inputs   
        $email = mysqli_real_escape_string($conn, filter_var($data->email, FILTER_SANITIZE_STRING));
        $passwd = md5($data->password);
        
        // Verify email id and password
        // If valid credentials -> generate token
        if ($row = $Auth->verifyEmailPassword($email, $passwd)){
            $token = $Auth->generateToken($row['uid'], $row['username'], $row['email']);
            echo json_encode(['userData' => $token]);
        }
        // Invalid credentials
        else{
            echo json_encode(
                array(
                    "title"=>"error",
                    "error"=>"Invalid Credentials!"
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
// No POST data found
else{
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No login data found!"
        )
    );
 }

?>