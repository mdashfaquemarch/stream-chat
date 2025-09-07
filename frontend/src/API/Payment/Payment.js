import { API_BASE_URL } from "../config";

export async function sendSuperChat({ slug, chatRoomId, username, message, amount }) {
 
  try {
    const orderResponse = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    let order = await orderResponse.json();
    order = order.data;
    console.log("order :", order);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // make sure env var is prefixed with VITE_
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      handler: async function (response) {
        try {
          const verifyResponse  = await fetch(`${API_BASE_URL}/payments/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              slug,
              chatRoomId,
              username,
              message,
              amount,
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });
           const result = await verifyResponse.json();
           console.log("result: ", result);
          if (result.success) {
            console.log("✅ Payment verified:", result.message);
            // optional: show toast or UI update
          } else {
            console.error("❌ Payment verification failed:", result.message);
          }

        } catch (err) {
          console.error("Verification failed", err);
        }
      },
      prefill: {
        name: username,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Payment initiation failed", error);
  }
}
