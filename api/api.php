<?php
require_once('./config.php');
// CORS回避
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH, HEAD");
header("Content-type: application/xml; charset=UTF-8");
//じゃらん地域選択API
const BASE_URL = "http://jws.jalan.net/APICommon/AreaSearch/V1/?key=". KEY;
// GET配列が空だったとき
if(empty($_GET)) {
  $url = BASE_URL;
}
// array_key_exists('reg',$_GET) = 'reg'キーが存在するかしないか 
// reg = キー、$_GET = 配列
else if(array_key_exists('reg', $_GET)) {
  $url = BASE_URL."&reg=".$_GET['reg'];
}
else if(array_key_exists('pref', $_GET)) {
  $url = BASE_URL . "&pref=" . $_GET['pref'];
}
else if(array_key_exists('l_area', $_GET)) {
  $url = BASE_URL . "&l_area=" . $_GET['l_area'];
}
else if(array_key_exists('s_area', $_GET)) {
  $url = "http://jws.jalan.net/APILite/HotelSearch/V1/?key=". KEY ."&s_area=" . $_GET['s_area'];
}

// XML取得
$xml = file_get_contents($url);
// XMLをjsに返す
echo $xml;