<?php
// proxy.php - SERVIDOR PROXY PARA GHOSTS PAY
header('Access-Control-Allow-Origin: https://modalux.com.br');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$url = 'https://api.ghostspaysv2.com/functions/v1/transactions';
$input = file_get_contents('php://input');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic c2tfbGl2ZV80cmNYbnFRNktMNGRKMmwWMGdaeGg5bENqNXRtOTlrWU1DazBpNTdLb2NTS0dHRDQ6NDNmYzgwNTMtZDMyYy00ZDM3LWJmOTMtMzMwNDZkZDcyMTVi',
    'Accept: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
?>
