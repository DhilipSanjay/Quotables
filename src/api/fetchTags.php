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

            // Fetch all the tags of the user
            $tagsQuery = "SELECT DISTINCT tagid, tagname FROM users natural join quotes_tags natural join tags WHERE uid = ?";
            $stmt = $conn->prepare($tagsQuery);
            $stmt->bind_param("i", $uid);
            $stmt->execute();
            $tagsResult = $stmt->get_result();
            $tagsArray = array();
        
            while($row = $tagsResult->fetch_assoc())
            {
                $tagsArray[] = $row;
            }
            
            // Check if user has any tags
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