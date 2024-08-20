const express = require('express');
const router = express.Router();
const Payment = require('../models/Payments'); 

// middleware
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $unwind: '$itemsName'
      },
      {
        $group: {
          _id: '$itemsName',
          totalQuantity: { $sum: '$quantity' },
          totalMoney: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      },
      {
        $project: {
          _id: 0,
          itemName: '$_id',
          totalQuantity: '$totalQuantity',
          totalMoney: '$totalMoney'
        }
      },
      {
        $sort: { totalMoney: -1 }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
