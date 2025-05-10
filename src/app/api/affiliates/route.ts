import { NextResponse } from 'next/server';
import { affiliateSchema } from '@/utils/validations';
import { ZodError } from 'zod';
import { Afiliado } from '@/models/Afiliado';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/utils/mongodb';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const affiliateLink = (linkId: string) => `${baseUrl}/referral?ref=${linkId}`;

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    // Validate input using Zod schema
    const validatedData = affiliateSchema.parse(body);

    // Check if email or phone already exists using Mongoose
    const existingAffiliate = await Afiliado.findOne({
      $or: [{ email: validatedData.email }, { phone: validatedData.phone }],
    });

    if (existingAffiliate) {
      const field =
        existingAffiliate.email === validatedData.email ? 'email' : 'phone';
      const message =
        field === 'email'
          ? 'Este email já está cadastrado como afiliado'
          : 'Este telefone já está cadastrado como afiliado';

      return NextResponse.json({ message, field }, { status: 400 });
    }

    // Generate a UUID for the affiliate link
    const linkId = uuidv4();

    // Create new affiliate using Mongoose
    await Afiliado.create({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      linkId: linkId,
    });

    return NextResponse.json({ affiliateLink: affiliateLink(linkId) });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Handle Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    console.error('Error creating affiliate:', error);
    return NextResponse.json(
      { message: 'Erro ao processar sua solicitação' },
      { status: 500 }
    );
  }
}
