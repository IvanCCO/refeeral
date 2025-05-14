import { NextResponse } from 'next/server';
import { affiliateSchema } from '@/utils/validations';
import { ZodError } from 'zod';
import { Afiliado } from '@/models/Afiliado';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/utils/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { getBaseUrl } from '@/utils/commons';

const affiliateLink = (linkId: string) =>
  `${getBaseUrl()}/referral?ref=${linkId}`;

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    // Validate input using Zod schema
    const validatedData = affiliateSchema.parse(body);

    // Check if phone already exists using Mongoose
    const existingAffiliate = await Afiliado.findOne({
      phone: validatedData.phone,
    });

    if (existingAffiliate) {
      return NextResponse.json({
        affiliateLink: affiliateLink(existingAffiliate.linkId),
      });
    }

    // Generate a UUID for the affiliate link
    const linkId = uuidv4();

    // Create new affiliate using Mongoose
    await Afiliado.create({
      name: validatedData.name,
      phone: validatedData.phone,
      from: validatedData.from,
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
