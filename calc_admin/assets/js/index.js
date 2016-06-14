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
            { id: 1, title: "Sedan", dataUrl: "/shit_sedan.json"},
            { id: 2, title: "Crossover", dataUrl: "/shit_crossover.json"}
        ]);

        self.currentLeftMenuId = ko.observable(1);
        self.currentCarType = ko.observable(1);
        self.kits = ko.observableArray();

        self.toggleActive = function(menuItem){
            console.log(menuItem);
            self.currentCarType(1);
            console.log(self.currentCarType());
            self.currentLeftMenuId(menuItem.id);
            self.loadResources(function(){
                console.log(self.currentLeftMenuId());
                console.log(self.carTypes());
                switch(self.currentLeftMenuId()){
                    case 1:
                        console.log(self.carTypes()[self.currentCarType()-1]);
                        $.getJSON( self.carTypes()[self.currentCarType()-1].dataUrl, function( data ) {
                            console.log(data);
                            var shit = [data.kit];
                            self.kit = ko.observableArray(ko.utils.arrayMap(shit, function(kit) {
                                return {
                                    active: kit.active,
                                    bodyicon: kit.bodyicon,
                                    code: kit.code,
                                    description: kit.description,
                                    id: kit.id,
                                    norma: kit.norma,
                                    title: kit.title
                                }
                            }));
                            console.log(self.kit());
                        });
                        break;
                }
            });
        };

        self.toggleActive(self.leftMenu()[self.currentLeftMenuId()-1]);

        self.toggleActiveCar = function(carItem){
            self.currentCarType(carItem.id);
        };


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