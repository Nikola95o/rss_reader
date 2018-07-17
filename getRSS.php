<?php

function getRSS($address){
    $rss = new DOMDocument();
    $rss->load($address);
    $des = ($address == "http://www.b92.net/info/rss/novo.xml" || $address == "http://blog.b92.net/rss/feed/index.xml")?"description" : "encoded";

    $feed = array();
    foreach ($rss->getElementsByTagName('item') as $node) {
        $item = array (
            'title' => $node->getElementsByTagName('title')->item(0)->nodeValue,
            'link' => urlencode($node->getElementsByTagName('link')->item(0)->nodeValue),
            'pubDate' => str_replace(" +0000","", $node->getElementsByTagName('pubDate')->item(0)->nodeValue),
            'description' => htmlspecialchars($node->getElementsByTagName($des)->item(0)->nodeValue)

        );
        array_push($feed, $item);
    }
    return $feed;
}
