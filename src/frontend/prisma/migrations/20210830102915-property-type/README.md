# Migration `20210830102915-property-type`

This migration has been generated by luke-h1 at 8/30/2021, 11:29:15 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "listings" (
"id" SERIAL,
    "user_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "property_type" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "address" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
)

CREATE INDEX "listings.userId" ON "listings"("user_id")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210829145356-rename-house-to-listing..20210830102915-property-type
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -13,8 +13,9 @@
 model Listing {
   id Int @id @default(autoincrement())
   userId String @map(name: "user_id")
   image String 
+  propertyType String @map(name: "property_type")
   latitude Float 
   longitude Float 
   address String 
   bedrooms Int 
```

