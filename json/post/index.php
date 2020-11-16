<?php

include('../../common.inc.php');
include('../../db.inc.php');

try {
    $connection = new PDO($sql_dsn, $sql_username, $sql_password, $sql_options);
    if($_GET['type'] == "all") {
        $sql = "SELECT * 
                FROM all_posts 
                WHERE postid = :postid
                ";
    } else {
        $sql = "SELECT * 
                FROM all_posts 
                WHERE postid = :postid 
                AND NOT archive='old'
                ";
    }

    if(isset($_GET['id'])) { $postId = $_GET['id']; }
    $statement = $connection->prepare($sql);
    $statement->bindParam(':postid', $postId, PDO::FETCH_ASSOC);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $error) {
    $result = array("error" => $error->getMessage());
}

header('Content-Type: application/json');

if ($_GET['pp']) {
    echo json_encode($result, JSON_PRETTY_PRINT);
} else {
    echo json_encode($result);
}
?>