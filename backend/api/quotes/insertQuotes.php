<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, X-Requested-With');

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

// To insert quotes and tags
$Quotes = new Quotes($conn); 
$Tags = new Tags($conn);

// Check if POST data exists
if($data){
    try{
        $uid = $data->uid;
        $username = $data->username;
        $email = $data->email;
        $quote = $data->quote;
        $author = $data->author;
        $tags = $data->tags;        
        // Verify JWT token
        if($Auth->verifyToken($uid, $username, $email)){
            // Check if quote is not duplicate
            if($Quotes->readQuoteId($quote, $author) === false){
                
                // Insert the quote
                if($Quotes->quotesInsert($uid, $quote, $author)){
                    $Quotes->readQuoteId($quote, $author);
                    $qid = $Quotes->qid;

                    for($i = 0; $i < sizeof($tags); $i++){
                        // Insert into tags if not present
                        $tagname = $tags[$i];
                        if($Tags->readTagId($tagname) === false){
                            $Tags->tagsInsert($tagname);
                            $Tags->readTagId($tagname);
                        }
                        $tagid = $Tags->tagid;

                        // Insert into quotes and tags relation
                        $Quotes->quoteTagInsert($qid, $tagid);
                    }
                    echo json_encode(
                        array(
                            "title"=>"Message",
                            "message"=>"Quote and tags inserted successfully!"
                        )
                    );
                }
                // Error occured while inserting quote
                else{
                    echo json_encode(
                        array(
                            "title"=>"Error",
                            "error"=>"Error occurred. Quote not inserted!"
                        )
                    );
                }
            }
            // Quote already exists
            else{
                echo json_encode(
                    array(
                        "title"=>"Error",
                        "error"=>"Quote already exists!"
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
else {
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No post data found!"
        )
    );
}

?>