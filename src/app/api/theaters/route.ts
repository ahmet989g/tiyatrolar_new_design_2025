import { NextRequest, NextResponse } from 'next/server';
import { theaterService } from '@/services/theaterService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    
    // Filter parametreleri
    const location = searchParams.get('location');
    const category = searchParams.get('category');
    const date = searchParams.get('date');
    
    // Mock data servisinden veri al
    const theaters = await theaterService.getTheatersPaginated(
      page, 
      limit, 
      { location, category, date }
    );
    
    return NextResponse.json({ theaters });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Tiyatro oyunları yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}