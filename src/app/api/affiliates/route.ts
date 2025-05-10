import { NextResponse } from 'next/server';
import { affiliateSchema } from '@/utils/validations';
import { ZodError } from 'zod';
import { Afiliado } from '@/models/Afiliado';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/utils/mongodb';

export async function POST(req: Request) {
  try {

    await connectToDatabase();

    const body = await req.json();

    // Validate input using Zod schema
    const validatedData = affiliateSchema.parse(body);

    // Check if email already exists using Mongoose
    const existingAffiliate = await Afiliado.findOne({
      email: validatedData.email,
    });

    if (existingAffiliate) {
      return NextResponse.json(
        { message: 'Este email já está cadastrado como afiliado' },
        { status: 400 }
      );
    }

    // Create new affiliate using Mongoose
    const affiliate = await Afiliado.create({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
    });

    // Generate affiliate link using the MongoDB _id
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const affiliateLink = `${baseUrl}?ref=${affiliate._id}`;

    return NextResponse.json({ affiliateLink });
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
