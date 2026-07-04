<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'SmtpMailer.php';

// Load .env variables
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

$host = $_ENV['SMTP_HOST'] ?? '';
$port = $_ENV['SMTP_PORT'] ?? 465;
$user = $_ENV['SMTP_USER'] ?? '';
$pass = $_ENV['SMTP_PASS'] ?? '';
$enc  = $_ENV['SMTP_ENCRYPTION'] ?? 'ssl';
$receiver = $_ENV['SMTP_RECEIVER_EMAIL'] ?? $user;
$sender   = $_ENV['SMTP_SENDER_EMAIL'] ?? $user;

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit;
}

$mailer = new SmtpMailer($host, $port, $user, $pass, $enc);

if (isset($data['type']) && $data['type'] === 'bulk') {
    // Bulk Newsletter
    $subject = $data['subject'] ?? 'Newsletter';
    $body = $data['body'] ?? '';
    $emails = $data['emails'] ?? [];
    
    $successCount = 0;
    foreach ($emails as $email) {
        if ($mailer->send($email, $subject, $body, $sender, "Digieonix")) {
            $successCount++;
        }
    }
    
    echo json_encode(['success' => true, 'message' => "$successCount emails sent successfully"]);
    exit;
}

// Default: Contact Form Lead
$name = $data['name'] ?? 'User';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$service = $data['service'] ?? '';
$budget = $data['budget'] ?? '';
$message = $data['message'] ?? '';

// 1. Send Notification to Admin
$adminSubject = "New Lead: $name - $service";
$adminBody = "
    <h2>New Lead Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Service:</strong> $service</p>
    <p><strong>Budget:</strong> $budget</p>
    <p><strong>Message:</strong></p>
    <p>$message</p>
";
$mailer->send($receiver, $adminSubject, $adminBody, $sender, "Digieonix Website");

// 2. Send Auto-Responder to User
$userSubject = "Thank you for contacting Digieonix!";
$userBody = "
    <h2>Hi $name,</h2>
    <p>Thank you for reaching out to us regarding <strong>$service</strong>.</p>
    <p>We have received your message and our team will get back to you within 24 hours.</p>
    <br>
    <p>Best Regards,</p>
    <p><strong>Digieonix Team</strong></p>
";
$mailer->send($email, $userSubject, $userBody, $sender, "Digieonix");

echo json_encode(['success' => true, 'message' => 'Emails sent successfully']);
?>
