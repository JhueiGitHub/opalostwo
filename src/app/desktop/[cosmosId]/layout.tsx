import { verifyAccessToCosmos } from "@/actions/cosmos";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { cosmosId: string };
  children: React.ReactNode;
};

const CosmosLayout = async ({ params: { cosmosId }, children }: Props) => {
  const auth = await onAuthenticateUser();

  if (!auth.user?.cosmos) redirect("/auth/sign-in");
  if (!auth.user.cosmos.length) redirect("/auth/sign-in");
  const hasAccess = await verifyAccessToCosmos(cosmosId);

  if (hasAccess.status !== 200) {
    redirect("/cosmos/${auth.user?.cosmos[0].id");
  }

  if (!hasAccess.data?.cosmos) return null;

  return <div>CosmosLayout</div>;
};

export default CosmosLayout;
