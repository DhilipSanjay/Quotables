<?php
use \Firebase\JWT\JWT;
require_once('vendor/autoload.php');

class Auth{
    private $secretKey;
    private $serverName;
    private $issuedAt;
    private $expire;


    public function __construct() {
        $this->secretKey  = 'dummy_key';
        $this->issuedAt   = new DateTimeImmutable();
        $this->expire     = $this->issuedAt->modify('+60 minutes')->getTimestamp();
        $this->serverName = "http://localhost";             
    }

    public function getToken($uid, $username, $email){
        $data = [
            'iat'  => $this->issuedAt,         // Issued at: time when the token was generated
            'iss'  => $this->serverName,       // Issuer
            'nbf'  => $this->issuedAt,         // Not before
            'exp'  => $this->expire,           // Expire
            'uid'  => $uid,                    // User ID
            'username' => $username,           // User name
            'email' => $email,                 // Email
        ];

        $jwt = JWT::encode(
                $data,
                $this->secretKey,
                'HS512'
            );
        return array('uid' => $uid, 
                    'username' => $username, 
                    'email' => $email, 
                    'token' => $jwt);
    }

}

?>