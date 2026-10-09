import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';
import { confirmSignOut, DRIVER_FACTS, formatPhone, useProfile } from '@/features/profile/profile-data';

const STATS: { icon: SFSymbol; value: string; label: string }[] = [
  { icon: 'chart.bar.fill', value: DRIVER_FACTS.trips, label: 'Trips Completed' },
  { icon: 'point.topleft.down.to.point.bottomright.curvepath', value: DRIVER_FACTS.distance, label: 'Total Distance\n(mi)' },
  { icon: 'clock.fill', value: DRIVER_FACTS.hours, label: 'Driving Hours' },
  { icon: 'star.fill', value: DRIVER_FACTS.rating, label: 'Rating' },
];

const ID_ITEMS: { icon: SFSymbol; label: string; value: string }[] = [
  { icon: 'truck.box.fill', label: 'Driver ID', value: DRIVER_FACTS.driverId },
  { icon: 'doc.text', label: 'License No.', value: DRIVER_FACTS.license },
  { icon: 'calendar', label: 'Joined On', value: DRIVER_FACTS.joined },
];

type MenuItem = {
  icon: SFSymbol;
  tint: string;
  wash: string;
  title: string;
  detail: string;
  onPress: () => void;
};

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const profile = useProfile();

  const groups: MenuItem[][] = [
    [
      {
        icon: 'person.fill',
        tint: HomeColors.green,
        wash: HomeColors.greenSoft,
        title: 'Personal Information',
        detail: 'Name, phone, email, address',
        onPress: () => router.push('/account/personal'),
      },
      {
        icon: 'doc.text.fill',
        tint: '#3B82F6',
        wash: HomeColors.blueSoft,
        title: 'Documents',
        detail: 'License, registration, insurance, inspection',
        onPress: () => router.push('/account/documents'),
      },
      {
        icon: 'truck.box.fill',
        tint: '#E07A3D',
        wash: HomeColors.peach,
        title: 'Vehicle Details',
        detail: 'Vehicle info and assigned vehicle',
        onPress: () => router.push('/account/vehicle'),
      },
    ],
    [
      {
        icon: 'gearshape.fill',
        tint: HomeColors.purple,
        wash: HomeColors.purpleSoft,
        title: 'App Settings',
        detail: 'Notifications, language, map settings',
        onPress: () => router.push('/account/settings'),
      },
      {
        icon: 'shield.fill',
        tint: '#E5484D',
        wash: '#FDECEC',
        title: 'Security',
        detail: 'Change PIN, logout',
        onPress: () => router.push('/account/security'),
      },
      {
        icon: 'headphones',
        tint: '#2F80ED',
        wash: '#E7F4FF',
        title: 'Help & Support',
        detail: 'Get help, raise a request',
        onPress: () => router.push('/account/help'),
      },
    ],
  ];

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Manage your account and preferences</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={() => router.push('/account/edit')} style={styles.edit}>
            <SymbolView name="pencil" resizeMode="scaleAspectFit" style={styles.editIcon} tintColor={HomeColors.green} />
            <Text style={styles.editLabel}>Edit</Text>
          </Pressable>
        </View>

        <Pressable accessibilityRole="button" onPress={() => router.push('/account/personal')} style={styles.identity}>
          <View>
            <Image accessibilityLabel={profile.name} source={require('@/assets/images/profile-avatar.png')} style={styles.avatar} />
            <Pressable
              accessibilityLabel="Edit profile photo"
              accessibilityRole="button"
              onPress={() => router.push('/account/edit')}
              style={styles.cameraHit}
            />
          </View>
          <View style={styles.identityCopy}>
            <Text numberOfLines={1} style={styles.name}>
              {profile.name}
            </Text>
            <View style={styles.verified}>
              <SymbolView name="checkmark.shield.fill" resizeMode="scaleAspectFit" style={styles.verifiedIcon} tintColor={HomeColors.green} />
              <Text style={styles.verifiedText}>Verified Driver</Text>
            </View>
            <View style={styles.contact}>
              <SymbolView name="phone.fill" resizeMode="scaleAspectFit" style={styles.contactIcon} tintColor={HomeColors.body} />
              <Text style={styles.contactText}>{formatPhone(profile.phone)}</Text>
            </View>
            <View style={styles.contact}>
              <SymbolView name="envelope.fill" resizeMode="scaleAspectFit" style={styles.contactIcon} tintColor={HomeColors.body} />
              <Text numberOfLines={1} style={styles.contactText}>
                {profile.email}
              </Text>
            </View>
          </View>
          <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.chevron} tintColor={HomeColors.muted} />
        </Pressable>

        <View style={styles.idCard}>
          {ID_ITEMS.map((item, index) => (
            <View key={item.label} style={[styles.idCol, index < ID_ITEMS.length - 1 && styles.idDivider]}>
              <View style={styles.idLabelRow}>
                <SymbolView name={item.icon} resizeMode="scaleAspectFit" style={styles.idIcon} tintColor={HomeColors.title} />
                <Text style={styles.idLabel}>{item.label}</Text>
              </View>
              <Text style={styles.idValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.stats}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <SymbolView name={stat.icon} resizeMode="scaleAspectFit" style={styles.statIcon} tintColor={HomeColors.green} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {groups.map((group) => (
          <View key={group[0].title} style={styles.menu}>
            {group.map((item, index) => (
              <Pressable
                key={item.title}
                accessibilityRole="button"
                onPress={item.onPress}
                style={[styles.row, index < group.length - 1 && styles.rowBorder]}>
                <View style={[styles.rowIcon, { backgroundColor: item.wash }]}>
                  <SymbolView name={item.icon} resizeMode="scaleAspectFit" style={styles.rowGlyph} tintColor={item.tint} />
                </View>
                <View style={styles.rowCopy}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowDetail}>{item.detail}</Text>
                </View>
                <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.chevron} tintColor={HomeColors.muted} />
              </Pressable>
            ))}
          </View>
        ))}

        <Pressable accessibilityRole="button" onPress={confirmSignOut} style={styles.menu}>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#FDECEC' }]}>
              <SymbolView
                name="rectangle.portrait.and.arrow.right"
                resizeMode="scaleAspectFit"
                style={styles.rowGlyph}
                tintColor="#E5484D"
              />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowTitle}>Logout</Text>
              <Text style={styles.rowDetail}>Sign out from your account</Text>
            </View>
            <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.chevron} tintColor={HomeColors.muted} />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: HomeColors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: HomeColors.title,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 17,
    color: HomeColors.body,
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: HomeColors.greenSoft,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  editIcon: {
    width: 14,
    height: 14,
  },
  editLabel: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
    color: HomeColors.green,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 14,
    boxShadow: '0 8px 20px rgba(27, 42, 51, 0.05)',
  },
  avatar: {
    width: 84,
    height: 84,
  },
  cameraHit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
  },
  identityCopy: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  verified: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: HomeColors.greenSoft,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  verifiedIcon: {
    width: 12,
    height: 12,
  },
  verifiedText: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: HomeColors.green,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactIcon: {
    width: 12,
    height: 12,
  },
  contactText: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  chevron: {
    width: 14,
    height: 14,
  },
  idCard: {
    flexDirection: 'row',
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    paddingVertical: 14,
    boxShadow: '0 8px 20px rgba(27, 42, 51, 0.05)',
  },
  idCol: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 6,
  },
  idDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#E3E8EC',
  },
  idLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  idIcon: {
    width: 14,
    height: 14,
  },
  idLabel: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    color: HomeColors.body,
  },
  idValue: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '700',
    color: HomeColors.title,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#E7F6F1',
    borderRadius: 22,
    borderCurve: 'continuous',
    paddingVertical: 16,
    paddingHorizontal: 6,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    width: 20,
    height: 20,
  },
  statValue: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  statLabel: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    color: HomeColors.body,
    textAlign: 'center',
  },
  menu: {
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    boxShadow: '0 8px 20px rgba(27, 42, 51, 0.05)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6EBEE',
  },
  rowIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowGlyph: {
    width: 20,
    height: 20,
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    color: HomeColors.title,
  },
  rowDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
});
