const expressAsyncHandler = require("express-async-handler");
const userDb = require('../models/userModel');

const userCritical = {
    addMed: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.body.email }
        };
        let userExist = await userDb.findOne(queryUserDb);
        await userDb.findByIdAndUpdate(userExist._id, { $push: { criticalMedicines: request.body.criticalMedicines } }, { new: true })
            .then(() => response.json(`now monitoring ${request.body.criticalMedicines}`))
            .catch(err => response.json("Error : ", err));
    }),

    getMed: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.params.email }
        };
        let userExist = await userDb.findOne(queryUserDb);
        if (userExist && userExist.criticalMedicines.length > 0) {
            userExist.criticalMedicines.sort((a, b) => {
                let item1 = a.toLowerCase(), item2 = b.toLowerCase();
                if (item1 > item2) return 1;
                return -1;
            })
            response.json(userExist.criticalMedicines);
        }
        else response.json([]);
    }),

    removeMed: expressAsyncHandler(async (request, response) => {
        let queryUserDb = {
            "email": { $regex: request.params.email }
        };
        const x = await userDb.findOneAndUpdate(queryUserDb, { $pull: { "criticalMedicines": request.params.itemName } })
            .then(() => response.json(`${request.params.itemName} is now not neing monitered`))
            .catch(err => console.log("Error : ", err));
    }),

    checkIfCritical: expressAsyncHandler(async (request, response) => {

        let queryUserDb = {

            "email": { $regex: request.params.email }

        };

        const userExist = await userDb.findOne(queryUserDb);

        let flagFound = false;

        if (userExist && userExist.criticalMedicines.length > 0) {

            for (let i = 0; i < userExist.criticalMedicines.length; i++) {

                if (userExist.criticalMedicines[i] === request.params.itemName) {

                    flagFound = true;

                    response.json(1);

                }

            }

            if (!flagFound)

                response.json(0);

        }

        else response.json(0);

    })
}
module.exports = { userCritical };