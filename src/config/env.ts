import { z } from 'zod';

// Schema for all environment variables
const envSchema = z.object({
  MONGODB_URI: z.string().url({
    message: 'Invalid MongoDB connection string',
  }),
  MONGODB_DB_NAME: z.string().min(1, {
    message: 'Database name is required',
  }),
});

// Function to validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      console.error('\n❌ Invalid environment variables:');
      missingVars.forEach((variable) => {
        console.error(`  - ${variable.path}: ${variable.message}`);
      });
      console.error('\nPlease check your .env.local file.\n');
      process.exit(1);
    }
  }
}

// Export validated environment variables
export const env = validateEnv();

// Export type for environment variables
export type Env = z.infer<typeof envSchema>;

// MongoDB configuration object
export const mongoConfig = {
  uri: env?.MONGODB_URI,
  dbName: env?.MONGODB_DB_NAME,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
} as const;
