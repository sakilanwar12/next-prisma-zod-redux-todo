import { NextResponse } from "next/server";
import { userSchema } from "./users.validator";
import { apiResponse } from "@/lib/api/api-response";
import { getFilters, getOrderOptions, getPagination, handleQueryParams } from "@/lib/api/query-utils";
import prisma from "@/lib/api/prisma"

// create user
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const parsedData = userSchema.safeParse(data);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => ({
        message: err.message,
      }));
      return NextResponse.json(
        apiResponse({
          success: false,
          statusCode: 400,
          message: "Validation Error",
          errors: errorMessages,
        })
      );
    }
    const user = await prisma.user.create({
      data: parsedData?.data,
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        statusCode: 200,
        message: "User created successfully",
        data: user
      })
    );
  } catch (error:Error | any) {
    return NextResponse.json(
      apiResponse({
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
        errors: [{ message: error?.message }],
      })
    );
  }
}

// get all data & single data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request?.url);

    const { id, search, orderBy, orderDirection, page, pageSize } =
      await handleQueryParams(searchParams);

    //  get single data

    if (id) {
      const data = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return NextResponse.json(
        apiResponse({
          success: true,
          statusCode: 200,
          message: "User fetched successfully",
          data,
        })
      );
    }

    // get all data

    const { field, direction } = getOrderOptions(orderBy, orderDirection, [
      "name",
      "email",
      "createdAt",
    ]);

    const data = await prisma.user.findMany({
      where: getFilters(search, ["name", "email"]),
      orderBy: { [field]: direction },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const { pagination } = await getPagination(
      prisma.user,
      search,
      ["name", "email"],
      page,
      pageSize
    );

    return NextResponse.json(
      apiResponse({
        success: true,
        statusCode: 200,
        message: "Users fetched successfully",
        data,
        pagination,
      })
    );
  } catch (error: any) {
    return NextResponse.json(
      apiResponse({
        success: false,
        statusCode: 500,
        message: "Error fetching users",
        errors: [
          {
            message: error.message || "An unknown error occurred",
          },
        ],
      })
    );
  }
}

// remove data

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request?.url);

    const { id } = await handleQueryParams(searchParams);
    if (!id) {
      return NextResponse.json(
        apiResponse({
          success: false,
          statusCode: 400,
          message: "User id is required",
          errors: [
            {
              message: "User id is required",
            },
          ],
        })
      );
    }

    const data = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        data,
      })
    );
  } catch (error: any) {
    return NextResponse.json(
      apiResponse({
        success: false,
        statusCode: 500,
        message: "Error deleting user",
        errors: [
          {
            message: error.message || "An unknown error occurred",
          },
        ],
      })
    );
  }
}