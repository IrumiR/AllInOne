import Service from "../models/ServiceSchema.js";
import ServiceProvider from "../models/ServiceProviderSchema.js";
import { validationResult } from "express-validator";

// create a new service
export const createService = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        price,
        description,
        image,
        category,
    } = req.body;


    try {

        const serviceProvider = await ServiceProvider.findOne({ userId: req.userId });

        if (!serviceProvider) {
            return res.status(400).json({ errors: [{ msg: 'Service Provider not found' }] });
        }

        const service = new Service({
            serviceProviderId: serviceProvider._id,
            title,
            price,
            description,
            image,
            category,
        });

        await service.save();

        res.status(201).json({ type: 'sucess', data: service });

    } catch (error) {
        console.error(error);
        res.status(500).json({ type: 'error', errors: [{ msg: error }] });
    }
}

// delete a service by id
export const deleteServiceById = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const serviceId = req.params.id;

    try {
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ type: 'error', message: 'Service not found' });
        }

        await Service.findByIdAndDelete(serviceId);

        res.status(200).json({ type: 'sucess', message: 'Service Deleted' });

    } catch (error) {
        return res.status(400).json({ type: 'error', message: 'Service Deleting Error', errors: [{ msg: error }] });
    }
}

// // get all services, 
export const getAllServices = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const allServices = await Service.find({});

        res.status(200).json({ type: 'sucess', message: 'Services Found', data: allServices });

    } catch (error) {
        return res.status(400).json({ type: 'error', message: 'Servcies Retring Error', errors: [{ msg: error }] });
    }
}

// get single service by id
export const getServiceById = async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const serviceId = req.params.id;

    try {
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ type: 'error', message: 'Service not found' });
        }

        res.status(200).json({ type: 'sucess', message: 'Service Found', data: service });

    } catch (error) {
        return res.status(400).json({ type: 'error', message: 'Service Retriving Error', errors: [{ msg: error }] });
    }

}

// // update service by id
export const updateServiceById = async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const serviceId = req.params.id;

    try {
        const service = await Service.findById(serviceId);

        if (!service) {
            return res.status(404).json({ type: 'error', message: 'Service not found' });
        }

        const {
            title,
            price,
            description,
            image,
            category,
        } = req.body;

        service.title = title;
        service.price = price;
        service.description = description;
        service.image = image;
        service.category = category;

        await service.save();

        res.status(200).json({ type: 'sucess', message: 'Service Updated', data: service });

    } catch (error) {
        return res.status(400).json({ type: 'error', message: 'Service Updating Error', errors: [{ msg: error }] });
    }

}

// // get all services by service provider id
export const getAllServicesByServiceProviderId = async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const serviceProviderId = req.params.id;

    try {
        const services = await Service.find({ serviceProviderId });

        if (!services) {
            return res.status(404).json({ type: 'error', message: 'Services not found' });
        }

        res.status(200).json({ type: 'sucess', message: 'Services Found', data: services });

    } catch (error) {
        return res.status(400).json({ type: 'error', message: 'Servcies Retring Error', errors: [{ msg: error }] });
    }
}
