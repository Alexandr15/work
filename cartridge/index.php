<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


include "cart_print.php";

$p = new CartPrint();
$print = $p->get_prints();
$cartprint = $p->get_cartprint();
$cart = $p->get_cartname();
$carts = $p->get_info();
$p->close();
?> 

<link rel="stylesheet" type="text/css" href="css/cartridge.css">
<script type="text/javascript" src="script/script.js"></script>
<script type="text/javascript" src="script/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="script/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>

<div class="container">
    <div class="row cell-6">
	<div class="cols col-1 row-1"><input id="onetoall" type="checkbox"></div>
        <div class="cols col-8 row-1"></div>
        <div class="cols col-2 row-1"><input id="findname" class="cell-2" type="text" value=""></div>
        <div class="cols col-1 row-1"><input id="findsend" class="cell-2" type="button" value="Send"></div>
    </div>
    <div class="row">
	<?php
	for ($i = 0, $max = count($cartprint); $i < $max; $i++) {
	    $ca = []; // цифры
	    $pr = []; // цифры
	    // все подходящие картриджи под данный принтер
	    for ($j = 0, $index = 0; $j < count($cartprint); $j++) {
		if ($cartprint[$i][0] === $cartprint[$j][0]) {
		    $ca[$index] = $cartprint[$j][1];
		    $index++;
		}
	    }
	    // все подходящие принтеры подходящие для картриджей
	    for ($j = 0, $index = 0; $j < count($ca); $j++) {
		for ($k = 0; $k < $max; $k++) {
		    if ($ca[$j] === $cartprint[$k][1]) {
			$pr[$index] = $cartprint[$k][0];
			$index++;
		    }
		}
	    }
	    // сортирует принтеры на повторение
	    $temp = [];
	    for ($j = 0, $index = 0; $j < count($pr); $j++) {
		$flag = true;
		for ($n = 0; $n < $j; $n++) {
		    if ($pr[$j] === $pr[$n]) {
			$flag = false;
			break;
		    }
		}
		if ($flag) {
		    $temp[$index] = $pr[$j];
		    $index++;
		}
	    }

	    $flag = false;
	    for ($j = 0; $j < count($temp); $j++) {
		for ($n = 0; $n < $i; $n++) {
		    if ($temp[$j] === $cartprint[$n][0]) {
			$flag = true;
			break;
		    }
		}
	    }

	    if ($flag) {
		continue;
	    }
	    // картриджи
	    $res = [];
	    // принтеры
	    $res2 = [];
	    // в массив $res записываем имена картриджей
	    for ($j = 0, $index = 0; $j < count($ca); $j++) {
		for ($n = 0; $n < count($cart); $n++) {
		    if ($ca[$j] === $cart[$n][1]) {
			$res[$index] = $cart[$n][0];
			$index++;
			break;
		    }
		}
	    }
	    // в массив $res2 записываем имена принтеров
	    for ($j = 0, $index = 0; $j < count($temp); $j++) {
		for ($n = 0; $n < count($print); $n++) {
		    if ($temp[$j] === $print[$n][1]) {
			$res2[$index] = $print[$n][0];
			$index++;
			break;
		    }
		}
	    }
	    $h = count($res) > count($res2) ? count($res) * 30 : count($res2) * 30;

	    if ($i === 0) {
		$param = count($cart);
		showCaption($param);
		unset($param);
	    }

	    echo "<div class='tr' style='height: " . $h . "px'>";

	    echo "<div class='cols col-3'>"
	    . "<div class='cell BL BT BB' style='height: " . $h . "px;'>";

	    if (count($res2) !== 0) {
		for ($j = 0; $j < count($res2); $j++) {
		    echo "<div class='cell-text'>" . $res2[$j] . "</div>";
		}
	    } else {
		echo "<div class='cell-text'></div>";
	    }
	    echo "</div></div>";

	    echo "<div class='cols col-3'>"
	    . "<div class='cell BL BT BB cart2' style='height: " . $h . "px;'>";

	    if (count($res) !== 0) {
		for ($j = 0; $j < count($res); $j++) {
		    echo "<div class='cell-text cart'>" . $res[$j] . "</div>";
		}
	    } else {
		echo "<div class='cell-text cart'></div>";
	    }
	    echo "</div></div>";


	    echo "<div class='cols col-1'>"
	    . "<div class='cell BL BT BB' style='height: " . $h . "px'>";

	    for ($j = 0; $j < count($res); $j++) {
		$count = 0;
		for ($in = 0, $max3 = count($carts); $in < $max3; $in++) {
		    if ($res[$j] === $carts[$in][0]) {
			$count++;
		    }
		}
		echo "<div class='cell-text'>$count</div>";
	    }
	    echo "</div></div>";

	    /*                         полный                           */

	    echo "<div class='cols col-1'>"
	    . "<div class='cell BL BT BB' style='height: " . $h . "px'>";

	    for ($j = 0; $j < count($res); $j++) {
		$count = 0;
		for ($in = 0, $max3 = count($carts); $in < $max3; $in++) {
		    if ($res[$j] === $carts[$in][0] &&
			    $carts[$in][2] === 'Склад' &&
			    $carts[$in][1] === 'Заправлен') {
			$count++;
		    }
		}
		echo "<div class='cell-text'>$count</div>";
	    }
	    echo "</div></div>";

	    /*                        пустой                          */

	    echo "<div class='cols col-1'>"
	    . "<div class='cell BL BT BB' style='height: " . $h . "px'>";

	    for ($j = 0; $j < count($res); $j++) {
		$count = 0;
		for ($in = 0, $max3 = count($carts); $in < $max3; $in++) {
		    if ($res[$j] === $carts[$in][0] &&
			    $carts[$in][1] === 'Пустой') {
			$count++;
		    }
		}
		echo "<div class='cell-text'>$count</div>";
	    }
	    echo "</div></div>";

	    /*                          проценты                         */

	    echo "<div class='cols col-3'>"
	    . "<div class='cell BL BT BB BR' style='height: " . $h . "px'>";

	    for ($j = 0; $j < count($res); $j++) {
		$all = 0;
		$empty = 0;
		$full = 0;
		for ($in = 0, $max3 = count($carts); $in < $max3; $in++) {
		    if ($res[$j] === $carts[$in][0]) {
			$all++;
			if ($carts[$in][1] === 'Заправлен' &&
				$carts[$in][2] === 'Склад') {
			    $full++;
			}
			if ($carts[$in][1] !== 'Заправлен') {
			    $empty++;
			}
		    }
		}


		if ($full !== 0) {
		    $proc = (int) ($full * 100 / ($empty + $full));
		} else {
		    $proc = 0;
		}


		echo "<div class='cell-text cell-4'>"
		. "<div class='progred'></div>"
		. "<div class='progreen' style='width:" . $proc . "%'></div>"
		. "</div>";
	    }

	    echo "</div></div>";

	    echo "</div>";
	}
	echo "</div>";

	function showCaption($param) {

	    echo "<div class='tab' style='height: " . $param * 35 . "px'>";
	    echo "<div class='tr' style='height: 30px'>";
	    echo "<div class='cols col-3'><div class='cell BL BT BB' style='height: 30px;'>"
	    . "<div class='cell-text' id='printer'><h3>Назва принтора</h3></div></div></div>";

	    echo "<div class='cols col-3'><div class='cell BL BT BB' style='height: 30px;'>"
	    . "<div class='cell-text' id='cartridge'><h3>Назва картриджа</h3></div></div></div>";

	    echo "<div class='cols col-1'><div class='cell BL BT BB' style='height: 30px;'>"
	    . "<div class='cell-text'><h3>Всього</h3></div></div></div>";

	    echo "<div class='cols col-1'><div class='cell BL BT BB' style='height: 30px;'>"
	    . "<div class='cell-text'><h3>Склад</h3></div></div></div>";

	    echo "<div class='cols col-1'><div class='cell BL BT BB' style='height: 30px;'>"
	    . "<div class='cell-text'><h3>Ост.</h3></div></div></div>";

	    echo "<div class='cols col-3'><div class='cell BL BT BB BR' style='height: 30px;'>"
	    . "<div class='cell-text'><h3>Склад/Ост.</h3></div></div></div>";
	    echo "</div>";
	}
	?>

    </div>

</div>