const R = require("../helper/response.helper");
const repos = require("../repositories/index");
const jwt = require("../helper/jwt.helper");
const productController = {};
productController.get = (req, res) => {
    let id = req.params.id;
    // if (id) {
    //     repos.product.get({Id:id}).then(result => {
    //         res.status(200).send(R.Success(result));
    //     }).catch(err => {
    //         res.status(200).send(R.Fail(err));
    //     })
    // } else {
    repos.product.get({ Id: id }).then(result => {
        res.status(200).send(R.Success(result));
    }).catch(err => {
        res.status(200).send(R.Fail({}, err));
    })
    //}
}
productController.add = (req, res) => {
    const { ProductName, ShopOwnerId, ProductDetails, ItemDescription, ItemSize,Stock,Price } = req.body;
    if (!(ProductName || ShopOwnerId || ProductDetails || ItemDescription || ItemSize||Stock||Price)) {
        res.status(200).send(R.Fail("Provide all required fields."));
    } else {
        const CreatedBy = jwt.decodeToken(req.headers.authorization).id;
        repos.product.add({ ProductName, ShopOwnerId, ProductDetails, ItemDescription, ItemSize,Stock,Price, CreatedBy }).then(result => {
            res.status(200).send(R.Success({}, result));
        }).catch(err => {
            res.status(200).send(R.Fail({}, err));
        })
    }
}
productController.update = (req, res) => {
    const { Id, ProductName, ShopOwnerId, ProductDetails, ItemDescription, ItemSize,Stock,Price } = req.body;
    if (!(Id, ProductName || ShopOwnerId || ProductDetails || ItemDescription || ItemSize||Stock||Price)) {
        res.status(200).send(R.Fail("Provide all required fields."));
    } else {
        const UpdatedBy = jwt.decodeToken(req.headers.authorization).id;
        repos.product.update({ Id, ProductName, ShopOwnerId, ProductDetails, ItemDescription, ItemSize,Stock,Price, UpdatedBy }).then(result => {
            res.status(200).send(R.Success({}, result));
        }).catch(err => {
            res.status(200).send(R.Fail({}, err));
        })
    }
}
productController.delete = (req, res) => {
    const Id = req.params.id;

    if (!Id) {
        res.status(200).send(R.Fail("Select product."));
    } else {
        const UpdatedBy = jwt.decodeToken(req.headers.authorization).id;
        repos.product.delete({ Id,UpdatedBy }).then(result => {
            res.status(200).send(R.Success({}, result));
        }).catch(err => {
            res.status(200).send(R.Fail({}, err));
        })
    }
}
productController.getItemSizes = (req, res) => {
    let id = req.params.id;
    repos.product.getItemSizes({ Id: id }).then(result => {
        res.status(200).send(R.Success(result));
    }).catch(err => {
        res.status(200).send(R.Fail({}, err));
    })
}
module.exports = productController;