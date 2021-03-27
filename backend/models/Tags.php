<?php

class Tags{
    private $conn;
    // Table name
    private $table = 'tags';

    // Field names
    public $tagid;
    public $tagname;

    // Constructor
    public function __constructor($conn){
        $this->conn = $conn;
    }

    // Read all tags of a user
    public function readUserTags($uid){
        // Query
        $tagsQuery = 'SELECT DISTINCT 
                        tagid, 
                        tagname 
                    FROM 
                        users 
                    NATURAL JOIN 
                        quotes_tags 
                    NATURAL JOIN 
                        ' . $this->table . ' 
                    WHERE 
                        uid = ?';
        
        // Prepare statement
        $stmt = $this->conn->prepare($tagsQuery);

        // Bind parameters
        $stmt->bind_param("i", $uid);
        
        // Execute query
        $stmt->execute();
       
        return $stmt->get_result();
    }

    // Read all tags of a particular quote
    public function readQuoteTags($qid){
        // Query
        $tagsQuery = 'SELECT 
                        tagid, 
                        tagname 
                    FROM 
                        quotes_tags 
                    NATURAL JOIN 
                        ' . $this->table . ' 
                    WHERE 
                        qid = ?';
        
         // Prepare statement
        $stmt = $this->conn->prepare($tagsQuery);

        // Bind parameters
        $stmt->bind_param("i", $qid);

        // Execute query
        $stmt->execute();

        return $stmt->get_result();
    }

    // Read total tags count of a user
    public function tagsCount($uid){
        // Query
        $tagsCountQuery = 'SELECT 
                            COUNT(DISTINCT tagid) 
                            as tagsCount 
                        FROM 
                            ' . $this->table . ' 
                        NATURAL JOIN 
                            quotes 
                        NATURAL JOIN 
                            quotes_tags 
                        WHERE 
                            uid = ?';
        
        // Prepare statement
        $stmt = $this->conn->prepare($tagsCountQuery);

        // Bind parameters
        $stmt->bind_param("i", $uid);
        
        // Execute query
        $stmt->execute();

        // Fetch results 
        $result = $stmt->fetch_assoc();
       
        // Close the statement
        $stmt->close();

        return $result['tagsCount'];
    }


}

?>