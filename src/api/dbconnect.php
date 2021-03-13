<?php

$servername="localhost";
$database="quotables";
$username="root";
$password="";

$conn=mysqli_connect($servername,$username,$password,$database);
error_reporting(0);
if(!$conn)
{
    $error = json_encode(["Error" => "Cannot connect to the database"]);
    throw new Exception($error);
}
else{
    $message = json_encode(["Success" => "Connected Succssfully"]);
    mysqli_set_charset($conn,"utf8");
    return $message;
}

?>