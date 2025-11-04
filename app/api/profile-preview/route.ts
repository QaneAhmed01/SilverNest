import { NextResponse } from 'next/server';

interface PreviewRequestBody {
  platform: string;
  bio: string;
  promptAnswers?: string[];
  firstMessages?: string[];
  originalProfile?: string;
  photoDataUrl?: string;
}

function extractInlineImage(dataUrl?: string) {
  if (!dataUrl) return null;
  const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (!match) return null;
  const [, mimeType, data] = match;
  return { mimeType, data };
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Google API key is not configured.' }, { status: 500 });
  }

  try {
    const body = (await request.json()) as PreviewRequestBody;
    if (!body.platform || !body.bio) {
      return NextResponse.json({ error: 'Platform and bio are required.' }, { status: 400 });
    }

    const inlineImage = extractInlineImage(body.photoDataUrl);

    const narrativeSections = [
      body.originalProfile ? `Original notes: ${body.originalProfile}` : undefined,
      body.promptAnswers?.length
        ? `Prompt answers:\n${body.promptAnswers.map((answer, index) => `• Prompt ${index + 1}: ${answer}`).join('\n')}`
        : undefined,
      body.firstMessages?.length
        ? `Opening messages:\n${body.firstMessages.map((message, index) => `• Message ${index + 1}: ${message}`).join('\n')}`
        : undefined,
    ]
      .filter(Boolean)
      .join('\n\n');

    const prompt = `Create a photorealistic mockup of a ${body.platform} dating profile designed for mature adults.
Use a warm, sophisticated palette similar to SilverNest branding.
If a primary photo is supplied, feature it prominently in the layout.
Include the following written content directly in the mockup so the user can preview their profile copy:
Bio: ${body.bio}
${narrativeSections}
Show interface elements and typography consistent with ${body.platform}.`;

    const requestBody: Record<string, unknown> = {
      prompt: {
        text: prompt,
      },
    };

    if (inlineImage) {
      requestBody.image = {
        inline_data: {
          mime_type: inlineImage.mimeType,
          data: inlineImage.data,
        },
      };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagegeneration:generate?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[profile-preview]', error);
      return NextResponse.json({ error: 'Image generation failed.' }, { status: response.status });
    }

    const data = await response.json();
    const imageBase64 =
      data?.candidates?.[0]?.image?.base64 ||
      data?.candidates?.[0]?.content?.parts?.find((part: { inline_data?: { data?: string } }) => part.inline_data?.data)?.inline_data?.data ||
      data?.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image returned from Google.' }, { status: 502 });
    }

    return NextResponse.json({ imageBase64 });
  } catch (error) {
    console.error('[profile-preview]', error);
    return NextResponse.json({ error: 'Unable to generate profile preview.' }, { status: 500 });
  }
}
