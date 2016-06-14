<?php
define('PASSWORD','shit');
define('ROOT',$_SERVER['DOCUMENT_ROOT']);

session_start();
if(isset($_POST['password'])){
    if(htmlspecialchars($_POST['password']) === PASSWORD){
        $_SESSION['loggedIn'] = true;
        exit(header('Location: /calc_admin/'));
    }
    else
        require_once ROOT.'/calc_admin/tpls/login.tpl';
}
elseif(!isset($_SESSION['loggedIn'])){
    require_once ROOT.'/calc_admin/tpls/login.tpl';
}
else{
    require_once ROOT.'/calc_admin/tpls/table.tpl';
}