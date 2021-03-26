<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, X-Requested-With');

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/src/api/dbconnect.php');

// Get the POST contents 
$json = file_get_contents('php://input');

//JSON decode POST contents
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
            
            
        }
        catch(Exception $e){
            //   http_response_code(404);
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
else {
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No user data found!"
        )
    );
}

?>