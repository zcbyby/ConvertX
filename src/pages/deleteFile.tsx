import { unlink } from "node:fs/promises";
import { Elysia, t } from "elysia";
import { uploadsDir } from "..";
import db from "../db/db";
import { WEBROOT } from "../helpers/env";
import { userService } from "./user";
import sanitize from "sanitize-filename";
import path from "node:path";

export const deleteFile = new Elysia().use(userService).post(
  "/delete",
  async ({ body, redirect, cookie: { jobId } }) => {
    if (!jobId?.value) {
      return redirect(`${WEBROOT}/`, 302);
    }

    const existingJob = await db.query("SELECT * FROM jobs WHERE id = ?").get(jobId.value);

    if (!existingJob) {
      return redirect(`${WEBROOT}/`, 302);
    }

    const userUploadsDir = path.join(uploadsDir, jobId.value);

    const sanitized = sanitize(body.filename);
    const targetPath = path.join(userUploadsDir, sanitized);

    await unlink(targetPath);

    return {
      message: "File deleted successfully.",
    };
  },
  {
    body: t.Object({ filename: t.String() }),
    cookie: t.Cookie({
      jobId: t.Optional(t.String()),
    }),
  },
);
