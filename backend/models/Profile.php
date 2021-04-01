<?php

class Profile{
    private $conn;
    // Table name
    private $table = 'users';

    // Field names
    public $uid;
    public $username;
    public $email;
    public $bio;

    // Constructor
    public function __construct($conn){
        $this->conn = $conn;
    }

    // Read user profile
    public function read($uid){
        // Query
        $userQuery = 'SELECT
                        username, 
                        email, 
                        bio 
                    FROM 
                        ' . $this->table . ' 
                    WHERE
                        uid = ?';
            
        // Prepare statement
        $stmt = $this->conn->prepare($userQuery);

        // Bind parameters
        $stmt->bind_param("i", $uid);
        
        // Execute query
        $stmt->execute();

        // Fetch Results
        $result = $stmt->get_result();

        // Fetch row
        $row = $result->fetch_assoc();
        
        // Close the statement
        $stmt->close();

        // Set the properties
        if($row){
            $this->uid = $uid;
            $this->username = $row['username'];
            $this->email = $row['email'];
            $this->bio = $row['bio'];

            return true;
        }

        // No user profile was fetched
        return false;
    }

    // Create user profile
    public function create($username, $email, $password, $bio){
        $signupQuery = 'INSERT INTO 
                        ' . $this->table . ' 
                            (
                            username, 
                            email, 
                            passwd, 
                            bio)
                        VALUES 
                            (?, ?, ?, ?)';
        
        // Prepare statement
        $stmt = $this->conn->prepare($signupQuery);
        
        // Bind parameters
        $stmt->bind_param("ssss", $username, $email, $password, $bio);

        // Execute query
        if($stmt->execute())
            return true;

        printf("Error: %s\n", $stmt->error);
    
        return false;
    }

    // Update user profile
    public function update($bio, $uid){
        $query = 'UPDATE 
                ' . $this->table . '
                SET
                    bio = ?
                WHERE
                    uid = ?';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        
        // Bind the parameters
        $stmt->bind_param("si", $bio, $uid);

        // Execute the statement
        if($stmt->execute())
            return True;

        printf("Error: %s\n", $stmt->error);

        return false;
    }

}

?>