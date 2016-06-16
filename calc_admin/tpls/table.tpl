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
<div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Сообщение</h4>
            </div>
            <div class="modal-body">
                <p>Сохранить изменения?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" data-bind="click: $root.turnOffNotifications">Нет</button>
                <button type="button" class="btn btn-primary" data-bind="click: $root.saveChanges">Да</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
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
                        <th>id</th>
                        <th>code</th>
                        <th>active</th>
                        <th>bodyicon</th>
                        <th>описание</th>
                        <th>базовая цена</th>
                        <th>заголовок</th>
                    </tr>

                        <tr data-bind="with: kit()">
                            <td data-bind="text: id">
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: code,event: {change: $root.editKit}" />
                            </td>
                            <td>
                                <select class="form-control" data-bind="options: $root.activeTypes,optionsValue: 'id', optionsText: 'id',value: active, event: {change: $root.editKit}">
                                </select>
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: bodyicon,event: {change: $root.editKit}" />
                            </td>

                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: description,event: {change: $root.editKit}" />
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
                        <th>id</th>
                        <th>code</th>
                        <th>title</th>
                        <th>discount</th>
                        <th>kit_id</th>
                        <th>norma</th>
                        <th>Покраска</th>
                        <th>Ремонт</th>
                        <th>Замена</th>
                        <th>slug</th>

                    </tr>
                    <!-- ko foreach: prices() -->
                        <tr>
                            <td data-bind="text: id">
                            </td>
                            <td data-bind="text: code">
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: title,event: {change: $root.editPrice}" />
                            </td>

                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: discount,event: {change: $root.editPrice}" />
                            </td>
                            <td data-bind="text: kit_id">
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: norma,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: paint_com,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: repair_com,event: {change: $root.editPrice}" />
                            </td>
                            <td>
                                <input class="form-control" type="text" data-bind = "textInput: replacement_com,event: {change: $root.editPrice}" />
                            </td>
                            <td data-bind="text: slug">
                            </td>
                        </tr>
                    <!-- /ko -->
                </table>
            </div>
            <div class="col-md-12"><button type="button" class="btn btn-primary" data-bind="visible: $root.notifications(), click: $root.saveChanges">Сохранить изменения</button></div>
        </div>
    </div>
</div>
</body>
</html>