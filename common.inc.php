<?php

error_reporting(E_ALL & ~E_NOTICE);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

function escape($html) {
	return htmlspecialchars($html, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}

function formatDate($date, $type = null) {
    // $spacer = ', ';
    // $newDate = date("M j, Y", strtotime($date));
    // $time = date("H:i T", strtotime($date));
    // if($type == 'time') {
    //     $formatedDate = $newDate.$spacer.$time;
    // }else {
    //     $formatedDate = $newDate;
	// }
	$curDate = date($date);
	$curDate = strtotime($date);
	$formatedDate = date('M j, Y, H:i T', $curDate);

    return $formatedDate;
}

?>