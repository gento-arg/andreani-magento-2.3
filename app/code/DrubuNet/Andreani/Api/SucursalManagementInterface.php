<?php
namespace DrubuNet\Andreani\Api;

interface SucursalManagementInterface
{

    /**
     * Find sucursal for the customer
     *
     * @param string $region
     * @param string $location
     * @return \DrubuNet\Andreani\Api\Data\SucursalInterface[]
     */
    public function fetchSucursales($region, $location);

    /**
     * Find sucursales for the customer
     *
     * @param string $cp
     * @return \DrubuNet\Andreani\Api\Data\SucursalInterface[]
     */
    public function fetchSucursalesCP($cp);

    /**
     * @return \DrubuNet\Andreani\Api\Data\ProvinciaInterface[]
     */
    public function fetchProvincias();

    /**
     * @param string $region
     * @return \DrubuNet\Andreani\Api\Data\LocalidadInterface[]
     */
    public function fetchLocalidades($region);

    /**
     * Get de cotizacion para una sucursal especifica
     *
     * @param \DrubuNet\Andreani\Api\Data\SucursalInterface $sucursal
     * @return array
     */
    //\DrubuNet\Andreani\Api\Data\SucursalInterface
    public function getCotizacionSucursal($sucursal);
}
