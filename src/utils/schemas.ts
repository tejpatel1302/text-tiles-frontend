import * as z from 'zod';
export const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});
export const RegisterSchema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    phone: z.string().min(10).max(15),
    dob: z.string().refine(date => !!Date.parse(date)),
    email: z.string().email(),
    gender: z.enum(["Male", "Female", "Others"]),
    password: z.string().min(8),
    confirm_password: z.string()
      .min(8)
      .refine(({ confirm_password, password }:any) => confirm_password === password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
      }),
});

export const AddressSchema = z.object({
    billToName: z.string(),
    address1: z.string(),
    address2: z.string(),
    city: z.string(),
    county: z.string(),
    eir: z.string().regex(/^\d{5}$/) // Assuming postcode is 5 digits
});

export const AddCategorySchema = z.object({
    name: z.string()
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
    file: z.any()
                    .refine(value => {
                        // Custom validation logic for file
                        if (!value) {
                            return { message: 'Image is required' };
                        }
                        return true; // Return true if validation passes
                    }),
});



export const AddManageCategorySchema = z.object({
    categoryId: z.string(),
    name: z.string()
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
    file: z.any()
                    .refine(value => {
                        // Custom validation logic for file
                        if (!value) {
                            return { message: 'Image is required' };
                        }
                        return true; // Return true if validation passes
                    }),
});


export const AddProduct = z.object({
    name: z.string()
        .min(2, { message: 'Product name must be at least 2 characters long' }),
    description: z.string()
        .min(10, { message: 'Description must be at least 10 characters long' }),
    material: z.string(),
    price: z.string(),
    size: z.string(),
    colorId: z.string(),
    file: z.any()
                    .refine(value => {
                        // Custom validation logic for file
                        if (!value) {
                            return { message: 'Image is required' };
                        }
                        return true; // Return true if validation passes
                    }),
    categoryId: z.string(),
    subcategoryId: z.string(),
});
export const AddToCartSchema = z.object({
    productId: z.string(),
    itemSize: z.string(),
    colorRelationId: z.string(),
    quantity: z.any()
});
export const ResetSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string()
      .min(8)
      .refine(({ confirm_password, password }:any) => confirm_password === password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
      }),
});
