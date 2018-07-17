<?php
require_once("getRSS.php");
$page = 1;
$type = 0;
$res = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8"?><news></news>');
$res->addChild("page",1);
if(isset($_GET)){

    if(isset($_GET['page'])){
        $page = $_GET['page'];
    }
    $res->page = $page;

    if(isset($_GET['type'])){
        $res->addChild("type", $_GET['type']);
        $xml = simplexml_load_file("rss.xml");

        //ucitava xml sadrzaj odabrane kategorije
        foreach($xml as $vest) {
            //print_r($vest);
            if ($vest['id'] == $_GET['type']) {
                //echo $vest->address;
                //echo $item->address;
                //$xml = simplexml_load_file($vest->address);
                $rss = getRSS($vest->address);
                break;
            }
        }

        //odredjuje broj strana za paginaciju
        if (count($rss) == 0) {
            die();
        }
        if (count($rss) % 10 > 0) {
            $num = ceil(count($rss) / 10);
        } else {
            $num = count($rss) / 10;
        }
        $res->addChild("pages", $num);

        $items = $res->addChild("items");

        for ($i = ($page - 1) * 10; $i < $page * 10; $i++) {
            if($i > count($rss)-1){
                break;
            }
            $item = $items->addChild("item");

            $item->addChild("link", $rss[$i]['link']);
            $item->addChild("title", $rss[$i]['title']);
            $item->addChild("pubDate", $rss[$i]['pubDate']);
            $item->addChild("description", $rss[$i]['description']);
        }
    }
}
echo $res->asXML();
?>
