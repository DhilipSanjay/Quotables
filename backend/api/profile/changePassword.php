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

// To change user password
$Profile = new Profile($conn);

// Check if POST data exists
if($data){
   try{
      $uid = $data->uid;
      $username = mysqli_real_escape_string($conn, filter_var($data->username));
      $email = mysqli_real_escape_string($conn, filter_var($data->email));
      $oldpasswd = md5($data->oldpassword);
      $newpasswd = md5($data->newpassword);

      // Verify JWT token
      if($Auth->verifyToken($uid, $username, $email)){
         
         // Check if user profile exists
        if($Profile->read($uid)){

            // Update user profile
            if($Profile->changePassword($uid, $email, $oldpasswd, $newpasswd)){
                echo json_encode(
                    array(
                        "title"=>"Message",
                        "message"=>"User Password changed successfully!"
                    )
                );
            }
            // Error occured while creating profile
            else{
                echo json_encode(
                    array(
                        "title"=>"Error",
                        "error"=>"Error occurred. User Password not changed!"
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