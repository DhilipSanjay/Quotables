<?php

class Database{
    private $servername="localhost";
    private $database="quotables";
    private $username="root";
    private $password="";

    public $conn;
    
    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn =mysqli_connect($this->servername,
                                        $this->username,
                                        $this->password,
                                        $this->database);
        }
        catch(Exception $e){
            echo  "Cannot connect to the database: " . $e;
        }
        return $this->conn;
    }
}

?>