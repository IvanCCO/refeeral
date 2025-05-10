import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Lead document
export interface ILead extends Document {
  name: string;
  phone: string;
  referral_id: string;
  referral_name: string;
  knowledge?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Telefone é obrigatório'],
      trim: true,
    },
    referral_id: {
      type: String,
      required: [true, 'ID de referência é obrigatório'],
      trim: true,
    },
    referral_name: {
      type: String,
      required: [true, 'Nome de quem referenciou é obrigatório'],
      trim: true,
    },
    knowledge: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add indexes
LeadSchema.index({ phone: 1 }, { unique: true });

// Create and export the model
export const Lead =
  (mongoose.models.Lead as Model<ILead>) ||
  mongoose.model<ILead>('Lead', LeadSchema);
