<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-Type: application/json');
error_reporting(0);
try{
    require("dbconnect.php");

    $uid = $_GET["uid"]; //this is the uid of the user currently logged in

    $quotesQuery = "SELECT qid, quote, author FROM quotes WHERE uid = " . $uid;
    $quotesResult = mysqli_query($conn, $quotesQuery);
    $quotesArray = array();

    while($row =mysqli_fetch_assoc($quotesResult))
    {
        $quotesArray[] = $row;
    }

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
    return $quotesJson;

}

catch(Exception $e){
    $error = json_encode(["Error" => "Cannot connect to the database"]);
    print($error);
    return $error;
}

?>