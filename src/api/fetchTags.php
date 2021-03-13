<?php 

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

error_reporting(0);
try{
    include("dbconnect.php");

    $uid = $_GET["uid"]; //this is the uid of the user currently logged in

    $tagsQuery = "SELECT DISTINCT tagid, tagname FROM users natural join quotes_tags natural join tags WHERE uid = " . $uid;
    $tagsResult = mysqli_query($conn, $tagsQuery);
    $tagsArray = array();

    while($row =mysqli_fetch_assoc($tagsResult))
    {
        $tagsArray[] = $row;
    }
    $tagsJson = json_encode($tagsArray);

    echo $tagsJson;
    return $tagsJson;

}
catch(Exception $e){
    $error = json_encode(["Error" => "Cannot connect to the database"]);
    print($error);
    return $error;
}

?>