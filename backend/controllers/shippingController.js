const shippo = require('shippo')(process.env.SHIPPO_API_KEY);


exports.obtenerTarifasEnvio = async (req, res) => {
  try {
    const { direccionEnvio, items } = req.body;

    // Dirección de origen (tu almacén)
    const addressFrom = {
      name: 'Nombre de tu tienda',
      street1: 'Dirección de tu tienda',
      city: 'Ciudad',
      state: 'Estado',
      zip: 'Código Postal',
      country: 'US',
      phone: '1234567890',
      email: 'tienda@example.com',
    };

    // Dirección de destino (cliente)
    const addressTo = {
      name: req.user.nombre,
      street1: direccionEnvio.direccion,
      city: direccionEnvio.ciudad,
      state: direccionEnvio.estado,
      zip: direccionEnvio.codigoPostal,
      country: direccionEnvio.pais,
      phone: req.user.telefono || '0000000000',
      email: req.user.email,
    };

    // Calcular peso total
    const totalWeight = items.reduce((acc, item) => acc + item.peso * item.cantidad, 0);

    const parcel = {
      length: '10',
      width: '7',
      height: '5',
      distance_unit: 'in',
      weight: totalWeight.toString(),
      mass_unit: 'lb',
    };

    // Crear envío
    const shipment = await shippo.shipment.create({
      address_from: addressFrom,
      address_to: addressTo,
      parcels: [parcel],
      async: false,
    });

    // Obtener tarifas de envío
    const rates = shipment.rates;
    res.json(rates);
  } catch (error) {
    console.error('Error al obtener tarifas de envío:', error);
    res.status(500).json({ msg: 'Error al obtener tarifas de envío' });
  }
};
