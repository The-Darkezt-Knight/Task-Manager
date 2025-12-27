<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../Auth/connect_db.php';

class TaskServices
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    //Add a task
    public function createNewTask(array $data):array
    {
        $task_description = $data['task_description'] ?? '';

        $stmt = $this->pdo->prepare('INSERT INTO tasks_tbl(task_description) VALUES(?)');

        $stmt->execute([$task_description]);

        //returns success if database query is successful
        if($stmt->rowCount()>0){

            return [

                'status'  => 'success',
                'message' => 'Task successfully created'

            ];
                
            exit;

        //errors if not
        }else{

            return [
                'status'  => 'error',
                'message' => 'Failed to create task'

            ];

            exit;

        }   
    }

    //Display the tasks
    public function displayTasks():array
    {
        $check = $this->pdo->prepare('SELECT * FROM tasks_tbl');
        $check->execute();
        $display = $check->fetchAll(PDO::FETCH_ASSOC);
        
        if($check->rowCount()>0)
            {
                return [
                    $display
                ];
            }else
            {
                return [
                    'status' => 'error',
                    'message' => 'No tasks as of the moment',
                ];
            }
    }

    //Deletes tasks
    public function deleteTaskById(int $id):array
    {
        $task_id = $id;

        $stmt = $this->pdo->prepare("UPDATE tasks_tbl
                                SET task_status = 'archived' WHERE task_id = ?
                             ");

        $stmt->execute([$task_id]);

        if($stmt->rowCount() > 0)
            {
                return [
                    'status'  => 'success',
                    'message' => 'Task successfully removed'
                ];
            }else
            {
                return [
                    'status' => 'error',
                    'message' => 'Changes not saved'
                ];
            }
    }

    //Details the initialized task
    public function detailTaskById(array $data):array
    {   
        $task_id = $data['task_id'] ?? '';
        $task_name = $data['task_name'] ?? '';

        $checkTaskName = $this->pdo -> prepare('SELECT * FROM tasks_tbl WHERE task_name = ?');
        $checkTaskName->execute([$task_name]);

        if($checkTaskName-> rowCount() > 0)
            {
                return [
                    'status' => 'error',
                    'message' => 'Task name already exists'
                ];
            }

        $stmt = $this->pdo -> prepare('UPDATE tasks_tbl
                                       SET task_name = ?
                                       WHERE task_id = ?
                                        ');

        $stmt->execute([$task_name, $task_id]);

        if($stmt->rowCount() > 0)
            {
                return [
                    'status' => 'success',
                    'message' => 'Changes successfully saved'
                ];
            }

        return [
            'status' => 'error',
            'message'=> 'Changes not saved'
        ];
    }
}