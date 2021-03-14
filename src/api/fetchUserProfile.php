<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-type');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST, OPTIONS");

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
   if($auth->verifyToken($uid, $username, $email)){
      try{
         $database = new Database();
         $conn = $database->getConnection();
      
         $userQuery = "SELECT username, email, bio FROM users WHERE uid = " . $uid;
         $userResult = mysqli_query($conn, $userQuery);
         $userArray = NULL;
   
         if($row = mysqli_fetch_assoc($userResult))
         {
            $userArray = $row;
         }

         $quotesCountQuery = "SELECT COUNT(*) as quotesCount FROM quotes WHERE uid = " . $uid;
         $quotesCountResult = mysqli_query($conn, $quotesCountQuery);
         if($row = mysqli_fetch_assoc($quotesCountResult))
         {
            $userArray += $row;
         }

         $tagsCountQuery = "SELECT COUNT(*) as tagsCount FROM users NATURAL JOIN tags NATURAL JOIN quotes_tags WHERE uid = " . $uid;
         $tagsCountResult = mysqli_query($conn, $tagsCountQuery);
         if($row = mysqli_fetch_assoc($tagsCountResult))
         {
            $userArray += $row;
         }


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
               "error"=>"Unathorized - Your token did not match the expected token."
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