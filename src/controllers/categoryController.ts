import Category from '../models/categoryModel';
import Item from '../models/itemModel';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
    const category = new Category(req?.body);

    try {
        const data = await category.save();
        res.status(201).send(data);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const findAll = async (req: Request, res: Response) => {
    try {
        const data = await Category.find()
        res.status(201).send(data)
    } catch (err) {
        res.status(500).json(err.message)
    }
}

export const findOne = async (req: Request, res: Response) => {

    const { categoryId } = req.params

    try {
        const category = await Category.findById(categoryId)
        const items = await Item.find({ category: categoryId}).populate('category', 'name')
        
        if (!category) {
            return res.status(404).send({
                message: `Category not found with id ${categoryId}`
            })
        }

        const data = {
            ...category._doc,
            items: items
        }
        
        res.status(201).send(data)
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Category not found with id ${categoryId}`
            })            
        }
        return res.status(500).send({
            message: `Error retrieving category with id ${categoryId}`
        })
    }

}

export const update = async (req: Request, res: Response) => {

    const { categoryId } = req.params

    try {
        const category = await Category.findByIdAndUpdate(categoryId, {
            name: req.body.name,
            description: req.body.description,
        }, {new: true})

        if (!category) {
            return res.status(404).send({
                message: `Category not found with id ${categoryId}`
            })
        }
        res.status(201).send(category)

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Category not found with id ${categoryId}`
            })            
        }
        return res.status(500).send({
            message: `Error retrieving category with id ${categoryId}`
        })
    }

}

export const remove = async (req: Request, res: Response) => {

    const { categoryId } = req.params

    try {
        const category = await Category.findByIdAndRemove(categoryId)

        if (!category) {
            return res.status(404).send({
                message: `Category not found with id ${categoryId}`
            })
        }
        res.send({ message: "Category deleted successfully!", categoryId: categoryId })
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Category not found with id ${categoryId}`
            })            
        }
        return res.status(500).send({
            message: `Could not delete category with id ${categoryId}`
        })
    }
}