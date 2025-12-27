<?php
require_once __DIR__ . '/../../Auth/connect_db.php';
require_once __DIR__ . '/../../App/Services/TaskServices.php';
header('Content-Type: application/json');

$task_id = $_POST['task_id'] ?? '';

$taskServices = new TaskServices($pdo);

if(!$task_id)
    {
        echo json_encode([
            'status' => 'error',
            'message' => 'Task id is required',
        ]);
        exit;
    }

try
{

    echo json_encode($taskServices -> deleteTaskById((int)$task_id));
    
}catch(PDOException $e)
{
    echo json_encode([
        'status' => 'error',
        'debug' => $e->getMessage()
    ]);
}