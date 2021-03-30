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



    // Insert Quotes
    public function quotesInsert($uid, $quote, $author){
        // Query
        $query = 'INSERT INTO
                ' . $this->table . ' 
                    (uid,
                    quote,
                    author)
                VALUES
                    (?, ?, ?)';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bind_param("iss", $uid, $quote, $author);
        
        // Execute query
        if($stmt->execute())
            return true;

        printf("Error: %s\n", $stmt->error);
    
        return false;
    }



    // Insert into Quotes and Tags table
    public function quoteTagInsert($qid, $tagid){
        // Query
        $query = 'INSERT INTO
                    quotes_tags
                    (qid,
                    tagid)
                VALUES
                    (?, ?)';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bind_param("ii", $qid, $tagid);
        
        // Execute query
        if($stmt->execute())
            return true;

        printf("Error: %s\n", $stmt->error);
    
        return false;
    }



    // Fetch quote id of a quote, author
    public function readQuoteId($quote, $author){
        // Query
        $query = 'SELECT 
                    qid 
                FROM 
                    ' . $this->table . ' 
                WHERE 
                    quote = ?
                AND
                    author = ?';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bind_param("ss", $quote, $author);
        
        // Execute query
        $stmt->execute();

        // Fetch results 
        $result = $stmt->get_result();

        // Fetch row
        $row = $result->fetch_assoc();
        
        // Close the statement
        $stmt->close();

        // Change the class variable qid and return true
        if($row){
            $this->qid = $row['qid'];
            return true;
        }

        // No such tag was found -> return false
        return false;
    }   
}

?>