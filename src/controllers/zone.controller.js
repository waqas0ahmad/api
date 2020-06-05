const R = require("../helper/response.helper");
const repos = require("../repositories/index");
const logger = require("../helper/logger.helper");
const jwt = require("../helper/jwt.helper");
const zoneController = {};

zoneController.getAll = (req, res) => {
    repos.zone.getAll().then(result => {
        res.status(200).send(R.Success(result));
    }).catch(err => {
        logger.log(err);
        res.status(200).send(R.Fail(err));
    });
};
zoneController.get = (req, res) => {
    const Id  = req.params.id;
    if (!(Id)) {
        res.status(200).send(R.Invalid("Provide all required fields."));

    } else {
        let CreatedBy = jwt.decodeToken(req.headers.authorization).id;
        repos.zone.get({Id, CreatedBy }).then(result => {
            res.status(200).send(R.Success(result));
        }).catch(err => {
            logger.log(err);
            res.status(200).send(R.Fail(err));

        })
    }
};
zoneController.add = (req, res) => {
    const { ZoneName, ZoneCode, ZoneAddress, ZonePickupPrice, ZoneDeliveryPrice, ZoneDeliveryFood } = req.body;
    if (!(ZoneName || ZoneCode || ZoneAddress || ZonePickupPrice || ZoneDeliveryPrice || ZoneDeliveryFood)) {
        res.status(200).send(R.Invalid("Provide all required fields."));

    } else {
        let CreatedBy = jwt.decodeToken(req.headers.authorization).id;
        repos.zone.add({ ZoneName, ZoneCode, ZoneAddress, ZonePickupPrice, ZoneDeliveryPrice, ZoneDeliveryFood, CreatedBy }).then(result => {
            res.status(200).send(R.Success(result));
        }).catch(err => {
            logger.log(err);
            res.status(200).send(R.Fail(err));

        })
    }
};
zoneController.update = (req, res) => {
    const { Id, ZoneName, ZoneCode, ZoneAddress, ZonePickupPrice, ZoneDeliveryPrice, ZoneDeliveryFood } = req.body;
    if (!(Id, ZoneName || ZoneCode || ZoneAddress || ZonePickupPrice || ZoneDeliveryPrice || ZoneDeliveryFood)) {
        res.status(200).send(R.Invalid("Provide all required fields."));

    } else {
        let CreatedBy = jwt.decodeToken(req.headers.authorization).id;
        repos.zone.update({Id,ZoneName, ZoneCode, ZoneAddress, ZonePickupPrice, ZoneDeliveryPrice, ZoneDeliveryFood, CreatedBy }).then(result => {
            res.status(200).send(R.Success(result));
        }).catch(err => {
            logger.log(err);
            res.status(200).send(R.Fail(err));

        })
    }
};
zoneController.delete = (req, res) => {
    const { Id } = req.body;
    if (!(Id)) {
        res.status(200).send(R.Invalid("Provide all required fields."));

    } else {
        let CreatedBy = jwt.decodeToken(req.headers.authorization).id;
        repos.zone.delete({Id, CreatedBy }).then(result => {
            res.status(200).send(R.Success(result));
        }).catch(err => {
            logger.log(err);
            res.status(200).send(R.Fail(err));

        })
    }
};
module.exports = zoneController;