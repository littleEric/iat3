<?php
    if(!isset($_GET['uuid'])){
        header("Location:index.php");
        exit;
    }
?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title>内隐联想测验</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style type="text/css"> @import "core/css/iat.css";</style>
    <link rel="stylesheet" type="text/css" href="style/pagestyle.css">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="core/js/IAT.js"></script>
    <script>
        sub = <?php echo "'".$_GET['uuid']."';"?>
    </script>
    <script type="text/javascript">
        initialize();
    </script>
</head>

<body>
    
<div id="instructions">

</div>

</body>