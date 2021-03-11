<?php

$servername="localhost";
$database="quotables";
$username="root";
$password="";

$conn=mysqli_connect($servername,$username,$password,$database);

if(!$conn)
{
    die("Connection error: " . mysqli_connect_errno());
    //header('location:error.php');
}

mysqli_set_charset($conn,"utf8");
?>