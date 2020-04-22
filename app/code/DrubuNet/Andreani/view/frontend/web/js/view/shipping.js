define([
    'ko'
], function (ko) {
    'use strict';

    return function (Component) {
        return Component.extend({
            carriers: ko.observable([]),
            /**
             * @return {exports}
             */
            initialize: function () {
                var self = this;
                this._super();
                this.rates.subscribe(function (values) {
                    var carrierList = []
                    values.forEach(function (method) {
                        var carrier = carrierList.find(c => c.code == method.carrier_code);
                        if (!carrier) {
                            carrier = { code: method.carrier_code, title: method.carrier_title, methods: [] };
                            carrierList.push(carrier);
                        }
                        carrier.methods.push(method);
                    })
                    self.carriers(carrierList)
                });
                return this;
            },

            getMethods: function (carrier) {
                return carrier.methods;
            },
        });
    };
});