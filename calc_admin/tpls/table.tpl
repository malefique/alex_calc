<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Панель управления</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <!-- Latest compiled and minified JavaScript -->
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <!--<script src="//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min.js" type="text/javascript" data-main="/calc_admin/assets/js/core.js"></script>-->
    <script src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.2.0/require.min.js"></script>

    <script src="/calc_admin/assets/js/core.js"></script>
    <link rel="stylesheet" href="/style.css" />
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Панель управления</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
        </div>
    </div>
</nav>

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar" data-bind="foreach: leftMenu">
                <li data-bind="attr:{
                class: id == $root.currentLeftMenuId() ? 'active' : ''
                }, click: $root.toggleActive"><a href="#" data-bind='text: title'></a></li>
                <!--<li><a href="#">Цены</a></li>
                <li><a href="#">Скидки</a></li>-->
            </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 class="page-header">Тип кузова</h1>
            <div class="row placeholders">
                <!-- ko foreach: carTypes -->
                    <div data-bind="attr:{ class: id == $root.currentCarType() ? 'col-xs-6 col-sm-3 placeholder car_'+id+' active' : 'col-xs-6 col-sm-3 placeholder car_'+id }, click: $root.toggleActiveCar">
                        <img src="/calc_admin/assets/images/tr.png" alt="" width="200"  height="200" />
                        <h4 data-bind="text: title"></h4>
                    </div>
                <!-- /ko -->
            </div>
                    <!-- <h2 class="sub-header" data-bind="text: kit().title"></h2> -->
            <div class="table-responsive" data-bind="visible: currentLeftMenuId() == 1">
                <table class="table table-striped">
                    <tr>
                        <th>active</th>
                        <th>bodyicon</th>
                        <th>code</th>
                        <th>description</th>
                        <th>id</th>
                        <th>norma</th>
                        <th>title</th>
                    </tr>

                        <tr data-bind="with: kit()">
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: active,event: {change: $root.editKit}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: bodyicon,event: {change: $root.editKit}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: code,event: {change: $root.editKit}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: description,event: {change: $root.editKit}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: id,event: {change: $root.editKit}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: norma,event: {change: $root.editKit}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: title,event: {change: $root.editKit}" />
                            </td>
                        </tr>
                </table>
            </div>
            <div class="table-responsive" data-bind="visible: currentLeftMenuId() == 2">
                <table class="table table-striped">
                    <tr>
                        <th>title</th>
                        <th>code</th>
                        <th>discount</th>
                        <th>icon</th>
                        <th>id</th>
                        <th>kit_id</th>
                        <th>norma</th>
                        <th>paint</th>
                        <th>repair</th>
                        <th>replacement</th>
                        <th>slug</th>
                        <th>svg_icon</th>
                        <th>active</th>
                    </tr>
                    <!-- ko foreach: prices() -->
                        <tr>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: title,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: code,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: discount,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: icon,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: id,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: kit_id,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: norma,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: paint,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: repair,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: replacement,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: slug,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: svg_icon,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: active,event: {change: $root.editPrice}" />
                            </td>
                        </tr>
                    <!-- /ko -->
                </table>
            </div>
        </div>
    </div>
</div>
</body>
</html>