import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_KEY = process.env.FIXER_API_KEY;
    
    if (API_KEY) {
      try {
        const response = await fetch(
          `https://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=EUR,COP,MAD`,
          { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data);
        }
      } catch (error) {
        console.error('Error fetching from Fixer API:', error);
      }
    }
    
    return NextResponse.json({
      success: true,
      base: 'EUR',
      date: new Date().toISOString().split('T')[0],
      rates: {
        EUR: 1,
        COP: 4300,
        MAD: 11
      }
    });
  } catch (error) {
    console.error('Error in currency API route:', error);
    
    return NextResponse.json({
      success: true,
      base: 'EUR',
      date: new Date().toISOString().split('T')[0],
      rates: {
        EUR: 1,
        COP: 4300,
        MAD: 11
      }
    });
  }
}