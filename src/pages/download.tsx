import path from "node:path";
import { Elysia } from "elysia";
import sanitize from "sanitize-filename";
import * as tar from "tar";
import { outputDir } from "..";
import db from "../db/db";
import { WEBROOT } from "../helpers/env";
import { userService } from "./user";

export const download = new Elysia()
  .use(userService)
  .get("/download/:jobId/:fileName", async ({ params, redirect }) => {
    const job = await db.query("SELECT * FROM jobs WHERE id = ?").get(params.jobId);

    if (!job) {
      return redirect(`${WEBROOT}/results`, 302);
    }
    // parse from URL encoded string
    const jobId = decodeURIComponent(params.jobId);
    const fileName = sanitize(decodeURIComponent(params.fileName));

    const filePath = `${outputDir}${jobId}/${fileName}`;
    return Bun.file(filePath);
  })
  .get("/archive/:jobId", async ({ params, redirect }) => {
    const job = await db.query("SELECT * FROM jobs WHERE id = ?").get(params.jobId);

    if (!job) {
      return redirect(`${WEBROOT}/results`, 302);
    }

    const jobId = decodeURIComponent(params.jobId);
    const outputPath = `${outputDir}${jobId}`;
    const outputTar = path.join(outputPath, `converted_files_${jobId}.tar`);

    await tar.create(
      {
        file: outputTar,
        cwd: outputPath,
        filter: (path) => {
          return !path.match(".*\\.tar");
        },
      },
      ["."],
    );
    return Bun.file(outputTar);
  });
