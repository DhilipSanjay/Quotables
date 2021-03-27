<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-type');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
 }  

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/config/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Auth.php'); 
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

// To fetch tags
$Tags = new Tags($conn);

// Check if POST data exists
if($data){
    try{
        $uid = $data->uid;
        $username = $data->username;
        $email = $data->email;

        // Verify JWT token
        if($Auth->verifyToken($uid, $username, $email)){
            // Fetch all the tags of the user
            $tagsResult = $Tags->readUserTags($uid);
            $tagsArray = array();
        
            while($row = $tagsResult->fetch_assoc())
            {
                $tagsArray[] = $row;
            }
            
            // Check if user has any tags
            if(sizeof($tagsArray) > 0){
                // Convert to JSON
                $tagsJson = json_encode($tagsArray);
                echo $tagsJson;
            }
            else{
                echo json_encode(
                    array(
                        "title"=>"Message",
                        "message"=>"You don't have any tags!"
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
    // Token verification failed
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
else{
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No request data found!"
        )
    );
}
?>