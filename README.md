![Logo](https://github.com/Flolon/stibarc_archives/blob/master/assets/images/banner.png?raw=true)
# STiBaRC Archives
 API and client for an updating archive of STiBaRC posts and comments

 Create a file db.inc.php and add your mySQL creds
 ```
 <?php
$sql_host       = "localhost";
$sql_username   = "u611188077_stibarc";
$sql_password   = "BruhMoment";
$sql_dbname     = "u611188077_stibarc";
$sql_dsn        = "mysql:host=$sql_host;dbname=$sql_dbname";
$sql_options    = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
);
?>
```
