const userModel = require("../user/user.model");
const address = require("../address/address.schema");

class AddressService {
    async addAddress(req, res) {
        const newAddress = new address({
            userId: req.user.id,
            addressLine1: req.body.addressLine1,
            postalCode: req.body.postalCode,
            default: req.body.default,
            deliveryInstructions: req.body.deliveryInstructions,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });
        try {
            if (req.body.default === true) {
                await address.updateMany({ userId: req.user.id }, { default: false });
            }
            await newAddress.save();
            res.status(201).json({ status: true, message: "Address successfully added" });
        } catch (error) {

            res.status(500).json({ status: false, message: error.message });
        }
    }
    async getAddress(req, res) {
        try {
            const addresses = await address.find({ userId: req.user.id });
            if (addresses.length === 0) {
                return res.status(404).json({ status: false, message: "No addresses found" });
            }

            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
    async deleteAddress(data) {
        try {
            const deletedAddress = await address.findByIdAndDelete({ userId: data.user.id });
            return deletedAddress;
        } catch (error) {
            console.error('Error deleting address:', error);
            throw new Error('Failed to delete address');
        }
    }

    //* live current address user
    async setAddressDefault(req, res) {
        const addressId = req.params.id;
        const userId = req.user.id;
        try {
            await address.updateMany({ userId: userId }, { default: false });
            const updateAddress = await address.findByIdAndUpdate(addressId, { default: true })
            if (updateAddress) {
                await userModel.findByIdAndUpdate(userId, { address: addressId })
                res.status(200).json({ status: true, message: "Address successfully set as default" });
            } else {
                res.status(400).json({ status: false, message: "Address not found" });
            }

        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }

    //*** get default address of user ***//
    async getDefaultAddress(req, res) {
        const userId = req.user.id;
        try {
            const add = await address.findOne({ userId: userId, default: true });
            if (!add) {
                return res.status(404).json({ status: false, message: "Default address not found" });
            }
            console.log(add);
            res.status(200).json(add);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }

    }
}

module.exports = new AddressService();