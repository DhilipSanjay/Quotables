<?php

class Quotes{
    private $conn;
    // Table name
    private $table = 'quotes';

    // Field names
    public $qid;
    public $quote;
    public $author;

    // Constructor
    public function __construct($conn){
        $this->conn = $conn;
    }

    // Read all quotes of a user
    public function read($uid){
        // Query
        $quotesQuery = 'SELECT 
                            qid, 
                            quote, 
                            author 
                        FROM 
                            ' . $this->table . ' 
                        WHERE 
                            uid = ?';
            
        // Prepare statement
        $stmt = $this->conn->prepare($quotesQuery);

        // Bind parameters
        $stmt->bind_param("i", $uid);
        
        // Execute query
        $stmt->execute();
       
        return $stmt->get_result();
    }

    // Read total quotes count of a user
    public function quotesCount($uid){
        // Query
        $quotesCountQuery = 'SELECT 
                                COUNT(*) as quotesCount 
                            FROM 
                                ' . $this->table . '  
                            WHERE 
                                uid = ?';
        
        // Prepare statement
        $stmt = $this->conn->prepare($quotesCountQuery);

        // Bind parameters
        $stmt->bind_param("i", $uid);
        
        // Execute query
        $stmt->execute();

        // Fetch results 
        $result = $stmt->get_result();

        // Fetch row
        $row = $result->fetch_assoc();
       
        // Close the statement
        $stmt->close();

        return $row['quotesCount'];
    }


}

?>