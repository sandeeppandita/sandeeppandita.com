<?php

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        die();
    }

    // Set databse connection 
    function ConnectDatabase() {

        $DATABASE_HOST = 'localhost';
        $DATABASE_USER = 'id16782171_user_sandeeppandita';
        $DATABASE_PASS = 'EK|?ONOiv?b9%|tN';
        $DATABASE_NAME = 'id16782171_db_sandeeppandita';

        try {
            return new PDO('mysql:host=' . $DATABASE_HOST . ';dbname=' . $DATABASE_NAME . ';charset=utf8', $DATABASE_USER, $DATABASE_PASS);
        } catch (PDOException $exception) {
            // If there is an error with the connection, stop the script and display the error.
            exit('Failed to connect to database!');
        }

    } 

    // Validate form data request
    function ValidateRequest($formData){ 

        $name = trim( $_POST['name'] );
        $email = trim( $_POST['email'] );
        $phone = trim( $_POST['phone'] );
        $topic = trim( $_POST['topic'] );
        $message = trim( $_POST['message'] );

        if( isset($formData['name']) && empty($formData['name']) ) { $errors['name'] = "Please provide your name."; }
        if( isset($formData['email']) && empty($formData['email']) ) { $errors['email'] = "Please provide your email."; }
        if( isset($formData['topic']) && empty($formData['topic']) ) { $errors['topic'] = "Please provide your topic."; }
        if( isset($formData['message']) && empty($formData['message']) ) { $errors['message'] = "Please write your message."; }
        
        if(!empty($errors)){                     
            return json_encode($errors); 
        }else{
            return 'NOERRORS';  
        }   

    }                      

    // Handing the form submit request
    function HandleIncomingData($connectionObj){                           

        date_default_timezone_set("Asia/Calcutta");  

        // $date = new DateTime();               
        // $timeZone = $date->getTimezone();              
        // echo $timeZone->getName();                  
        // exit;                                   

        $formData = [
            'name' => trim( $_POST['name'] ),
            'email' => trim( $_POST['email'] ),
            'phone' => trim( $_POST['phone'] ),
            'topic' => trim( $_POST['topic'] ),
            'message' => trim( $_POST['message'] ),
            'created_at' => date('Y-m-d h:i:s')
        ];    
        
        $validationErrors = ValidateRequest($formData); 

        if( $validationErrors !== 'NOERRORS'){

            echo json_encode(array('status' =>'FAILED','key' => 'VALIDATIONERRORS', 'data' => $validationErrors));

        }else{        

            // Enable PDO error alerts
            $connectionObj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Prepare SQL statement and bind parameters
            $sql = $connectionObj->prepare("INSERT INTO `contacts` (`name`,`email`,`phone`,`topic`,`message`,`created_at`) VALUES (:name, :email, :phone, :topic, :message, :created_at)");
            $sql->bindParam(':name', $formData['name']);
            $sql->bindParam(':email', $formData['email']);
            $sql->bindParam(':phone', $formData['phone']);
            $sql->bindParam(':topic', $formData['topic']);
            $sql->bindParam(':message', $formData['message']);  
            $sql->bindParam(':created_at', $formData['created_at']);     

            $sql->execute();    

            echo json_encode(array('status' =>'SUCCESS','key' => 'FORMSUBMITTED', 'data' => 'Thankyou for reaching out. I will get back to you shortly.'));       

        }
            
    }

    $connectionObj = ConnectDatabase();

    HandleIncomingData($connectionObj);     

?>