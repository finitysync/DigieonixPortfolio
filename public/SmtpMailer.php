<?php
class SmtpMailer {
    private $host;
    private $port;
    private $user;
    private $pass;
    private $encryption;
    
    public function __construct($host, $port, $user, $pass, $encryption = 'tls') {
        $this->host = $host;
        $this->port = $port;
        $this->user = $user;
        $this->pass = $pass;
        $this->encryption = $encryption;
    }
    
    public function send($to, $subject, $body, $fromEmail, $fromName = '') {
        $socket = null;
        if ($this->encryption == 'ssl') {
            $socket = fsockopen("ssl://" . $this->host, $this->port, $errno, $errstr, 15);
        } else {
            $socket = fsockopen($this->host, $this->port, $errno, $errstr, 15);
        }
        
        if (!$socket) {
            return false;
        }

        $this->readResponse($socket);

        // EHLO
        fputs($socket, "EHLO " . $this->host . "\r\n");
        $this->readResponse($socket);

        if ($this->encryption == 'tls') {
            fputs($socket, "STARTTLS\r\n");
            $this->readResponse($socket);
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            fputs($socket, "EHLO " . $this->host . "\r\n");
            $this->readResponse($socket);
        }

        // AUTH
        fputs($socket, "AUTH LOGIN\r\n");
        $this->readResponse($socket);
        fputs($socket, base64_encode($this->user) . "\r\n");
        $this->readResponse($socket);
        fputs($socket, base64_encode($this->pass) . "\r\n");
        $authRes = $this->readResponse($socket);
        if (strpos($authRes, '235') === false) {
            return false; // Auth failed
        }

        // MAIL FROM
        fputs($socket, "MAIL FROM: <" . $this->user . ">\r\n");
        $this->readResponse($socket);

        // RCPT TO
        fputs($socket, "RCPT TO: <" . $to . ">\r\n");
        $this->readResponse($socket);

        // DATA
        fputs($socket, "DATA\r\n");
        $this->readResponse($socket);

        $message  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <" . $fromEmail . ">\r\n";
        $message .= "To: " . $to . "\r\n";
        $message .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $message .= "MIME-Version: 1.0\r\n";
        $message .= "Content-Type: text/html; charset=UTF-8\r\n";
        $message .= "\r\n";
        $message .= $body . "\r\n";
        $message .= ".\r\n";

        fputs($socket, $message);
        $res = $this->readResponse($socket);
        
        fputs($socket, "QUIT\r\n");
        fclose($socket);

        return strpos($res, '250') !== false;
    }

    private function readResponse($socket) {
        $data = "";
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) == " ") {
                break;
            }
        }
        return $data;
    }
}
?>
