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
        
            $tagsQuery = "SELECT DISTINCT tagid, tagname FROM users natural join quotes_tags natural join tags WHERE uid = " . $uid;
            $tagsResult = mysqli_query($conn, $tagsQuery);
            $tagsArray = array();
        
            while($row =mysqli_fetch_assoc($tagsResult))
            {
                $tagsArray[] = $row;
            }
            
            if(sizeof($tagsArray) > 0){
                $tagsJson = json_encode($tagsArray);
            
                echo $tagsJson;
                return $tagsJson;
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