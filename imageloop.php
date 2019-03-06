<?php
$dir = $_POST['dir'];
$arr = array();
$path = realpath('img/' . $dir);

$objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS));
foreach($objects as $name => $object){
    //echo "$name\n";
    $filename = substr(strrchr($object, "/"), 1);
    if ($filename != ".DS_Store") {
        array_push($arr,"$filename");
    }
}

echo json_encode($arr);

?>