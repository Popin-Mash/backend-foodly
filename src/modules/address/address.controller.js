
// const addressService = require("./address.service");

// module.exports = {
//     addAddress: async (req, res) => {
//         try {
//             await addressService.addAddress(req.body);
//             res.status(201).json({ status: true, message: "address has been successfully added" });
//         } catch (e) {
//             res.status(500).json({ error: e.message });
//         }

//         getAddresses: async (req, res) => {
//             try {
//                 const addresses = await addressService.getAddress(req.body);
//                 res.status(200).json(addresses);
//             } catch (e) {
//                 res.status(500).json({ error: e.message });
//             }
//         }
//     }
// }