import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/mongodb';
import { Afiliado } from '@/models/Afiliado';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { referralCode } = await req.json();

    if (!referralCode) {
      return NextResponse.json(
        { message: 'Código de referência não fornecido' },
        { status: 400 }
      );
    }

    // Find the affiliate by linkId
    const affiliate = await Afiliado.findOne({ linkId: referralCode });

    if (!affiliate) {
      return NextResponse.json(
        { message: 'Código de referência inválido' },
        { status: 404 }
      );
    }

    // Here you could implement tracking logic:
    // - Record the visit in a separate collection
    // - Update visit count for the affiliate
    // - Store information about the visitor if needed

    /*
    Example:
    await ReferralVisit.create({
      affiliateId: affiliate._id,
      visitedAt: new Date(),
      ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
    });
    */

    // For now, just logging the visit
    console.log(`Referral visit tracked for code: ${referralCode}`);

    return NextResponse.json({ 
      success: true,
      message: 'Visita registrada com sucesso'
    });
    
  } catch (error) {
    console.error('Error tracking referral visit:', error);
    
    if (error instanceof mongoose.Error) {
      return NextResponse.json(
        { message: 'Erro de banco de dados ao registrar visita' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Erro ao processar sua solicitação' },
      { status: 500 }
    );
  }
} 