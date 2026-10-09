import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

type Notice = {
  id: string;
  icon: SFSymbol;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
};

const INITIAL_NOTICES: Notice[] = [
  {
    id: 'next-stop',
    icon: 'truck.box.fill',
    title: 'Next stop updated',
    detail: 'Fort Worth Hub is next. Arrive by 12:45 PM.',
    time: '10 min ago',
    unread: true,
  },
  {
    id: 'assigned',
    icon: 'calendar',
    title: 'New trip assigned',
    detail: 'Dallas to Houston starts Monday at 6:00 AM.',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 'inspection',
    icon: 'doc.text.fill',
    title: 'Inspection expiring',
    detail: 'Vehicle inspection is valid until 15 Nov 2025.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'earnings',
    icon: 'banknote',
    title: "Today's earnings",
    detail: 'You earned $185 on today’s route.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'support',
    icon: 'checkmark.circle.fill',
    title: 'Report received',
    detail: 'Support will follow up on your registered number.',
    time: '2 days ago',
    unread: false,
  },
];

export function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const unread = notices.filter((notice) => notice.unread).length;

  function openNotice(id: string) {
    setNotices((current) => current.map((notice) => (notice.id === id ? { ...notice, unread: false } : notice)));
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
            <SymbolView name="chevron.left" resizeMode="scaleAspectFit" style={styles.backIcon} tintColor={HomeColors.green} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>{unread === 0 ? "You're all caught up" : `${unread} new updates`}</Text>
          </View>
        </View>

        {notices.map((notice) => (
          <Pressable
            key={notice.id}
            accessibilityRole="button"
            onPress={() => openNotice(notice.id)}
            style={[styles.row, notice.unread && styles.rowUnread]}>
            <View style={[styles.iconWrap, notice.unread && styles.iconWrapUnread]}>
              <SymbolView name={notice.icon} resizeMode="scaleAspectFit" style={styles.icon} tintColor={HomeColors.green} />
            </View>
            <View style={styles.copy}>
              <View style={styles.rowTop}>
                <Text style={styles.rowTitle}>{notice.title}</Text>
                <Text style={styles.time}>{notice.time}</Text>
              </View>
              <Text style={styles.rowDetail}>{notice.detail}</Text>
            </View>
            {notice.unread ? <View style={styles.dot} /> : null}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FA',
  },
  content: {
    paddingHorizontal: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HomeColors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 16,
    height: 16,
  },
  headerCopy: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: HomeColors.title,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 17,
    color: HomeColors.body,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    paddingVertical: 14,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  rowUnread: {
    backgroundColor: HomeColors.greenSoft,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HomeColors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapUnread: {
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 18,
    height: 18,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  rowTitle: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  time: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    color: HomeColors.muted,
  },
  rowDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HomeColors.dot,
  },
});
