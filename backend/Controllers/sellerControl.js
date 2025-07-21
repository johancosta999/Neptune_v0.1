const Seller = require("../Models/sellerModel");

const getAllSeller = async (req, res, next) => {
    try{
        const sellers = await Seller.find();
        res.status(200).json({ data: sellers});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error "});
    }
};

const getById = async (res, req, next) => {
    const id = req.params.id;

    let record;

    try {
        record = await Seller.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!record) {
        return res.status(404).json({ message: "No seller data found."});
    }
    return res.status(201).json({ record });
};

const addSeller = async (req, res, next ) => {
    const { tankId, customerName, address, customerEmail, sellDate, nicNumber, contactNumber, price, warranty, description, invoiceNumber } = req.body;

    try{
        const newRecord = new Seller({
            tankId,
            customerName,
            address,
            customerEmail,
            sellDate,
            nicNumber,
            contactNumber,
            price,
            warranty,
            description,
            invoiceNumber,
        });
        await newRecord.save();
        res.status(201).json({ newRecord });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const updateSeller = async (req, res, next ) => {
    const id = req.params.id;
    const {
        address, 
        customerEmail,
        contactNumber,
        description
    } = req.body;

    let record;
    try{
        record = await Seller.findByIdAndUpdate(id, {
            address, 
            customerEmail,
            contactNumber,
            description
        }, { new: true });

    } catch (err) {
        console.log(err);
    }

    if (!record){
        return res.status(404).json({ message: "Data not found."});
    }
    return res.status(201).json({ record })
};

const deleteSeller = async (req, res, next) => {
    const id = req.params.id;

    let record;

    try{
        record = await Seller.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if(!record) {
        return res.status(404).json({ message : "Data not found."})
    }
    return res.status(200).json({ message: "Record successfully deleted."})
};

exports.getAllSeller = getAllSeller;
exports.getById = getById;
exports.addSeller = addSeller;
exports.updateSeller = updateSeller;
exports.deleteSeller = deleteSeller;
