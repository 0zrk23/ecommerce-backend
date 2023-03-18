const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    //find all of the tags
    const allTagData = await Tag.findAll({include: Product})
    //respond with all of the tags
    res.status(200).json(allTagData);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const instanceOfTag = await Tag.findByPk(req.params.id, {include: {all: true}})
    if(!instanceOfTag){
      res.status(404).send('No tag found matching the ID');
      return;
    }
    res.status(200).json(instanceOfTag);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    //create the tag using the reqeust body
    const instanceOfNewTag = await Tag.create(req.body);
    //respond with the created tag
    res.status(201).json({tag_created: instanceOfNewTag});
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    //find the tag matching the id
    const instanceOfTag = await Tag.findByPk(req.params.id);
    //return 404 if its not found
    if(!instanceOfTag){
      res.status(404).send('No tag matching the ID');
      return;
    }
    //update the fields for the tag
    await instanceOfTag.update(req.body);
    //return the updated info
    res.status(200).json({updated_tag: instanceOfTag})
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    //find the tag matching the id
    const instanceOfTag = await Tag.findByPk(req.params.id);
    //return 404 if its not found
    if(!instanceOfTag){
      res.status(404).send('No tag matching the ID');
      return;
    }
    //delete instance
    await instanceOfTag.destroy();
    //respond with the delete
    res.status(200).json({deleted_tag: instanceOfTag})
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
