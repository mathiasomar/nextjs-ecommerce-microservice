import Container from "@/components/container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return (
      <div className="max-w-5xl mx-auto mt-6">
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertTitle>No session ID provided.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMETN_SERVICE_URL}/session/${session_id}`,
    {}
  );
  const data = await res.json();
  return (
    <Container>
      <Card className="mt-10 shadow-green-800 mb-3">
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/orders">See your orders</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <h1 className="text-lg font-medium">Payment: {data.status}</h1>
          <p className="text-green-800">Payment Status: {data.paymentStatus}</p>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReturnPage;
