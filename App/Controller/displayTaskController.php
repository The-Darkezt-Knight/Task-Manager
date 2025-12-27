<?php

require_once __DIR__ .'/../../Auth/connect_db.php';
require_once __DIR__ .'/../../App/Services/TaskServices.php';
header('Content-Type: application/json');

$taskServices = new TaskServices($pdo);

try
{
    $displayTask = $taskServices->displayTasks($_POST);

    echo json_encode([
        'status' => 'success',
        'tasks' => $displayTask
    ]);

}catch(PDOException $e)
{

    echo json_encode([
        'status' => 'error',
        'debug' => $e->getMessage()
    ]);

}