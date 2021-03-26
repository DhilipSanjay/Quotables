<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Authorization, Content-type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, X-Requested-With');

include_once($_SERVER['DOCUMENT_ROOT']. '/Quotables/src/api/dbconnect.php');
$json = file_get_contents('php://input');
$data = json_decode($json);

if($data){
    try{
        $database = new Database();
        $conn = $database->getConnection();
        
        // Sanitize the user inputs
        $email = mysqli_real_escape_string($conn, filter_var($data->email, FILTER_SANITIZE_STRING));
        $password = md5($data->password);
        $username = mysqli_real_escape_string($conn,filter_var($data->username, FILTER_SANITIZE_STRING));
        $bio = mysqli_real_escape_string($conn,filter_var($data->bio, FILTER_SANITIZE_STRING));

        // Check if the email id is already registered
        $checkQuery = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($checkQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $checkResult = $stmt->get_result();
        $stmt->close();
        
        // If not registered, then create new account
        if( $checkResult->num_rows == 0 ){
            $signupQuery = "INSERT INTO users(username, email, passwd, bio) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($signupQuery);
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
        else{
            echo json_encode(
                array(
                    "title"=>"Error",
                    "error"=>"User account already exists!"
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
            "error"=>"No sign up data found!"
        )
    );
 }


?>