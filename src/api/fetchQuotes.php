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
        
            // Fetch quotes and authors
            $quotesQuery = "SELECT qid, quote, author FROM quotes WHERE uid = ?";
            $stmt = $conn->prepare($quotesQuery);
            $stmt->bind_param("i", $uid);
            $stmt->execute();
            $quotesResult = $stmt->get_result();
            $quotesArray = array();
        
            while($row = $quotesResult->fetch_assoc())
            {
                $quotesArray[] = $row;
            }
            $stmt->close();

            // If quotes exist, Fetch the tags of quotes
            if(sizeof($quotesArray) > 0){
                $tagQuery = "SELECT tagid, tagname from quotes_tags natural join tags where qid = ?";
                $stmt = $conn->prepare($tagQuery);

                for ($i = 0; $i < count($quotesArray); $i++)
                {
                    $stmt->bind_param("i", $quotesArray[$i]["qid"]);
                    $stmt->execute();
                    $tagResult = $stmt->get_result();
                    $tagArray = array();
            
                    while($row = $tagResult->fetch_assoc())
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