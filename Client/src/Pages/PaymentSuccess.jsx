import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const eventId = params.get("eventId");
    // Next step: create booking API call here
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
    </div>
  );
};

export default PaymentSuccess;
