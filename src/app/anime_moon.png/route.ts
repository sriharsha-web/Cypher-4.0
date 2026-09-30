import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  const imagePath = "C:\\Users\\rohan\\.gemini\\antigravity-ide\\brain\\99e5645e-0141-43da-90cd-486a7a3e313a\\anime_moon_1790741561361.png";
  
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    return new NextResponse("Image not found", { status: 404 });
  }
}
