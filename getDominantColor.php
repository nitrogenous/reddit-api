<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');    
header("Access-Control-Allow-Methods: *");
require_once 'vendor/autoload.php';
use ColorThief\ColorThief;
$color = null;
if(!empty($_POST)){
	$image = (string)$_POST['url'];
	$color = ColorThief::getColor($image);
	$color = json_encode(array('R' => $color[0],'G' => $color[1],'B' => $color[2]));
}
die($color);