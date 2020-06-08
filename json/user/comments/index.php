<?php

include('../../../common.inc.php');
include('../../../db.inc.php');

//read from db table //
try {
    $connection = new PDO($sql_dsn, $sql_username, $sql_password, $sql_options);
    $sql = "SELECT * 
                    FROM comments 
                    WHERE poster = :poster
                    ";
    
    if(isset($_GET['id'])) { $postId = $_GET['id']; }
    $statement = $connection->prepare($sql);
    $statement->bindParam(':poster', $postId, PDO::FETCH_ASSOC);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $error) {
    echo $sql . "<br />" . $error->getMessage();
}
// page //
header('Content-Type: application/json');

echo json_encode($result, JSON_PRETTY_PRINT);
?>