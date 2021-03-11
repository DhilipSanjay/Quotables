<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-Type: application/json');

include("dbconnect.php");

$uid = $_GET["uid"]; //this is the uid of the user currently logged in

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


$userJson = json_encode($userArray);

echo $userJson;
return $userJson;
?>