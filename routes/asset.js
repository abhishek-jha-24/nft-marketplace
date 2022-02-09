const express = require('express');
const AssetController = require('../src/asset/asset.controller');

const router = express.Router();

// Create
router.post('/',AssetController.createAsset);

// Update
router.put('/',AssetController.updateAsset);

// Delete
router.delete('/',AssetController.deleteAsset);

// Read
router.get('/',AssetController.getAllAssets);
router.get('/user/:ownerId',AssetController.getUsersAssets);
router.get('/:id',AssetController.getAssetById);

module.exports = router;
