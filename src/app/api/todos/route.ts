/*
 * Todo Crud
 * Create a Todo
 * Read a Todo
 * Update a Todo
 * Delete a Todo
 */

import { apiResponse } from "@/lib/api/api-response";
import { NextResponse } from "next/server";
import { todosSchema, updateTodoSchema } from "./todos.validator";
import prisma from "@/lib/api/prisma";
import {
  getFilters,
  getOrderOptions,
  getPagination,
  handleQueryParams,
} from "@/lib/api/query-utils";

// create todo
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const parsedData = todosSchema.safeParse(data);
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

    const { user, ...rest } = parsedData.data;

    const todo = await prisma.todo.create({
      data: {
        ...rest,
        user: {
          connect: { id: user },
        },
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        statusCode: 200,
        message: "Todo created successfully",
        data: todo,
      })
    );
  } catch (error: Error | any) {
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

// update todo

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        apiResponse({
          success: false,
          statusCode: 400,
          message: "Todo ID is required",
        })
      );
    }

    const json = await request.json();
    const parsedData = updateTodoSchema.safeParse(json);

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

  
    const prismaData: any = { ...parsedData.data };

    if (typeof prismaData.user === "number") {
      prismaData.user = {
        connect: { id: prismaData.user },
      };
    }

    const updated = await prisma.todo.update({
      where: { id: Number(id) },
      data: prismaData,
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        statusCode: 200,
        message: "Todo updated successfully",
        data: updated,
      })
    );
  } catch (error: Error | any) {
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
      const data = await prisma.todo.findUnique({
        where: {
          id,
        },
      });
      return NextResponse.json(
        apiResponse({
          success: true,
          statusCode: 200,
          message: "Todo fetched successfully",
          data,
        })
      );
    }

    // get all data

    const { field, direction } = getOrderOptions(orderBy, orderDirection, [
      "title",
      "createdAt",
    ]);

    const data = await prisma.todo.findMany({
      where: getFilters(search, ["title"]),
      orderBy: { [field]: direction },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const { pagination } = await getPagination(
      prisma.todo,
      search,
      ["title"],
      page,
      pageSize
    );

    return NextResponse.json(
      apiResponse({
        success: true,
        statusCode: 200,
        message: "Todo fetched successfully",
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
          message: "Todo id is required",
          errors: [
            {
              message: "Todo id is required",
            },
          ],
        })
      );
    }

    const data = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      apiResponse({
        success: true,
        statusCode: 200,
        message: "Todo deleted successfully",
        data:null,
      })
    );
  } catch (error: any) {
    return NextResponse.json(
      apiResponse({
        success: false,
        statusCode: 500,
        message: "Error deleting todo",
        errors: [
          {
            message: error.message || "An unknown error occurred",
          },
        ],
      })
    );
  }
}
