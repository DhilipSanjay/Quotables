<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST");

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/src/api/dbconnect.php');
$json = file_get_contents('php://input');
$data = json_decode($json);

if($data){
    try{
        $database = new Database();
        $conn = $database->getConnection();

        $email = mysqli_real_escape_string($conn, filter_var($data->email, FILTER_SANITIZE_STRING));
        $password = md5($data->password);
        $username = mysqli_real_escape_string($conn,filter_var($data->username, FILTER_SANITIZE_STRING));
        $bio = mysqli_real_escape_string($conn,filter_var($data->bio, FILTER_SANITIZE_STRING));

        $stmt = $conn->prepare("INSERT INTO users(username, email, passwd, bio) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $username, $email, $password, $bio);
        $stmt->execute();
        $stmt->close();

        echo json_encode(
            array(
                "title"=>"Message",
                "message"=>"User account created successfully!"
            )
        );

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
            "error"=>"No sign up data found!"
        )
    );
 }


?>