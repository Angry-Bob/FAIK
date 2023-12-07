import { body, validationResult } from "express-validator";
// Middleware function to handle validation using Express Validator
export const validate = (validations) => {
    return async (req, res, next) => {
        // Iterate through each validation in the array and run it
        for (let validation of validations) {
            const result = await validation.run(req);
            // If a validation fails, break out of the loop
            if (!result.isEmpty()) {
                break;
            }
        }
        // Get validation errors
        const errors = validationResult(req);
        // If there are no validation errors, call the next middleware
        if (errors.isEmpty()) {
            return next();
        }
        // If there are validation errors, return a 422 Unprocessable Entity response with the errors
        return res.status(422).json({ errors: errors.array() });
    };
};
// Validation rules for the login endpoint
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is not optional"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password not secure. 6 characters required."),
];
// Validation rules for the signup endpoint, including the loginValidator rules
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is not optional"),
    ...loginValidator,
];
// Validation rules for the chat completion endpoint
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is not optional"),
];
//# sourceMappingURL=validators.js.map