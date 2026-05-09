-- CreateTable
CREATE TABLE "InvestirDemande" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "ville" TEXT,
    "profil" TEXT,
    "budget" TEXT,
    "objectif" TEXT,
    "delai" TEXT,
    "message" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestirDemande_pkey" PRIMARY KEY ("id")
);
