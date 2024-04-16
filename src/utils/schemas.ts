import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})
export const AddressSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    address: z.string(),
    city: z.string(),
    county: z.string(),
    postcode: z.string().regex(/^\d{5}$/) // Assuming postcode is 5 digits
});

export const AddCategorySchema = z.object({
    product_name: z.string()
                    .min(2, { message: 'Product name must be at least 2 characters long' })
                    .refine(value => {
                        // Custom validation logic for product_name
                        if (value.includes('a')) {
                            return false; // Return false to indicate validation failure
                        }
                        return true; // Return true if validation passes
                    }, { message: 'Invalid product name' }),
    description: z.string()
                    .refine(value => {
                        // Custom validation logic for description
                        if (value.length < 10) {
                            return { message: 'Description must be at least 10 characters long' };
                        }
                        return true; // Return true if validation passes
                    }),
    image: z.string()
                    .nonempty({ message: 'Image is required' }) // Ensure it's a non-empty string
});

export const ResetSchema = z.object({
    email: z.string().email(),
    dob: z.string()
})
export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
})