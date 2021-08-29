# Migration `20210829145356-rename-house-to-listing`

This migration has been generated by luke-h1 at 8/29/2021, 3:53:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210822152929-createhouses..20210829145356-rename-house-to-listing
--- datamodel.dml
+++ datamodel.dml
@@ -2,16 +2,16 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
-model House {
+model Listing {
   id Int @id @default(autoincrement())
   userId String @map(name: "user_id")
   image String 
   latitude Float 
@@ -20,8 +20,8 @@
   bedrooms Int 
   createdAt DateTime @default(now()) @map(name: "created_at")
   updatedAt DateTime @default(now()) @map(name: "updated_at")
-  @@index([userId], name: "houses.userId")
+  @@index([userId], name: "listings.userId")
-  @@map("houses")
+  @@map("listings")
 }
```

