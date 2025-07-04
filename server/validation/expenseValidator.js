const { z } = require('zod');

const expenseSchema = z.object({
  groceries: z.number().optional(),
  restaurants: z.number().optional(),
  utilities: z.number().optional(),
  subscriptions: z.number().optional(),
  insurance: z.number().optional(),
  vehicleCosts: z.number().optional(),
  housingPayment: z.number().optional(),
  luxuries: z.number().optional(),
  loan: z.number().optional(),
  carPayment: z.number().optional(),
  creditCardDebt: z.number().optional(),
  customExpenses: z.array(
    z.object({
      name: z.string(),
      amount: z.number()
    })
  ).optional()
});

module.exports = expenseSchema;