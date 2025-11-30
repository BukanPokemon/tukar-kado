// pairing.tsx
import "@fontsource/dancing-script/700.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { decryptText } from "../utils/crypto";
import { PostCard } from "../components/PostCard";
import { MenuItem } from "../components/SideMenu";
import { motion } from "framer-motion";
import { ArrowLeft, Info } from "@phosphor-icons/react";
import { Layout } from "../components/Layout";
import { ReceiverData } from "../types";

async function loadPairing(searchParams: URLSearchParams): Promise<[string, ReceiverData]> {
  if (!searchParams.has("to")) {
    throw new Error("Missing 'to' parameter in Secret Santa link.");
  }

  const from = searchParams.get("from") || "Participant";
  const to = searchParams.get("to")!;
  const decrypted = await decryptText(to);

  // Parse JSON directly (always encrypted as JSON)
  const data = JSON.parse(decrypted) as ReceiverData;
  return [from, data];
}

export function Pairing() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assignment, setAssignment] = useState<[string, ReceiverData] | null>(null);
  const [instructions, setInstructions] = useState<string | null>(null);

  useEffect(() => {
    const decryptReceiver = async () => {
      try {
        const result = await loadPairing(searchParams);
        setAssignment(result);
        setInstructions(searchParams.get("info"));
      } catch (err) {
        console.error(err);
        setError("Invalid or corrupted Secret Santa link.");
      } finally {
        setLoading(false);
      }
    };
    decryptReceiver();
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-700 flex items-center justify-center">
        <div className="text-xl text-white">{error}</div>
      </div>
    );
  }

  const menuItems = [
    <MenuItem key="back" to="/" icon={<ArrowLeft weight="bold" />}>
      Start Your Own
    </MenuItem>,
  ];

  return (
    <Layout menuItems={menuItems}>
      {!loading && assignment && (
        <motion.div
          initial={{ rotateZ: -360, scale: 0 }}
          animate={{ rotateZ: 0, scale: 1, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.6 }}
        >
          <PostCard>
            <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
              🎄 Your Secret Santa Assignment
            </h1>

            <p className="mb-6 text-center text-gray-600">
              Welcome, <span className="font-semibold">{assignment[0]}</span>! You have been picked to get a gift for:
            </p>

            <div className="text-7xl font-bold text-center p-6 font-dancing-script text-red-600">
              {assignment[1].name}
            </div>

            <div className="mt-6 flex p-4 bg-gray-50 rounded-lg leading-6 text-gray-600">
              <div className="mr-4 mt-1">
                <Info size={22} />
              </div>
              <div className="space-y-2">
                {assignment[1].hint && <p>🎁 Gift Hint: {assignment[1].hint}</p>}
                {assignment[1].address && <p>📍 Address: {assignment[1].address}</p>}
                {assignment[1].phone && <p>📞 Phone: {assignment[1].phone}</p>}
                {assignment[1].notes && <p>📝 Notes: {assignment[1].notes}</p>}
                {instructions && <p>{instructions}</p>}
              </div>
            </div>
          </PostCard>
        </motion.div>
      )}
    </Layout>
  );
}
