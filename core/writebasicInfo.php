<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 18-3-22
 * Time: 下午11:30
 */
$gender = $_POST['gender'];
$birthyear = $_POST['birthyear'];
$tel = $_POST['tel'];
$industry = $_POST['industry'];
$job = $_POST['job'];
$ifmarried = $_POST['ifmarried'];
$doe = $_POST['doe'];
$wt = $_POST['wt'];
$uuid = substr(md5(time().rand(10000,9999999)),0,10);
$mysql_conf = array(
    'host'    => '127.0.0.1:8889',
    'db'      => 'iat',
    'db_user' => 'root',
    'db_pwd'  => 'root',
);

//$mysql_conf = array(
//    'host'    => '127.0.0.1:3306',
//    'db'      => 'iat',
//    'db_user' => 'root',
//    'db_pwd'  => '',
//);

$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}

$sql = "INSERT INTO `userinfo`(`uuid`,`gender`, `birthyear`, `tel`, `industry`, `job`, `ifmarried`, `doe`, `wt`) VALUES ('{$uuid}','{$gender}','{$birthyear}','{$tel}','{$industry}','{$job}','{$ifmarried}','{$doe}','{$wt}');";

$res = $mysqli->query($sql);
if (!$res) {
    die("sql error:\n" . $mysqli->error);
}

$mysqli->close();

$data = array("uuid"=>$uuid,"location"=>"index2.php");

echo json_encode($data);




