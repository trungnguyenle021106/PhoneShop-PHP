<?php
//1000000  -> 1.000.000 đ
function changePriceToString($price) {
    $s = "";
    $temp = 0;
    $flag = 0;
    $amountDot = round(strlen($price) / 3);

    if (strlen($price) % 3 == 0) {
        $amountDot--;
    }
    for ($i = strlen($price) - 1; $i >= 0; $i--) {
        $temp++;
        if ($temp == 3 && $flag < $amountDot) {
            $s = $s . $price[$i] . ".";
            $flag++;
            $temp = 0;
        }
        else {
            $s = $s . $price[$i];
        }
    }
    return strrev($s)."đ";
}
//1.000.000 đ -> 1000000
function changePriceToNormal($price)
{
    return preg_replace("/[^0-9]/", "", $price);
}

?>