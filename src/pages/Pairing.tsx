import "@fontsource/dancing-script/700.css";
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { decryptText } from '../utils/crypto';
import { PostCard } from '../components/PostCard';
import { Trans, useTranslation } from 'react-i18next';
import { MenuItem } from '../components/SideMenu';
import { PageTransition } from '../components/PageTransition';
import { ArrowLeft, Info } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Layout } from "../components/Layout";
import { ReceiverData } from "../types";

async function loadPairing(searchParams: URLSearchParams): Promise<[string, ReceiverData]> {
  if (searchParams.has(`to`)) {
    const from = searchParams.get('from')!;
    const to = searchParams.get('to')!;
    const decrypted = await decryptText(to);

    try {
      const data = JSON.parse(decrypted) as ReceiverData;
      return [from, data];
    } catch {
      return [from, { name: decrypted, hint: undefined } as ReceiverData];
    }
  }

  throw new Error(`Missing key or to parameter in search params`);
}

export function Pairing() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assignment, setAssignment] = useState<[string, ReceiverData] | null>(null);
  const [instructions, setInstructions] = useState<string | null>(null);

  useEffect(() => {
    const decryptReceiver = async () => {
      try {
        setAssignment(await loadPairing(searchParams));
        setInstructions(searchParams.get('info'));
      } catch (err) {
        console.error('Decryption error:', err);
        setError(t('pairing.error'));
      } finally {
        setLoading(false);
      }
    };

    decryptReceiver();
  }, [searchParams, t]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-700 flex items-center justify-center">
        <div className="text-xl text-white">{error}</div>
      </div>
    );
  }

  const menuItems = [
    <MenuItem key={`back`} to="/" icon={<ArrowLeft weight={`bold`}/>}>
      {t('pairing.startYourOwn')}
    </MenuItem>
  ];

  return (
    <Layout menuItems={menuItems}>
      <PageTransition>
        <div>
          {!loading && assignment && (
            <motion.div
              initial={{ rotateZ: -360, scale: 0 }}
              animate={{ rotateZ: 0, scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: `easeIn`, duration: .6 }}
            >
              <PostCard>
                <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
                  {t('pairing.title')}
                </h1>
                <p className="mb-6 text-center text-gray-600">
                  <Trans
                    i18nKey="pairing.assignment"
                    components={{ name: <span className="font-semibold">{assignment[0]}</span> }}
                  />
                </p>

                <div className="text-8xl font-bold text-center p-6 font-dancing-script">
                  {assignment[1].name}
                </div>

                <div className="mt-4 space-y-2 text-gray-700 text-center">
                  {assignment[1].hint && (
                    <p>🎁 {t('rules.hintLabel')}: {assignment[1].hint}</p>
                  )}
                  {assignment[1].address && (
                    <p>📍 {t('pairing.address')}: {assignment[1].address}</p>
                  )}
                  {assignment[1].phone && (
                    <p>📞 {t('pairing.phone')}: {assignment[1].phone}</p>
                  )}
                  {assignment[1].notes && (
                    <p>📝 {t('pairing.notes')}: {assignment[1].notes}</p>
                  )}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-800 text-sm">
                  {t('pairing.rulesReminder', { instructions: instructions || '' })}
                </div>
              </PostCard>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </Layout>
  );
}
