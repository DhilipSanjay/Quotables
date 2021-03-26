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
        
            $quotesQuery = "SELECT qid, quote, author FROM quotes WHERE uid = " . $uid;
            $quotesResult = mysqli_query($conn, $quotesQuery);
            $quotesArray = array();
        
            while($row =mysqli_fetch_assoc($quotesResult))
            {
                $quotesArray[] = $row;
            }

            if(sizeof($quotesArray) > 0){
                for ($i = 0; $i < count($quotesArray); $i++)
                {
                    $tagQuery = "SELECT tagid, tagname from quotes_tags natural join tags where qid = " . $quotesArray[$i]["qid"];
                    $tagResult = mysqli_query($conn, $tagQuery);
                    $tagArray = array();
            
                    while($row =mysqli_fetch_assoc($tagResult))
                    {
                        $tagArray[] = $row;
                    }
            
                    $quotesArray[$i]["tags"] =  $tagArray;
                }
                $quotesJson = json_encode($quotesArray);
            
                echo $quotesJson;
            }
            else{
                echo json_encode(
                    array(
                        "title"=>"Message",
                        "message"=>"Start collecting your quotes!"
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