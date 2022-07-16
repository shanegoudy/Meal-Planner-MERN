const PlanController = require('../controllers/plan.controller');
const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post('/api/plans', PlanController.createNewPlan);
    app.get('/api/plans/:id', PlanController.findOne);
    app.put('/api/plans/:id', authenticate, PlanController.updatePlan);
    app.delete('/api/plans/:id', authenticate, PlanController.deletePlan);
}