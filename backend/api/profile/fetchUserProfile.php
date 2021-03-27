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

// To fetch user profile
$Profile = new Profile();

// To fetch quotes and tags count
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
         $userArray = array();
         
         // Fetch user profile
         if($Profile->read($uid)){
            $userArray['uid'] = $Profile->uid;
            $userArray['username'] = $Profile->username;
            $userArray['email'] = $Profile->email;
            $userArray['bio'] = $Profile->bio;

            // Fetch quotes count
            $userArray['quotesCount'] = $Quotes->quotesCount($uid);

            // Fetch tags count
            $userArray['tagsCount'] = $TAgs->tagsCount($uid);

            $userJson = json_encode($userArray);   
            echo $userJson;
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
      catch(Exception $e){
         echo json_encode(
            array(
                  "title"=>"Error",
                  "error"=>"Error occurred. Try again after sometime!"
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