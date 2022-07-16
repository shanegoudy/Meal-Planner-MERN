const Plan = require('../models/Plan.model');

module.exports = {
    findOne: (req, res) => {
        Plan.findOne({ user: req.params.id })
        .then(plan => {
            res.json({ plan: plan })
        })
        .catch((err) => {
            res.json({ message: 'Error finding one plan', error: err })
        });
    },
    
    createNewPlan: (req, res) => {
        const newPlanObject = new Plan(req.body);
        
        newPlanObject.save()
            .then(newlyCreatedPlan => {
                res.json({ plan: newlyCreatedPlan })
            })
            .catch((err) => {
                res.json({ message: 'Something went wrong', error: err })
            });
    },

    updatePlan: (req, res) => {

        Plan.findOneAndUpdate(
            { user: req.params.id },
            req.body,
            { new: true, runValidators: true}
        )
            .then(updatedPlan => {
                res.json({ plan: updatedPlan })
            })
            .catch((err) => {
                res.json({ message: 'Something went wrong', error: err })
            });
    },

    deletePlan: (req,res) => {

        Plan.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result})
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
    }
}