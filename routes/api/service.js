const express = require('express');
const router = express.Router();
const Service = require('../../models/Service');
const { check, validationResult } = require('express-validator');

router.post('/', [
		check('title', "service name is required").not().isEmpty(),
		check('code', "code is required").not().isEmpty(),
		check('price', "price is required").not().isEmpty(),
		check('description', "description is required").not().isEmpty()
    ], 
    async(req, res) => {
		
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()})
	}

	const {
		title,
		code,
		price,
		description
    } = req.body
    
  	try{
        let service = await Service.findOne({code});
        if(service) {
			return res.status(400).json({errors: [{msg: 'service code exists'}]})
		}
        //Create the service
		service = new Service({
            title,
            code,
            price,
            description
        });
        await service.save();
        res.json(service);
        
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


//////////////////Update service/////////////////////////
router.put('/update/:id', [
		check('title', "service name is required").not().isEmpty(),
		check('code', "code is required").not().isEmpty(),
		check('laborvalue', "labor value is required").not().isEmpty(),
		check('price', "price is required").not().isEmpty(),
		check('description', "description is required").not().isEmpty()
    ], 
    async(req, res) => {
		
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(400).json( { errors: errors.array() } )
	};

	const {
		title,
		code,
		laborvalue,
		price,
		description
		} = req.body
	
	const servField = {
		title,
		code,
		laborvalue,
		price,
		description		
		}

  	try{
		const service = await Service.findOneAndUpdate(
				{_id: req.params.id},
				{$set: servField}
				// {edit: true}
			);
			return res.json(service);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
////////////////////////////////////////////

//////////////delete service////////////////
router.delete("/:id", async(req, res) => {
	try {
		await Service.findOneAndRemove({_id: req.params.id});
		const services = await Service.find();
		res.json(services)
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})
/////////////////////////////////////////////////

/////////////////Get all services/////////////////
router.get('/', async (req, res) => {
	try {
		const services = await Service.find();
		res.json(services);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//Get service by id
router.get("/:id", async(req, res) => {
	try {
		const service = await Service.findOne({_id: req.params.id});
		if(!service) {
			return res.status(400).json({msg: 'service not found'})
		}
		res.json(service);
	}catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
