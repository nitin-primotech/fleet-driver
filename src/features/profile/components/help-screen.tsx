import { useState } from 'react';
import { Linking, StyleSheet, Text, TextInput, View } from 'react-native';

import { Fonts, HomeColors } from '@/constants/theme';
import { ProfileButton, ProfileScaffold } from '@/features/profile/components/profile-scaffold';

export function HelpScreen() {
  const [request, setRequest] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function submit() {
    const message = request.trim();
    if (!message) {
      setSent(false);
      setError('Describe the issue first.');
      return;
    }
    setRequest('');
    setError('');
    setSent(true);
  }

  return (
    <ProfileScaffold title="Help & Support">
      <View style={styles.card}>
        <Text style={styles.title}>FleetPro Support</Text>
        <Text style={styles.detail}>Call or email the desk, or send a request from this device.</Text>
        <ProfileButton label="Call support" onPress={() => Linking.openURL('tel:+18005550199')} />
        <ProfileButton label="Email support" onPress={() => Linking.openURL('mailto:support@fleetpro.app')} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Raise a request</Text>
        <TextInput
          multiline
          onChangeText={setRequest}
          placeholder="Describe the issue"
          placeholderTextColor={HomeColors.muted}
          style={styles.input}
          textAlignVertical="top"
          value={request}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {sent ? <Text style={styles.sent}>Request sent. Support will follow up on your registered number.</Text> : null}
      <ProfileButton label="Submit request" onPress={submit} />
    </ProfileScaffold>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 16,
    gap: 12,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  detail: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: HomeColors.body,
  },
  field: {
    gap: 6,
  },
  label: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: HomeColors.body,
  },
  input: {
    minHeight: 120,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: HomeColors.card,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: Fonts.sans,
    fontSize: 16,
    color: HomeColors.title,
  },
  error: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: '#C44747',
  },
  sent: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.green,
  },
});
