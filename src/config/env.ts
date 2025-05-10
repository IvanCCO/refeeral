import { z } from 'zod';

// // Schema for all environment variables
// const envSchema = z.object({
//   MONGODB_URI: z.string().url({
//     message: 'Invalid MongoDB connection string',
//   }),
//   MONGODB_DB_NAME: z.string().min(1, {
//     message: 'Database name is required',
//   }),
// });

// // Function to validate environment variables
// function validateEnv() {
//   try {
//     return envSchema.parse(process.env);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       const missingVars = error.errors.map((err) => ({
//         path: err.path.join('.'),
//         message: err.message,
//       }));

//       console.error('\n❌ Invalid environment variables:');
//       missingVars.forEach((variable) => {
//         console.error(`  - ${variable.path}: ${variable.message}`);
//       });
//       process.exit(1);
//     }
//   }
// }

// // Export validated environment variables
// export const env = validateEnv();

// // Export type for environment variables
// export type Env = z.infer<typeof envSchema>;

// MongoDB configuration object
export const mongoConfig = {
  uri: process.env.MONGODB_URI,
  dbName: process.env?.MONGODB_DB_NAME,
  options: {
    // Modern MongoDB driver (4.0+) doesn't need these options anymore
  },
} as const;
