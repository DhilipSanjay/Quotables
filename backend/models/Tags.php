<?php

class Tags{
    private $conn;
    // Table name
    private $table = 'tags';

    // Field names
    public $tagid;
    public $tagname;

    // Constructor
    public function __construct($conn){
        $this->conn = $conn;
    }

    // Read all tags of a user
    public function readUserTags($uid){
        // Query
        $tagsQuery = 'SELECT DISTINCT 
                        tagid, 
                        tagname 
                    FROM
                        ' . $this->table . '  
                    NATURAL JOIN 
                        quotes 
                    NATURAL JOIN 
                        quotes_tags 
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
        $result = $stmt->get_result();

        // Fetch row
        $row = $result->fetch_assoc();
       
        // Close the statement
        $stmt->close();

        return $row['tagsCount'];
    }

    // Insert Tags
    public function tagsInsert($tagname){
        // Query
        $query = 'INSERT INTO
                ' . $this->table . '
                    (tagname) 
                VALUES
                    (?)';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        // Note - store tags as lower case
        $stmt->bind_param("s", strtolower($tagname));
        
        // Execute query
        if($stmt->execute())
            return true;

        printf("Error: %s\n", $stmt->error);
    
        return false;
    }

    // Fetch tagid of tagname
    public function readTagId($tagname){
        // Query
        $query = 'SELECT 
                    tagid 
                FROM 
                    ' . $this->table . ' 
                WHERE 
                    tagname = ?';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        // Note - Convert to lowercase
        $stmt->bind_param("s", strtolower($tagname));
        
        // Execute query
        $stmt->execute();

        // Fetch results 
        $result = $stmt->get_result();

        // Fetch row
        $row = $result->fetch_assoc();
       
        // Close the statement
        $stmt->close();

        // Change the class variable tagid and return true
        if($row){
            $this->tagid = $row['tagid'];
            return true;
        }

        // No such tag was found -> return false
        return false;
    }


}

?>