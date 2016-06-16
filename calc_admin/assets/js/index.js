define(['assets/js/knockout-min.js'], function(ko) {
    function Price(item){
        var self = this;
        self.active = ko.observable(item.active);
        self.code = ko.observable(item.code);
        self.discount = ko.observable(item.discount);
        self.icon = ko.observable(item.icon);
        self.id = ko.observable(item.id);
        self.kit_id = ko.observable(item.kit_id);
        self.norma = ko.observable(item.norma);
        self.paint = ko.observable(item.paint);
        self.paint_com = ko.computed({
            read: function () {
                return (self.norma() * self.paint()).toFixed(1);
            },
            write: function (value) {
                self.paint((value/this.norma()).toFixed(1));
            },
            owner: self
        });
        self.repair = ko.observable(item.repair);
        self.repair_com = ko.computed({
            read: function () {
                return (self.norma() * self.repair()).toFixed(1);
            },
            write: function (value) {
                self.repair((value/self.norma()).toFixed(1));
            },
            owner: self
        });
        self.replacement = ko.observable(item.replacement);
        self.replacement_com = ko.computed({
            read: function () {
                return (self.norma() * self.replacement()).toFixed(1);
            },
            write: function (value) {
                self.replacement((value/self.norma()).toFixed(1));
            },
            owner: self
        });
        self.slug = ko.observable(item.slug);
        self.svg_icon = ko.observable(item.svg_icon);
        self.title = ko.observable(item.title);
    }

    return function indexModel() {
        var self = this;
        self.loadResources = function(callback){
            callback();
        };

        self.leftMenu = ko.observableArray([
            { id: 1, title: "Настройки"},
            { id: 2, title: "Цены"},
            { id: 3, title: "Скидки"},
        ]);

        self.carTypes = ko.observableArray([
            { id: 1, title: "Sedan", dataUrl: "/shit_sedan.json?"+Math.floor((Math.random() * 10000) + 1)},
            { id: 2, title: "Crossover", dataUrl: "/shit_crossover.json?"+Math.floor((Math.random() * 10000) + 1)}
        ]);

        self.activeTypes = ko.observableArray([
            { id: 'Y'},
            { id: 'N'}
        ]);

        self.notifications = ko.observable(false);

        self.currentLeftMenuId = ko.observable(1);
        self.currentCarType = ko.observable(1);
        self.kit = ko.observable();
        self.prices = ko.observableArray();
        self.modal = ko.observable({
            title: ko.observable(''),
            body: ko.observable()
        });

        self.toggleActive = function(menuItem){
            //self.currentCarType(1);
            if(self.notifications() === false){
                self.currentLeftMenuId(menuItem.id);
                self.loadResources(function(){
                    switch(self.currentLeftMenuId()){
                        case 1:
                            $.getJSON( self.carTypes()[self.currentCarType()-1].dataUrl).done(function( data ) {
                                self.kit({
                                    active: ko.observable(data.kit.active),
                                    bodyicon: data.kit.bodyicon,
                                    code: ko.observable(data.kit.code),
                                    description: ko.observable(data.kit.description),
                                    id: data.kit.id,
                                    norma: ko.observable(data.kit.norma),
                                    title: ko.observable(data.kit.title),
                                    data_image: data.kit.data_image
                                });
                            });
                            break;
                        case 2:
                            $.getJSON( self.carTypes()[self.currentCarType()-1].dataUrl).done(function( data ) {
                                var temp = [];
                                for(var k in data.elements)
                                    temp.push(new Price(data.elements[k]));
                                self.prices([]);
                                self.prices.push.apply(self.prices,temp);
                            });
                            break;
                        case 3:
                            break;
                    }
                });
            }
        };

        self.toggleActive(self.leftMenu()[self.currentLeftMenuId()-1]);

        self.toggleActiveCar = function(carItem){
            if(self.notifications() === false){
                self.currentCarType(carItem.id);
                self.toggleActive(self.leftMenu()[self.currentLeftMenuId()-1]);
            }
            else{
                $('.modal').modal('show');
            }
        };

        self.editKit = function(kit){
            self.notifications(true);
        }

        self.editPrice = function(price){
            self.notifications(true);
        }

        self.turnOffNotifications = function(){
            self.notifications(false);
        }

        self.saveChanges = function(){
            $.post('/calc_admin/xhr.php', {
                kits: ko.toJSON(self.kit()),
                prices: ko.toJSON(self.prices()),
                car_type: self.currentCarType()
            },function(r){
                console.log(r);
                if(r.ok){
                    console.log(r.ok);
                    self.turnOffNotifications();
                }
            },"json");
        }


        /*self.contacts = ko.observableArray(ko.utils.arrayMap(contacts, function(contact) {
         return {
         id: contact.id,
         provider_id: contact.provider_id,
         provider: contact.provider,
         date: contact.date,
         cost: contact.cost,
         comment: contact.comment
         };
         }));*/
    }
});