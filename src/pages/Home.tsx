import { useState } from 'react';
import { RulesModal } from '../components/RulesModal';
import { GeneratedPairs, generatePairs } from '../utils/generatePairs';
import { Accordion } from '../components/Accordion';
import { AccordionContainer } from '../components/AccordionContainer';
import { ParticipantsList } from '../components/ParticipantsList';
import { ParticipantsTextView } from '../components/ParticipantsTextView';
import { SecretSantaLinks } from '../components/SecretSantaLinks';
import { Participant } from '../types';
import { PostCard } from '../components/PostCard';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/PageTransition';
import { Code, Rows } from '@phosphor-icons/react';
import { Settings } from '../components/Settings';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Layout } from '../components/Layout';

export function Home() {
  const { t } = useTranslation();
  const [isTextView, setIsTextView] = useState(false);

  const [participants, setParticipants] = useLocalStorage<Record<string, Participant>>(
    'secretSantaParticipants',
    {},
    (v) => v
  );
  const [assignments, setAssignments] = useLocalStorage<GeneratedPairs | null>(
    'secretSantaAssignments',
    null,
    (v) => v
  );
  const [instructions, setInstructions] = useLocalStorage<string>('secretSantaInstructions', '');

  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'participants' | 'links' | 'settings'>('participants');

  const handleGeneratePairs = () => {
    const assignments = generatePairs(participants);
    if (!assignments) {
      alert(
        Object.keys(participants).length < 2
          ? t('errors.needMoreParticipants')
          : t('errors.invalidPairs')
      );
      return;
    }
    setAssignments(assignments);
    setOpenSection('links');
  };

  const toggleViewButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsTextView(!isTextView);
      }}
      className="p-2 text-gray-200 hover:bg-gray-700 rounded-full"
      title={t(isTextView ? 'participants.switchToFormView' : 'participants.switchToTextView')}
    >
      {isTextView ? <Rows size={20} weight="bold" /> : <Code size={20} weight="bold" />}
    </button>
  );

  return (
    <>
      <PageTransition>
        {/* Layout with empty top menu */}
        <Layout menuItems={[]}>
          {/* Main content */}
          <div className="lg:flex-[6_6_0%]">
            <PostCard>
              <div className="space-y-4">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-red-700">
                  {t('home.title')}
                </h1>
                <div className="space-y-4 text-gray-600">
                  {t('home.explanation', { returnObjects: true }).map((line: string, i: number) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
                  ))}
                </div>
              </div>
            </PostCard>
          </div>

          {/* Side panel */}
          <div className="lg:order-none lg:flex-[5_5_0%]">
            <AccordionContainer>
              <Accordion
                title={t('participants.title')}
                isOpen={openSection === 'participants'}
                onToggle={() => setOpenSection('participants')}
                action={toggleViewButton}
              >
                {isTextView ? (
                  <ParticipantsTextView
                    participants={participants}
                    onChangeParticipants={setParticipants}
                    onGeneratePairs={handleGeneratePairs}
                  />
                ) : (
                  <ParticipantsList
                    participants={participants}
                    onChangeParticipants={setParticipants}
                    onOpenRules={(id) => {
                      setSelectedParticipantId(id);
                      setIsRulesModalOpen(true);
                    }}
                    onGeneratePairs={handleGeneratePairs}
                  />
                )}
              </Accordion>

              <Accordion
                title={t('settings.title')}
                isOpen={openSection === 'settings'}
                onToggle={() => setOpenSection('settings')}
              >
                <Settings instructions={instructions} onChangeInstructions={setInstructions} />
              </Accordion>

              {assignments && (
                <Accordion
                  title={t('links.title')}
                  isOpen={openSection === 'links'}
                  onToggle={() => setOpenSection('links')}
                >
                  <SecretSantaLinks
                    assignments={assignments}
                    instructions={instructions}
                    participants={participants}
                    onGeneratePairs={handleGeneratePairs}
                  />
                </Accordion>
              )}
            </AccordionContainer>
          </div>

          {/* Bottom center credits */}
          <div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm pointer-events-auto"
            dangerouslySetInnerHTML={{ __html: t('home.vanity') }}
          />
        </Layout>
      </PageTransition>

      {isRulesModalOpen && selectedParticipantId && (
        <RulesModal
          isOpen={isRulesModalOpen}
          onClose={() => setIsRulesModalOpen(false)}
          participants={participants}
          participantId={selectedParticipantId}
          onChangeParticipants={setParticipants}
        />
      )}
    </>
  );
}
