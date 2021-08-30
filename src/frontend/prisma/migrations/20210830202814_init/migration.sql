-- CreateTable
CREATE TABLE "listings" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "property_type" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "listings.userId" ON "listings"("user_id");
