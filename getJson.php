<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');    
header("Access-Control-Allow-Methods: *"); 
$output = null;
if(!empty($_POST)){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $_POST['url']);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	$output = curl_exec($ch);
	curl_close($ch);
}
die($output);