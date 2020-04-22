define(
    [
        // $
        'jquery',
        // resourceUrlManager
        'DrubuNet_Andreani/js/view/checkout/shipping/model/resource-url-manager',
        // quote
        'Magento_Checkout/js/model/quote',
        // storage
        'mage/storage',
        // shippingService
        'Magento_Checkout/js/model/shipping-service',
        // sucursalesRegistry
        'DrubuNet_Andreani/js/view/checkout/shipping/model/sucursales-registry',
        // provinciasRegistry
        'DrubuNet_Andreani/js/view/checkout/shipping/model/provincias-registry',
        // errorProcessor
        'Magento_Checkout/js/model/error-processor',
        // priceUtils
        'Magento_Catalog/js/price-utils'
    ],
    function ($, resourceUrlManager, quote, storage, shippingService, sucursalesRegistry, provinciasRegistry, errorProcessor, priceUtils) {
        'use strict';

        return {
            /**
             * Get nearest machine list for specified address
             * @param {Object} address
             */
            getSucursalList: function (address, form) {
                shippingService.isLoading(true);
                var cacheKey = address.getCacheKey() + "_" + quote.shippingAddress().extensionAttributes.andreanisucursal_provincia + "_" + quote.shippingAddress().extensionAttributes.andreanisucursal_localidad,
                    cache = sucursalesRegistry.get(cacheKey),
                    serviceUrl = resourceUrlManager.getUrlForSucursalList(quote);

                if (cache) {
                    form.setSucursalList(cache);
                    shippingService.isLoading(false);
                } else {
                    storage.get(
                        serviceUrl, false
                    ).done(
                        function (result) {
                            sucursalesRegistry.set(cacheKey, result);
                            form.setSucursalList(result);
                        }
                    ).fail(
                        function (response) {
                            errorProcessor.process(response);
                        }
                    ).always(
                        function () {
                            shippingService.isLoading(false);
                        }
                    );
                }
            },
            /**
             * Get nearest machine list for specified address
             * @param {Object} address
             */
            getProvinciaList: function (address, form) {
                shippingService.isLoading(true);
                var cacheKey = address.getCacheKey(),
                    cache = provinciasRegistry.get(cacheKey),
                    serviceUrl = resourceUrlManager.getUrlForProvinciaList(quote);

                if (cache) {
                    form.setProvinciaList(cache);
                    shippingService.isLoading(false);
                } else {
                    storage.get(
                        serviceUrl, false
                    ).done(
                        function (result) {
                            provinciasRegistry.set(cacheKey, result);
                            form.setProvinciaList(result);
                        }
                    ).fail(
                        function (response) {
                            errorProcessor.process(response);
                        }
                    ).always(
                        function () {
                            shippingService.isLoading(false);
                        }
                    );
                }
            },

            getLocalidadList: function (address, form) {
                shippingService.isLoading(true);
                var cacheKey = address.getCacheKey() + "_" + quote.shippingAddress().extensionAttributes.andreanisucursal_provincia,
                    cache = provinciasRegistry.get(cacheKey),
                    serviceUrl = resourceUrlManager.getUrlForLocalidadList(quote);

                if (cache) {
                    form.setLocalidadList(cache);
                    shippingService.isLoading(false);
                } else {
                    storage.get(
                        serviceUrl, false
                    ).done(
                        function (result) {
                            provinciasRegistry.set(cacheKey, result);
                            form.setLocalidadList(result);
                        }
                    ).fail(
                        function (response) {
                            errorProcessor.process(response);
                        }
                    ).always(
                        function () {
                            shippingService.isLoading(false);
                        }
                    );
                }
            },

            getCotizacionSucursal: function (address, form) {
                shippingService.isLoading(true);
                var serviceUrl = resourceUrlManager.getUrlForCotizacionSucursal(quote);

                storage.post(
                    serviceUrl,
                    JSON.stringify({ "sucursal": form.getSucursal() }),
                    true
                )
                    .done(function (response) {
                        let costoEnvio = priceUtils.formatPrice(response[0].shippingPrice, quote.getPriceFormat());
                        try {
                            $($($("#label_method_sucursal_andreanisucursal").parent()[0].childNodes[3]).children('span')).text(costoEnvio)
                        } catch (e) { }
                    })
                    .fail(function (response) {
                        alert("Ocurrio un error obteniendo la cotizacion. Intentelo mas tarde")
                    })
                    .always(function () {
                        shippingService.isLoading(false);
                    });
            },

        };
    }
);