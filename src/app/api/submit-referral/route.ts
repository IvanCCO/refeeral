import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/mongodb';
import { Lead } from '@/models/Lead';
import { referralFormSchema } from '@/utils/validations';
import { MongoError } from 'mongodb';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();

    // Validate the request data
    const validationResult = referralFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dados inválidos',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;

    console.log(data);
    
    // Create a new lead
    const lead = await Lead.create({
      name: data.userName,
      phone: data.phone,
      referral_id: data.referralCode || 'direct', // If no referral code, mark as direct
      referral_name: data.referrerName,
      knowledge: data.knowledge || '',
    });
    
    return NextResponse.json({
      success: true,
      message: 'Lead cadastrado com sucesso',
      lead: {
        id: lead._id,
        name: lead.name,
        phone: lead.phone,
        referral_id: lead.referral_id,
        referral_name: lead.referral_name
      }
    });
  } catch (error) {
    console.error('Error submitting referral form:', error);
    
    // Check if it's a duplicate key error
    if (error instanceof MongoError && error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Este telefone já está cadastrado'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao processar o formulário'
      },
      { status: 500 }
    );
  }
} 