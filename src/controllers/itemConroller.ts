import Item from '../models/itemModel';
import Category from '../models/categoryModel';
import { Request, Response, response } from 'express';
import categoryModel from '../models/categoryModel';
import { log } from 'console';

export const create = async (req: Request, res: Response) => {
    const item = new Item(req?.body);

    try {
        const data = await item.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const searchItems = async (req: Request, res: Response) => {
    const { query, searchBy } = req.body;
    const queryRegex = new RegExp(query || '', 'i');
    console.log(`Searching assets by ${searchBy}, query=${query} .....`)

    try {
        let data: any = [];
        switch (searchBy) {
            case "name":
                data = await Item.find({ name: queryRegex }).populate('category', 'name');
                break;
            case "brand":
                data = await Item.find({ brand: queryRegex }).populate('category', 'name');
                break;
            case "category":
                const items = await Item.find().populate('category', 'name');
                data = items.filter(item => {
                    if (item.category) {
                        return item.category.name.match(queryRegex);
                    }
                    return false;
                });
                break;
            case "isActive":
                const isActive = ('true'.match(queryRegex) || 'yes'.match(queryRegex) || 'available'.match(queryRegex) || '1'.match(queryRegex)) ? true : false
                data = await Item.find({ isActive: isActive }).populate('category', 'name');
                break;
            default:
                data = [];
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error'
        });
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        log('fetching all items')
        const data = await Item.find().populate('category');
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const findOne = async (req: Request, res: Response) => {
    const { itemtId } = req.params;

    try {
        const item = await Item.findById(itemtId).populate('category');

        if (!item) {
            return res.status(404).send({
                message: `Item not found with id ${itemtId}`
            });
        }
        res.status(200).send(item);

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Item not found with id ${itemtId}`
            });
        }
        return res.status(500).send({
            message: `Error retrieving Item with id ${itemtId}`
        });
    }
};

export const update = async (req: Request, res: Response) => {
    const { itemtId } = req.params

    try {
        const item = await Item.findByIdAndUpdate(itemtId, {
            name: req?.body?.name,
            dimension: req?.body?.dimension,
            brand: req?.body?.brand,
            price: req?.body?.price,
            quantity: req?.body?.quantity,
            category: req?.body?.category
        }, { new: true });

        if (!item) {
            return res.status(404).send({
                message: `Item not found with id ${itemtId}`
            });
        }
        res.status(201).send(item);

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Item not found with id ${itemtId}`
            });
        }
        return res.status(500).send({
            message: `Error retrieving item with id ${itemtId}`
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    const { itemtId } = req.params;

    try {
        const item = await Item.findByIdAndRemove(itemtId);

        if (!item) {
            return res.status(404).send({
                message: `Item not found with id ${itemtId}`
            });
        }
        res.send({ message: "Item deleted successfully!", itemtId: itemtId });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Item not found with id ${itemtId}`
            });
        }
        return res.status(500).send({
            message: `Could not delete item with id ${itemtId}`
        });
    }
};



