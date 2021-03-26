<?php 
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
 }  

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/src/api/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/src/api/auth.php');

$json = file_get_contents('php://input');
$data = json_decode($json);
$auth = new Auth();

if($data){
   $uid = $data->uid;
   $username = $data->username;
   $email = $data->email;

   // Verify JWT token
   if($auth->verifyToken($uid, $username, $email)){
      try{
         $database = new Database();
         $conn = $database->getConnection();
      
         // Fetch user data
         $userQuery = "SELECT username, email, bio FROM users WHERE uid = ?";
         $stmt = $conn->prepare($userQuery);
         $stmt->bind_param("i", $uid);
         $stmt->execute();
         $userArray = NULL;
         
         $userResult = $stmt->get_result();
         if($row = $userResult->fetch_assoc())
         {
            $userArray = $row;
         }
         $stmt->close();

         // Fetch quotes count
         $quotesCountQuery = "SELECT COUNT(*) as quotesCount FROM quotes WHERE uid = ?";
         $stmt = $conn->prepare($quotesCountQuery);
         $stmt->bind_param("i", $uid);
         $stmt->execute();

         $quotesCountResult = $stmt->get_result();
         if($row = $quotesCountResult->fetch_assoc())
         {
            $userArray += $row;
         }
         $stmt->close();

         // Fetch Tags count
         $tagsCountQuery = "SELECT count(DISTINCT tagid) as tagsCount FROM users NATURAL JOIN quotes NATURAL JOIN quotes_tags WHERE uid = ?";
         $stmt = $conn->prepare($tagsCountQuery);
         $stmt->bind_param("i", $uid);
         $stmt->execute();
         
         $tagsCountResult = $stmt->get_result();
         if($row = $tagsCountResult->fetch_assoc())
         {
            $userArray += $row;
         }
         $stmt->close();

         // Check if user array is empty
         if($userArray){
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
           http_response_code(404);
           echo json_encode(
               array(
                   "title"=>"Error",
                   "error"=>"Error occurred. Try again after sometime!"
               )
           );
       }
   }
   else{
       // http_response_code(401);
       echo json_encode(
           array(
               "title"=>"Error",
               "error"=>"Unauthorized - Your token did not match the expected token."
           )
       );
   }   
}
else{
   echo json_encode(
       array(
           "title"=>"Error",
           "error"=>"No request data found!"
       )
   );
}
?>