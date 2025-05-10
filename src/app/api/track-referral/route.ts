import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/mongodb';
import { Afiliado } from '@/models/Afiliado';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Get referralCode from URL search params
    const url = new URL(req.url);
    const referralCode = url.searchParams.get('code');

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

    // For now, just logging the visit
    console.log(`Referral visit tracked for code: ${referralCode}`);

    return NextResponse.json({
      success: true,
      affiliate: {
        name: affiliate.name,
        email: affiliate.email,
        linkId: affiliate.linkId,
      },
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
