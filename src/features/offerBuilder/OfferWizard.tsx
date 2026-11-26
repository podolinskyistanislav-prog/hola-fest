import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppText,
  Button,
  ChoiceCard,
  Chip,
  OfferPreview,
  StepIndicator,
  Stepper,
  TextField,
  TimeWindowPicker,
} from '@/components/ui';
import { t, type TranslationKey } from '@/lib/i18n';
import type { AdminEventListItem } from '@/services/admin';
import { space, useTheme } from '@/theme';
import type { OfferKind } from '@/types/offerBuilder';

import type { VenueOfferInput } from '@/services/offerBuilder';

import { ErrorText } from './ErrorText';
import {
  kindNeedsValue,
  MAX_PER_GUEST,
  offerTerms,
  offerTitle,
  toOfferInput,
  toPreviewDraft,
  validateDetails,
  validateLimits,
  validateWhen,
  type OfferIntent,
  type OfferWizardDraft,
} from './offerDraft';

const TOTAL_STEPS = 5;

const KINDS: { kind: OfferKind; icon: string }[] = [
  { kind: 'percent_off', icon: '%' },
  { kind: 'amount_off', icon: '₴' },
  { kind: 'free_entry_until', icon: '🕙' },
  { kind: 'gift', icon: '🎁' },
  { kind: 'two_for_one', icon: '2×' },
  { kind: 'custom', icon: '✨' },
];

const STEP_TITLES: Record<number, TranslationKey> = {
  1: 'offerBuilder.step1',
  2: 'offerBuilder.step2',
  3: 'offerBuilder.step3',
  4: 'offerBuilder.step4',
  5: 'offerBuilder.step5',
};

export type EventChoices = {
  events: AdminEventListItem[];
  isLoading: boolean;
  isError: boolean;
};

export type OfferWizardProps = {
  venueName: string;
  initialDraft: OfferWizardDraft;
  isEditing: boolean;
  eventChoices: EventChoices;
  isSaving: boolean;
  /** Safe text of the last server error; the draft stays as the venue typed it. */
  serverError: string | null;
  onSubmit: (input: VenueOfferInput) => void;
  onCancel: () => void;
};

function errorText(key: TranslationKey | undefined): string | undefined {
  return key ? t(key) : undefined;
}

function validUntilText(time: string | null, eventTitle: string | null): string {
  if (eventTitle) return t('offerBuilder.validEvent').replace('{event}', eventTitle);
  return time ? t('offerBuilder.validUntil').replace('{time}', time) : t('offerBuilder.validNoEnd');
}

/** Five steps: template, details, when, limits, preview. All state is local, so errors never lose it. */
export function OfferWizard({
  venueName,
  initialDraft,
  isEditing,
  eventChoices,
  isSaving,
  serverError,
  onSubmit,
  onCancel,
}: OfferWizardProps) {
  const { colors } = useTheme();
  const [draft, setDraft] = useState<OfferWizardDraft>(initialDraft);
  const [step, setStep] = useState(isEditing ? 2 : 1);
  const [showErrors, setShowErrors] = useState(false);
  const [submitError, setSubmitError] = useState<TranslationKey | null>(null);

  const change = (patch: Partial<OfferWizardDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setSubmitError(null);
  };

  const details = validateDetails(draft);
  const when = validateWhen(draft, 'draft');
  const limits = validateLimits(draft);

  const stepErrors: Record<number, object> = {
    1: draft.kind ? {} : { kind: true },
    2: details,
    3: when,
    4: limits,
    5: {},
  };

  const goNext = () => {
    if (Object.keys(stepErrors[step] ?? {}).length > 0) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep(step + 1);
  };

  const goBack = () => {
    setShowErrors(false);
    setStep(step - 1);
  };

  const submit = (intent: OfferIntent) => {
    const input = toOfferInput(draft, intent);
    if (input) {
      onSubmit(input);
      return;
    }
    const firstError =
      validateDetails(draft).value ??
      validateDetails(draft).title ??
      validateDetails(draft).terms ??
      validateWhen(draft, intent).event ??
      validateWhen(draft, intent).window ??
      validateLimits(draft).maxClaims;
    setSubmitError(firstError ?? 'offerBuilder.error.invalid');
  };

  const event = eventChoices.events.find((candidate) => candidate.id === draft.eventId) ?? null;
  const stepLabel = t('offerBuilder.step')
    .replace('{current}', String(step))
    .replace('{total}', String(TOTAL_STEPS));

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppText variant="title" accessibilityRole="header">
          {t(isEditing ? 'offerBuilder.editTitle' : 'offerBuilder.new')}
        </AppText>
        <StepIndicator total={TOTAL_STEPS} current={step} label={stepLabel} />
        <AppText variant="heading" accessibilityRole="header">
          {t(STEP_TITLES[step] ?? 'offerBuilder.step1')}
        </AppText>

        {step === 1 ? (
          <View style={styles.group} accessibilityRole="radiogroup">
            {KINDS.map(({ kind, icon }) => (
              <ChoiceCard
                key={kind}
                title={t(`offerBuilder.kind.${kind}`)}
                subtitle={t(`offerBuilder.kind.${kind}.hint`)}
                icon={<AppText variant="heading">{icon}</AppText>}
                selected={draft.kind === kind}
                onPress={() =>
                  kind === draft.kind
                    ? undefined
                    : change({ kind, value: '', title: null, terms: null })
                }
              />
            ))}
          </View>
        ) : null}

        {step === 2 && draft.kind ? (
          <View style={styles.group}>
            {kindNeedsValue(draft.kind) ? (
              <TextField
                label={t(`offerBuilder.value.${draft.kind}`)}
                value={draft.value}
                onChangeText={(value) => change({ value })}
                keyboardType={
                  draft.kind === 'percent_off' || draft.kind === 'amount_off'
                    ? 'decimal-pad'
                    : 'default'
                }
                error={showErrors ? errorText(details.value) : undefined}
              />
            ) : null}
            <TextField
              label={t('offerBuilder.titleField')}
              value={offerTitle(draft)}
              onChangeText={(title) => change({ title })}
              error={showErrors ? errorText(details.title) : undefined}
            />
            <TextField
              label={t('offerBuilder.termsField')}
              value={offerTerms(draft)}
              multiline
              onChangeText={(terms) => change({ terms })}
              error={showErrors ? errorText(details.terms) : undefined}
            />
          </View>
        ) : null}

        {step === 3 ? (
          <View style={styles.group}>
            <View style={styles.chips}>
              <Chip
                label={t('offerBuilder.whenWindow')}
                selected={draft.whenMode === 'window'}
                onPress={() => change({ whenMode: 'window' })}
              />
              <Chip
                label={t('offerBuilder.whenEvent')}
                selected={draft.whenMode === 'event'}
                onPress={() => change({ whenMode: 'event' })}
              />
            </View>
            {draft.whenMode === 'window' ? (
              <TimeWindowPicker
                value={draft.window}
                onChange={(window) => change({ window })}
                error={showErrors ? errorText(when.window) : undefined}
              />
            ) : (
              <EventPicker
                choices={eventChoices}
                selectedId={draft.eventId}
                error={showErrors ? errorText(when.event) : undefined}
                onSelect={(eventId) => change({ eventId })}
              />
            )}
          </View>
        ) : null}

        {step === 4 ? (
          <View style={styles.group}>
            <TextField
              label={t('offerBuilder.maxClaims')}
              value={draft.maxClaims}
              keyboardType="number-pad"
              onChangeText={(maxClaims) => change({ maxClaims })}
              error={showErrors ? errorText(limits.maxClaims) : undefined}
            />
            <Stepper
              label={t('offerBuilder.perGuest')}
              value={draft.perUserLimit}
              min={1}
              max={MAX_PER_GUEST}
              decreaseLabel={t('offerBuilder.less')}
              increaseLabel={t('offerBuilder.more')}
              onChange={(perUserLimit) => change({ perUserLimit })}
            />
          </View>
        ) : null}

        {step === 5 ? (
          <View style={styles.group}>
            <OfferPreview
              draft={toPreviewDraft(draft, venueName, event?.title ?? null, validUntilText)}
              kicker={t('offerBuilder.previewKicker')}
              ctaLabel={t('offerBuilder.previewCta')}
              badgeCaption={t('offerBuilder.previewBadge')}
              cardCaption={t('offerBuilder.previewCard')}
              qrCaption={t('offerBuilder.previewQr')}
            />
            {submitError ? <ErrorText>{t(submitError)}</ErrorText> : null}
            {serverError ? <ErrorText>{serverError}</ErrorText> : null}
            <Button
              label={t(isSaving ? 'offerBuilder.saving' : 'offerBuilder.publish')}
              disabled={isSaving}
              onPress={() => submit('publish')}
            />
            {draft.whenMode === 'window' ? (
              <Button
                variant="glass"
                label={t('offerBuilder.schedule')}
                disabled={isSaving}
                onPress={() => submit('schedule')}
              />
            ) : null}
            <Button
              variant="glass"
              label={t('offerBuilder.saveDraft')}
              disabled={isSaving}
              onPress={() => submit('draft')}
            />
          </View>
        ) : null}

        <View style={styles.nav}>
          {step < TOTAL_STEPS ? <Button label={t('offerBuilder.next')} onPress={goNext} /> : null}
          {step > (isEditing ? 2 : 1) ? (
            <Button variant="glass" label={t('offerBuilder.back')} onPress={goBack} />
          ) : null}
          <Button variant="glass" label={t('offerBuilder.cancel')} onPress={onCancel} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EventPicker({
  choices,
  selectedId,
  error,
  onSelect,
}: {
  choices: EventChoices;
  selectedId: string | null;
  error?: string;
  onSelect: (eventId: string) => void;
}) {
  if (choices.isLoading) return <AppText tone="muted">{t('offerBuilder.eventsLoading')}</AppText>;
  if (choices.isError) {
    return (
      <AppText tone="muted" accessibilityRole="alert">
        {t('offerBuilder.eventsError')}
      </AppText>
    );
  }
  if (choices.events.length === 0) {
    return <AppText tone="muted">{t('offerBuilder.eventsEmpty')}</AppText>;
  }
  return (
    <View style={styles.group} accessibilityRole="radiogroup">
      {choices.events.map((event) => (
        <ChoiceCard
          key={event.id}
          title={event.title}
          subtitle={new Intl.DateTimeFormat('uk-UA', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Kyiv',
          }).format(event.startsAt)}
          icon={<AppText variant="heading">🎟</AppText>}
          selected={selectedId === event.id}
          onPress={() => onSelect(event.id)}
        />
      ))}
      {error ? <ErrorText>{error}</ErrorText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: space.screen, gap: space.lg },
  group: { gap: space.md },
  chips: { flexDirection: 'row', gap: space.sm },
  nav: { gap: space.md },
});
