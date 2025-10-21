const tagKeys = [
  "CONFIGURATION",
  "ADMINISTRATION",
  "SUBJECT",
  "INSTITUTE",
  "TEACHER",
  "STUDENT",
  "SESSION",
  "BRANCH",
  "BATCH",
  "BATCH-SEMESTER",
  "ATTENDANCE-SUMMARY",
  "SUBJECT-OFFER",
  "SEMESTER",
  "DEPARTMENT",
  "PROFILE",
  "NOTIFICATION",
  "PUBLIC",
  "ROLE",
  "DASHBOARD",
] as const;

export const TagTypes = Object.fromEntries(
  tagKeys.map((key) => [key, key])
) as { [K in (typeof tagKeys)[number]]: K };

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
