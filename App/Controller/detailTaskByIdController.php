<?php

require_once __DIR__ . '/../../Auth/connect_db.php';
require_once __DIR__ . '/../../App/Services/TaskServices.php';
header('Content-Type: application/json');

$taskServices = new TaskServices($pdo); 

try
{

    echo json_encode($taskServices->detailTaskById($_POST));

}catch(PDOException $e)
{
    echo json_encode([
        'status' => 'error',
        'debug' => $e->getMessage()
    ]);
}
