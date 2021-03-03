
<?php 

if (! function_exists('revDate')) {
    function revDate($date)
    {
        if($date === null) {
            return $date;
        }

        $date = explode("-", $date);
        return "$date[2]-$date[1]-$date[0]";
    }
}