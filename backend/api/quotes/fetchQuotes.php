<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-type');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    return 0;    
 }  

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/config/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/backend/models/Auth.php');
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
$Auth = new Auth($conn);

// To fetch quotes and tags
$Quotes = new Quotes($conn); 
$Tags = new Tags($conn);

// Check if POST data exists
if($data){
    try{       
    $uid = $data->uid;
    $username = $data->username;
    $email = $data->email;

    // Verify JWT token
    if($Auth->verifyToken($uid, $username, $email)){
            // Fetch quotes
            $quotesResult = $Quotes->quotesRead($uid);
            $quotesArray = array();
        
            while($row = $quotesResult->fetch_assoc())
            {
                $quotesArray[] = $row;
            }

            // If quotes exist, fetch the tags of quotes
            if(sizeof($quotesArray) > 0){
                for ($i = 0; $i < count($quotesArray); $i++)
                {
                    $tagResult = $Tags->readQuoteTags($quotesArray[$i]["qid"]);
                    $tagArray = array();
            
                    while($row = $tagResult->fetch_assoc())
                    {
                        $tagArray[] = $row;
                    }
            
                    $quotesArray[$i]["tags"] =  $tagArray;
                }
                
                // Convert to JSON
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
// No POST data
else{
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No request data found!"
        )
    );
}

?>