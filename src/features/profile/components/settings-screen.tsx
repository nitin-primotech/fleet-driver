import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { Fonts, HomeColors } from '@/constants/theme';
import { ProfileScaffold } from '@/features/profile/components/profile-scaffold';
import { updateProfile, useProfile, type DriverProfile } from '@/features/profile/profile-data';

const LANGUAGES: DriverProfile['language'][] = ['English', 'Hindi'];
const MAPS: DriverProfile['mapStyle'][] = ['Standard', 'Satellite'];

export function SettingsScreen() {
  const profile = useProfile();

  return (
    <ProfileScaffold title="App Settings">
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <View style={styles.copy}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.detail}>Trip alerts and reminders</Text>
          </View>
          <Switch
            onValueChange={(notifications) => updateProfile({ notifications })}
            thumbColor="#FFFFFF"
            trackColor={{ false: '#D5DBE0', true: HomeColors.green }}
            value={profile.notifications}
          />
        </View>
      </View>

      <Choice
        label="Language"
        options={LANGUAGES}
        value={profile.language}
        onChange={(language) => updateProfile({ language })}
      />
      <Choice
        label="Map"
        options={MAPS}
        value={profile.mapStyle}
        onChange={(mapStyle) => updateProfile({ mapStyle })}
      />
    </ProfileScaffold>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.choiceLabel}>{label}</Text>
      <View style={styles.options}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onChange(option)}
              style={[styles.option, selected && styles.optionSelected]}>
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  detail: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: HomeColors.body,
  },
  choiceLabel: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  options: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F2F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: HomeColors.green,
  },
  optionText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.title,
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
});
