const router = require('express').Router();
const { verifyTokenAndAuthorization } = require('../../middleware/verifyToken');
const addressService = require('../address/address.service');

router.post("/", verifyTokenAndAuthorization, addressService.addAddress);

router.get("/default", verifyTokenAndAuthorization, addressService.getDefaultAddress);

router.get("/all", verifyTokenAndAuthorization, addressService.getAddress);

router.delete("/:id", verifyTokenAndAuthorization, addressService.deleteAddress);

router.patch("/default/:id", verifyTokenAndAuthorization, addressService.setAddressDefault);

module.exports = router;


