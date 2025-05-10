import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Afiliado document
export interface IAfiliado extends Document {
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition with validation
const AfiliadoSchema = new Schema<IAfiliado>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(value: string) {
        // Basic email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Please enter a valid email address'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(value: string) {
        // Basic phone validation - allows different formats
        return /^[+]?[\d\s-()]{8,}$/.test(value);
      },
      message: 'Please enter a valid phone number'
    }
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  versionKey: false // Don't include the __v field
});

// Add indexes for frequently queried fields
AfiliadoSchema.index({ email: 1 }, { unique: true });
AfiliadoSchema.index({ name: 1 });

// Create and export the model
export const Afiliado = mongoose.model<IAfiliado>('Afiliado', AfiliadoSchema); 