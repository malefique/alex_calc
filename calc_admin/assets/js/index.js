define(['assets/js/knockout-min.js'], function(ko) {
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
            { id: 1, title: "Sedan", dataUrl: "/shit_sedan.json?1"},
            { id: 2, title: "Crossover", dataUrl: "/shit_crossover.json?1"}
        ]);

        self.notifications = ko.observable(false);

        self.currentLeftMenuId = ko.observable(1);
        self.currentCarType = ko.observable(1);
        self.kit = ko.observable();
        self.prices = ko.observableArray();

        self.toggleActive = function(menuItem){
            //self.currentCarType(1);
            self.currentLeftMenuId(menuItem.id);
            self.loadResources(function(){
                switch(self.currentLeftMenuId()){
                    case 1:
                        $.getJSON( self.carTypes()[self.currentCarType()-1].dataUrl).done(function( data ) {
                            self.kit({
                                active: ko.observable(data.kit.active),
                                bodyicon: ko.observable(data.kit.bodyicon),
                                code: ko.observable(data.kit.code),
                                description: ko.observable(data.kit.description),
                                id: ko.observable(data.kit.id),
                                norma: ko.observable(data.kit.norma),
                                title: ko.observable(data.kit.title)
                            });
                        });
                        break;
                    case 2:
                        $.getJSON( self.carTypes()[self.currentCarType()-1].dataUrl).done(function( data ) {
                            var temp = [];
                            for(var k in data.elements)
                                temp.push(ko.observable({
                                    active: ko.observable(data.elements[k].active),
                                    code: ko.observable(data.elements[k].code),
                                    discount: ko.observable(data.elements[k].discount),
                                    icon: ko.observable(data.elements[k].icon),
                                    id: ko.observable(data.elements[k].id),
                                    kit_id: ko.observable(data.elements[k].kit_id),
                                    norma: ko.observable(data.elements[k].norma),
                                    paint: ko.observable(data.elements[k].paint),
                                    repair: ko.observable(data.elements[k].repair),
                                    replacement: ko.observable(data.elements[k].replacement),
                                    slug: ko.observable(data.elements[k].slug),
                                    svg_icon: ko.observable(data.elements[k].svg_icon),
                                    title: ko.observable(data.elements[k].title)
                                }));
                            self.prices([]);
                            self.prices.push.apply(self.prices, temp);
                            console.log(self.prices());
                        });
                        break;
                    case 3:
                        break;
                }
            });
        };

        self.toggleActive(self.leftMenu()[self.currentLeftMenuId()-1]);

        self.toggleActiveCar = function(carItem){
            self.currentCarType(carItem.id);
            self.toggleActive(self.leftMenu()[self.currentLeftMenuId()-1]);
        };

        self.editKit = function(kit){
            console.log(kit);
        }

        self.editPrice = function(price){
            console.log(price);
        }

        self.saveChanges = function(){

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