<?php
define('ROOT',$_SERVER['DOCUMENT_ROOT']);
session_start();
if(isset($_SESSION['loggedIn'])){
    $car_types = array(
        '/shit_sedan.json',
        '/shit_crossover.json'
    );
    $kits = json_decode($_POST['kits']);
    $prices = json_decode($_POST['prices']);
    $discounts = json_decode($_POST['discounts']);
    //echo ROOT.$car_types[intval($_POST['car_type'])-1];
    $et = json_decode(file_get_contents(ROOT.$car_types[intval($_POST['car_type'])-1]));
    if(!empty($kits))
        $et->kit = $kits;
    if(!empty($prices)){
        //print_r($prices);
        foreach($prices as $k=>$v){
            $j = $v->code;
            $et->elements->$j = $v;
        }
    }
    if(!empty($discounts))
        $et->discounts = $discounts;
    //print_r($et);
    $f = fopen(ROOT.$car_types[intval($_POST['car_type'])-1],'w');
    fwrite($f,json_encode($et));
    fclose($f);
    echo json_encode(array('ok'=> true));
}
else die('CATBURGLAR....');