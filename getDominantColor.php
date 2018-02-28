<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');    
header("Access-Control-Allow-Methods: *");
$color = null;
if(!empty($_POST)){
	require_once 'vendor/autoload.php';
	// use ColorThief\ColorThief;
	$color = ColorThief::getColor($_POST('img'));
	var_dump($color);
}