require(['assets/js/knockout-min.js', 'assets/js/index'], function(ko, indexModel) {
    ko.applyBindings(new indexModel());
});


var actions = {
    load: function(){
        $.get('rh.php',{event: 'getOrders'}).done(function(d){
            var d = $.parseJSON(d);
            if(d){
                ko.applyBindings(new ContactsModel(d.contacts, d.providers));
            }
            else
                console.log('empty table orders');
        });
    },
    /*addOrder: function(){

     },*/
};

//actions.load();

var ContactsModel = function(contacts,providers) {
    var self = this;
    //console.log(providers);
    self.contacts = ko.observableArray(ko.utils.arrayMap(contacts, function(contact) {
        return {
            id: contact.id,
            provider_id: contact.provider_id,
            provider: contact.provider,
            date: contact.date,
            cost: contact.cost,
            comment: contact.comment
        };
    }));
    self.contacts.extend({ paged: { pageSize: 10 } });

    self.boolpages = ko.pureComputed(function(){
        return (self.contacts.pageCount()>1);
    },this);

    self.boolMode = ko.observable(false);

    self.changeMode = function(){
        if(self.boolMode())
            self.boolMode(false);
        else
            self.boolMode(true);
    };

    self.providers = ko.observableArray(ko.utils.arrayMap(providers, function(provider) {
        return {
            id: provider.id,
            title: ko.observable(provider.title),
            deposit: ko.observable(provider.deposit),
        };
    }));
    /* console.log(self.providers1());
     self.providers = ko.pureComputed(function() {
     return ko.observableArray(ko.utils.arrayMap(self.providers1, function(provider) {
     return {
     id: provider.id,
     title: provider.title,
     deposit: provider.deposit,
     };
     }))();
     }, this);*/

    console.log(self.providers());
    self.addContact = function() {
        $.get('rh.php',{event: 'addOrder'}).done(function(d){
            var d = $.parseJSON(d);
            if(d){
                self.contacts.unshift({
                    id: d.id,
                    provider_id: d.provider_id,
                    provider: d.provider,
                    date: d.date,
                    cost: d.cost,
                    comment: d.comment
                });
            }
            else
                console.log('not allowed');
        });
    };

    self.addProvider = function() {
        $.get('rh.php',{event: 'addProvider'}).done(function(d){
            var d = $.parseJSON(d);
            if(d){
                self.providers.push({
                    id: d.id,
                    title: ko.observable(d.title),
                    deposit: ko.observable(d.deposit),
                });
            }
            else
                console.log('not allowed');
        });
    };

    self.removeContact = function(contact) {
        if(confirm('Удалить?')){
            $.get('rh.php',{event: 'removeOrder',id: contact.id}).done(function(d){
                var d = $.parseJSON(d);
                if(d){
                    var pid = 0;
                    for(var i in self.providers()){
                        if(self.providers()[i].id == contact.provider_id)
                            pid = i;
                    }
                    var newdep = Math.round(parseFloat(self.providers()[pid].deposit()) + parseFloat(contact.cost));
                    console.log(newdep);
                    self.providers()[pid].deposit(newdep);
                    self.editProvider(self.providers()[pid]);

                    self.contacts.remove(contact);
                }
                else
                    console.log('not allowed');
            });
        }
    };

    self.removeProvider = function(provider) {
        if(confirm('Удалить?')){
            $.get('rh.php',{event: 'removeProvider',id: provider.id}).done(function(d){
                var d = $.parseJSON(d);
                if(d){

                    self.providers.remove(provider);
                }
                else
                    console.log('not allowed');
            });
        }
    };

    self.editContact = function(contact){
        console.log(contact);
        $.get('rh.php',{event: 'editOrder',id: contact.id,provider_id: contact.provider_id, cost: contact.cost, comment: contact.comment}).done(function(d){
            var d = $.parseJSON(d);
            if(d){
                var oldcost = d.cost;
                var pid = 0;
                var oldpid = 0;
                for(var i in self.providers()){
                    if(self.providers()[i].id == d.provider_id)
                        pid = i;
                }
                /*var pid = ko.utils.arrayFilter(self.providers(), function(provider) {
                 if(provider.id == d.provider_id)
                 return true;
                 });*/
                //pid = pid[0].id;
                console.log('Pid: '+ pid);
                console.log('First cost: '+oldcost);
                var newdep = Math.round(parseFloat(self.providers()[pid].deposit()) + parseFloat(oldcost) - parseFloat(contact.cost));
                if(self.providers()[pid].id != contact.provider_id){
                    oldpid = pid;
                    console.log(contact);
                    for(var i in self.providers()){
                        if(self.providers()[i].id == contact.provider_id)
                            pid = i;
                    }
                    newdep = Math.round(parseFloat(self.providers()[pid].deposit())-parseFloat(contact.cost));
                    olddep = Math.round(parseFloat(self.providers()[oldpid].deposit())+parseFloat(contact.cost));
                    self.providers()[oldpid].deposit(olddep);
                    self.editProvider(self.providers()[oldpid]);
                }

                console.log(newdep);
                console.log(self.providers()[pid].deposit());
                self.providers()[pid].deposit(newdep);
                self.editProvider(self.providers()[pid]);
                //console.log(self.providers());
                //self.contacts.remove(contact);
            }
            else
                console.log('not allowed');
        });
    };

    self.editProvider = function(provider){
        $.get('rh.php',{event: 'editProvider',id: provider.id,title: provider.title(), deposit: provider.deposit()}).done(function(d){
            var d = $.parseJSON(d);
            if(d){
                /*for(var i in self.providers()){
                 if(self.providers()[i].id == d.id)
                 pid = i;
                 }*/
            }
            else
                console.log('not allowed');
        });
    };

    self.save = function() {
        self.lastSavedJson(JSON.stringify(ko.toJS(self.contacts), null, 2));
    };

    self.lastSavedJson = ko.observable("")
    //callbacks
    this.addElement = function(elem) { if (elem.nodeType === 1){
        console.log(elem);
        $(elem).addClass('animated bounce');
    }};
    this.removeElement = function(elem) {  if (elem.nodeType === 1){console.log(elem);$(elem).addClass('animated bounce');}  };
};