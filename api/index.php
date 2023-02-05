<?php
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Headers: *");
   header("Access-Control-Allow-Methods: *");

    $arr = array('JVC200123', 'CD', '2', 'Size', '700MB');
    $json_arr = json_encode($arr);

    echo $json_arr;
?>