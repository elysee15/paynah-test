import { loginSchema } from "@/libs/models/auth";
import { delay } from "@/libs/utils";
import { createId } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

const credentials = {
  identifier: "admin@paynah.com",
  accessKey: "paynah123",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { identifier, accessKey } = validationResult.data;

    await delay(1000);

    if (
      identifier === credentials.identifier &&
      accessKey === credentials.accessKey
    ) {
      return NextResponse.json(
        {
          success: true,
          user: {
            id: createId(),
            email: identifier,
            name: "Admin",
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Identifiant ou clé d'accès incorrect, réessayez !",
        },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}
