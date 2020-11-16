<?php

error_reporting(E_ALL); ini_set('display_errors', 1);

require('../common.inc.php');
require_once("../db.inc.php");

$connection = new PDO($sql_dsn, $sql_username, $sql_password, $sql_options);
# vars #
$type = $_GET['type'];

// insert  //
    if($type == 'newpost'){
        $new = array(
                    "postid"  => $_GET['id'],
                    "poster"  => $_GET['poster'],
                    "title"   => $_GET['title'],
                    "content" => $_GET['content'],
                );
                $sql = sprintf(
                        "INSERT INTO %s (%s) values (%s)",
                        "posts",
                        implode(", ", array_keys($new)),
                        ":" . implode(", :", array_keys($new))
                );
    }elseif($type == 'newcomment'){
        $new = array(
                    "content"  => $_GET['content'],
                    "postid"   => $_GET['id'],
                    "poster"   => $_GET['poster']
                );
                $sql = sprintf(
                        "INSERT INTO %s (%s) values (%s)",
                        "comments",
                        implode(", ", array_keys($new)),
                        ":" . implode(", :", array_keys($new))
                );
    }
        try {
            $statement = $connection->prepare($sql);
            $statement->execute($new);
            } catch(PDOException $error) {
                echo $sql . " " . $error->getMessage();
            }
        if(!isset($error)){
            echo "ok";
        }
    
?>
