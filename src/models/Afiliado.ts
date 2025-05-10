import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Afiliado document
export interface IAfiliado extends Document {
  name: string;
  email: string;
  phone: string;
  linkId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const AfiliadoSchema = new Schema<IAfiliado>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  linkId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true, 
  versionKey: false 
});

// Add indexes
AfiliadoSchema.index({ email: 1 }, { unique: true });
AfiliadoSchema.index({ phone: 1 }, { unique: true });
AfiliadoSchema.index({ linkId: 1 }, { unique: true });

// Create and export the model
export const Afiliado = (mongoose.models.Afiliado as Model<IAfiliado>) || mongoose.model<IAfiliado>('Afiliado', AfiliadoSchema); 