<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
require_once('application/Answer.php');
require_once('application/Application.php');

function result($params) {
    $method = $params["method"];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case 'login': return $app-> login($params);
        }
    }
}

echo json_encode(Answer::response(result($_GET)));