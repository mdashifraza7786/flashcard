// import { dbConnect } from "@/util/database";
import {dbConnect} from "@/util/testdb";
import { NextResponse } from "next/server";

export async function GET(){
    const connection = await dbConnect();
    return NextResponse.json(connection);
}