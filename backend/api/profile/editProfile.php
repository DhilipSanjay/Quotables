<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
 }  

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

// To verify token
$Auth = new Auth($conn);

// To edit user profile
$Profile = new Profile($conn);

// Check if POST data exists
if($data){
   try{
      $uid = $data->uid;
      $username = $data->username;
      $email = $data->email;
      $bio = $data->bio;
      
      // Users can change their bio only
      // Changing username requires reissue of JWT token
      // Or the user must be logged out after changing username
      $newbio = $data->newbio;

      // Verify JWT token
      if($Auth->verifyToken($uid, $username, $email)){
         
         // Check if user profile exists
        if($Profile->read($uid)){

            // Update user profile
            if($Profile->update($newbio, $uid)){
                echo json_encode(
                    array(
                        "title"=>"Message",
                        "message"=>"User bio edited successfully!"
                    )
                );
            }
            // Error occured while creating profile
            else{
                echo json_encode(
                    array(
                        "title"=>"Error",
                        "error"=>"Error occurred. User bio not edited!"
                    )
                );
            }
        }
        else{
        echo json_encode(
                array(
                    "title"=>"Message",
                    "message"=>"User information not found!"
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
// No POST data found
else{
   echo json_encode(
       array(
           "title"=>"Error",
           "error"=>"No request data found!"
       )
   );
}
?>