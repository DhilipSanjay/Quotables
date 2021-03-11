<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Content-Type: application/json');

include("dbconnect.php");

$userid=$_GET["uid"]; //this is the uid of the user currently logged in

$quotesQuery = "SELECT quote, author FROM quotes WHERE uid = " . $uid;
$quotesResult = mysqli_query($conn, $quotesQuery);
$quotesArray = array();

while($row =mysqli_fetch_assoc($quotesResult))
{
    $quotesArray[] = $row;
}

$quotesJson = json_encode($quotesArray);
echo $quotesJson;
return $quotesJson;
