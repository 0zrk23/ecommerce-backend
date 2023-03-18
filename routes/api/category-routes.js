const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const allCategoryData = await Category.findAll({include: Product})
    // console.log(allCategoryData);
    res.status(200).json(allCategoryData)
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    //find category by primary id
    const categoryData = await Category.findByPk(req.params.id,{include: Product});
    //check if the category exists, if not return 404
    if(!categoryData){
      console.log(`No category found with that ID!`);
      res.status(400).json({message: 'No category found with that ID'});
      return;
    }
    //respond with the category data
    // console.log(categoryData);
    res.status(200).json(categoryData);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    //create based on request body
    const newCategory = await Category.create(req.body)
    //respond with the created data
    // console.log('Created New Category')
    // console.log(newCategory);
    res.status(201).json({message: 'Created new category!', newCategory})
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    //find category by id
    const instanceOfCategory = await Category.findByPk(req.params.id);
    //if it doesnt exist, return 404
    if(!instanceOfCategory){
      console.log('No category found with that ID');
      res.status(404).send('No category found with that ID');
      return;
    }
    //update category
    instanceOfCategory.category_name = req.body.category_name;
    await instanceOfCategory.save();
    //return the updated data
    console.log(instanceOfCategory);
    res.status(200).json({message: 'Successfully updated category', upsatedCategory: instanceOfCategory})
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    //find the category by the id
    const instanceOfCategory = await Category.findByPk(req.params.id);
    // console.log(instanceOfCategory)
    //if it doesnt exist return 404
    if(!instanceOfCategory){
      console.log('No category found with that ID');
      res.status(404).send('No category found with that ID');
      return;
    }
    //delete category
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    //return the deleted data
    res.status(200).json({message: 'Successfully deleted category', deletedCategory: instanceOfCategory})
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
