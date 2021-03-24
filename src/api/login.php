<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/src/api/dbconnect.php');
include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/src/api/auth.php');

$json = file_get_contents('php://input');
$data = json_decode($json);

if($data){
    try{
        $database = new Database();
        $conn = $database->getConnection();

        $email = $data->email;
        $password = md5($data->password);

        $query = "SELECT uid, username, email FROM users WHERE email = '$email' AND passwd = '$password'";
        $result = mysqli_query($conn, $query);
        http_response_code(200);
        
        if ($row = mysqli_fetch_assoc($result)){
            $auth = new Auth();
            $token = $auth->generateToken($row['uid'], $row['username'], $row['email']);
            echo json_encode(['userData' => $token]);
        }
        else{
            echo json_encode(
                array(
                    "title"=>"Message",
                    "message"=>"Invalid Credentials!"
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
    echo json_encode(
        array(
            "title"=>"Error",
            "error"=>"No login data found!"
        )
    );
 }

?>