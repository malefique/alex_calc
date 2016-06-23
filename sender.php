<?php

 function send_conf_mail($conf_str, $name, $email_to){
    // $to = $name." <".$email_to.">";
    $to = $email_to;
    //$conf_url = 'https://sakura.aero/register/confirm-'.$conf_str;
    $subject = "Заказ на сайте";
    $message = '
        <html>
            <head>
                <title>Заказ на сайте</title>
            </head>
            <body>
            '.$conf_str.'
            </body>
        </html>';

    utf8mail($to, $subject, $message);
}

function utf8mail($to,$s,$body,$from_name="AUTO",$from_a = "no-reply@alex.domain", $reply="no-reply@alex.domain")
{
    $s= "=?utf-8?b?".base64_encode($s)."?=";
    $headers = "MIME-Version: 1.0\r\n";
    $headers.= "From: =?utf-8?b?".base64_encode($from_name)."?= <".$from_a.">\r\n";
    $headers.= "Content-Type: text/html;charset=utf-8\r\n";
    $headers.= "Reply-To: $reply\r\n";
    $headers.= "X-Mailer: PHP/" . phpversion();
    mail($to, $s, $body, $headers);
}

function validation(&$obj){
    if(is_array($obj)){
        foreach($obj as $v)
            validation($v);
    }
    else
        $obj = htmlspecialchars($obj);
}

if(isset($_POST)){
    validation($_POST);
    if($_POST['formData']['name'] == '' || $_POST['formData']['email'] == '' || $_POST['formData']['phone'] == '')
        exit();
    else{
        $tbl = '<table><tr><th>элемент</th><th>покраска</th><th>ремонт</th><th>замена</th></tr>';
        foreach($_POST['elements'] as $k=>$v)
            $tbl.='<td>'.$v['title'].'</td><td>'.$v['paint'].'</td><td>'.$v['repair'].'</td><td>'.$v['replacement'].'</td>';
        $tbl.='</table>
            <table><tr><th>тип кузова</th><th>сумма без скидки</th><th>сумма со скидкой</th><th>имя</th><th>e-mail</th><th>телефон</th></tr><td>'.$_POST['type'].'</td><td>'.$_POST['summa'].'</td><td>'.$_POST['summaD'].'</td><td>'.$_POST['formData']['name'].'</td><td>'.$_POST['formData']['email'].'</td><td>'.$_POST['formData']['phone'].'</td></table>';
        send_conf_mail($tbl,'','novocaineya@gmail.com');
        die(json_encode(array('ok'=>true)));
    }
}