<!DOCTYPE html>
<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include_once '../workers/action.php';
$forum_dostup = 4;
if (!($forum_dostup >= 4)) {
    return false;
}

$esp = new ECP();
$pos = $esp->get_pos();
$vid = $esp->get_vid();
$pos1 = "";
$vid1 = "";
$status = "";
$ecp = "";
$guild = "";

if (filter_has_var(INPUT_POST, 'submit')) {

    $pos1 = filter_input(INPUT_POST, 'posada');
    $vid1 = filter_input(INPUT_POST, 'viddil');
    $status = filter_input(INPUT_POST, 'status');
    $ecp = filter_input(INPUT_POST, 'ecp');
    $guild = filter_input(INPUT_POST, 'guild');
    $sortdate = filter_input(INPUT_POST, 'sortdate');

    $query = "";
    if ($pos1 !== "" && $pos1 !== null) {
        $query .= " AND id_pos = '" . $pos1 . "'";
    }

    if ($vid1 !== "" && $vid1 !== null) {
        $query .= " AND id_vid = '" . $vid1 . "'";
    }

    if ($status !== "" && $status !== null) {
        $query .= " AND status = '" . $status . "'";
    }

    if ($ecp !== "" && $ecp !== null) {
        $query .= " AND ecp = '" . $ecp . "'";
    }

    if ($guild !== "" && $guild !== null) {
        $query .= " AND guild = '" . $guild . "'";
    }

    if ($sortdate !== "" && $sortdate !== null) {
        $query .= " ORDER BY date " . $sortdate;
    }

    $res = $esp->get_ecp($query);
} else {
    $res = $esp->get_ecp();
}

$esp->close();

function get_status($param) {
    $key = (int) $param;
    if ($key === 0) {
        return "уволен(а)";
    } else if ($key === 1) {
        return "работает";
    } else if ($key === 2) {
        return "социальный отпуск";
    } else if ($key === 3) {
        return "не в штате";
    }
}

function get_ecp($param) {
    $key = (int) $param;
    if ($key === 0) {
        return "нету";
    } else if ($key === 1) {
        return "есть";
    } else if ($key === 2) {
        return "не трубуется";
    }
}

function get_guild($param) {
    $key = (int) $param;
    if ($key === 1) {
        return "Юстиции";
    } else if ($key === 2) {
        return "ДФС";
    }
}
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script type="text/javascript" src="../workers/script/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../workers/script/script.js"></script>
        <link type="text/css" rel="stylesheet" href="../workers/css/css.css">
    </head>
    <body>        
        <div class="container">
            <p id="p"></p>
            <div class="cols col-12 h40">
                <div class="cols col-11 h40"></div>
                <div class="cols col-1 h40">
                    <form id="form" action="#" method="POST">
                        <input class="but-1" type="submit" name='submit' value="request" style="background-color: green; color: white">
                    </form>
                </div>
            </div>
            <table id="table" width="100%" cellspacing="0" border="1" align="center">
                <tr>
                    <td class="tr">
                        <input id='addUser' class="but-1" type="button" value="+">
                    </td>
                    <td class="tr"></td>
                    <td class="tr">
                        <?php
                        $s = "<select form='form' class='but-1' name='posada'>";
                        $s .= "<option value='' selected>Должность</option>";
                        foreach ($pos as $posada) {
                            $s .= "<option value='" . $posada[1] . "' " . ($pos1 === $posada[1] ? 'selected' : '' ) . ">" . $posada[0] . "</option>";
                        }
                        $s .= "</select>";
                        echo $s;
                        ?>
                    </td>
                    <td class="tr">
                        <?php
                        $s = "<select form='form' class='but-1' name='viddil'>";
                        $s .= "<option value='' selected>Отдел</option>";
                        foreach ($vid as $viddil) {
                            $s .= "<option value='" . $viddil[1] . "' " . ($vid1 === $viddil[1] ? 'selected' : '' ) . ">" . $viddil[0] . "</option>";
                        }
                        $s .= "</select>";
                        echo $s;
                        ?>
                    </td>
                    <td class="tr">
                        <select  form='form' class='but-1' name='status'>
                            <option value='' selected>Статус</option>
                            <option value='0' <?php echo ($status === '0' ? 'selected' : ''); ?>>уволен(а)</option>
                            <option value='1' <?php echo ($status === '1' ? 'selected' : ''); ?>>работает</option>
                            <option value='2' <?php echo ($status === '2' ? 'selected' : ''); ?>>социальный отпуск</option>
                            <option value='3' <?php echo ($status === '3' ? 'selected' : ''); ?>>не в штате</option>
                        </select>
                    </td>
                    <td class="tr">
                        <select form='form' class='but-1' name='ecp'>
                            <option value='' selected>ЕЦП</option>
                            <option value='0' <?php echo ($ecp === '0' ? 'selected' : ''); ?>>нету</option>
                            <option value='1' <?php echo ($ecp === '1' ? 'selected' : ''); ?>>есть</option>
                            <option value='2' <?php echo ($ecp === '2' ? 'selected' : ''); ?>>не требуется</option>
                        </select>
                    </td>
                    <td class="tr">
                        <select  form='form' class='but-1' name='sortdate'>
                            <option value='ASC'>По возрастанию</option>
                            <option value='DESC'>По убыванию</option>
                        </select>
                    </td>
                    <td class="tr">
                        <select form='form' class='but-1' name='guild'>
                            <option value='' selected>Выдано</option>
                            <option value='1' <?php echo ($guild === '1' ? 'selected' : ''); ?>>Юстиции</option>
                            <option value='2' <?php echo ($guild === '2' ? 'selected' : ''); ?>>ДФС</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="tr" width="20px"></td>
                    <td class="tr" width="250px">ФИО</td>
                    <td class="tr" width="250px">Должность</td>
                    <td class="tr" width="400px">Отдел</td>
                    <td class="tr" width="100px">Статус</td>
                    <td class="tr" width="100px">ЕЦП</td>
                    <td class="tr" width="100px">Дата окончания</td>
                    <td class="tr" width="100px">Выдано</td>
                </tr>
                <?php
                $s = "";
                $count = 1;
                foreach ($res as $row) {
                    $s .= '<tr class="edit" data-id="' . $row[7] . '">';
                    $s .= '<td class="td">' . $count . '</td>';
                    $s .= '<td class="td">' . $row[0] . '</td>';
                    $s .= '<td class="td">' . $row[1] . '</td>';
                    $s .= '<td class="td">' . $row[2] . '</td>';
                    $s .= '<td class="td">' . get_status($row[3]) . '</td>';
                    $s .= '<td class="td">' . get_ecp($row[4]) . '</td>';
                    $s .= '<td class="td">' . $row[5] . '</td>';
                    $s .= '<td class="td">' . get_guild($row[6]) . '</td>';
                    $s .= '</tr>';
                    $count++;
                }
                echo $s;
                ?>
            </table>
        </div>
    </body>
</html>
