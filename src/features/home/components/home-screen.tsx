import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

const MAP_ASPECT_RATIO = 1564 / 432;
const SAFE_ART_ASPECT_RATIO = 560 / 144;

const STOPS = [
  { name: 'Dallas\nWarehouse', time: '08:30 AM', label: 'Completed', state: 'done' },
  { name: 'Fort Worth\nHub', time: '12:45 PM', label: 'Current', state: 'current' },
  { name: 'Arlington\nDepot', time: '02:30 PM', label: 'Upcoming', state: 'upcoming' },
  { name: 'Waco Hub', time: '05:15 PM', label: 'Upcoming', state: 'upcoming' },
] as const;

const ACTIONS = [
  { icon: 'doc.text', tint: '#1B7A56', wash: '#E5F8F2', title: 'View Stops', detail: '2 remaining' },
  { icon: 'icloud.and.arrow.up', tint: '#3B82F6', wash: '#E7F1FF', title: 'Upload POD', detail: 'Proof of delivery' },
  { icon: 'phone', tint: '#E07A3D', wash: '#FFF1E8', title: 'Contact Support', detail: 'Get help anytime' },
  { icon: 'bubble.left', tint: '#7B68EE', wash: '#F3EEFF', title: 'Report Issue', detail: 'Facing a problem?' },
] as const;

const UPCOMING = [
  { index: '3', title: 'Arlington Depot', address: '100 E Abram St, Arlington, TX', time: '02:30 PM', distance: '30 mi' },
  { index: '4', title: 'Waco Hub', address: '200 Austin Ave, Waco, TX', time: '05:15 PM', distance: '64 mi' },
] as const;

export function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JC</Text>
          </View>
          <View style={styles.greeting}>
            <Text style={styles.hello}>
              Good Morning,{'\n'}
              <Text style={styles.name}>James</Text>
            </Text>
            <Text style={styles.tagline}>Drive safe, deliver on time!</Text>
          </View>
          <View style={styles.headerSide}>
            <Pressable
              accessibilityLabel="Notifications"
              accessibilityRole="button"
              hitSlop={12}
              onPress={() => router.push('/notifications')}
              style={styles.bell}>
              <SymbolView name="bell" resizeMode="scaleAspectFit" style={styles.bellIcon} tintColor={HomeColors.title} />
              <View style={styles.bellDot} />
            </Pressable>
            <View style={styles.datePill}>
              <SymbolView name="calendar" resizeMode="scaleAspectFit" style={styles.dateIcon} tintColor={HomeColors.green} />
              <Text style={styles.dateText}>Mon, 22 Sep</Text>
            </View>
          </View>
        </View>

        <View style={styles.tripCard}>
          <View style={styles.tripTop}>
            <Text style={styles.tripKicker}>Current Trip</Text>
            <View style={styles.progressPill}>
              <View style={styles.progressDot} />
              <Text style={styles.progressText}>In Progress</Text>
            </View>
          </View>
          <Text style={styles.tripTitle}>Deliver to Fort Worth Hub</Text>
          <Text style={styles.tripAddress}>500 Main St, Fort Worth, TX</Text>

          <View style={styles.track}>
            <View style={styles.trackLine} />
            {STOPS.map((stop) => (
              <View key={stop.name} style={styles.stop}>
                <View style={[styles.stopDot, stop.state === 'done' && styles.stopDotDone, stop.state === 'current' && styles.stopDotCurrent]}>
                  {stop.state === 'done' ? (
                    <SymbolView name="checkmark" resizeMode="scaleAspectFit" style={styles.check} tintColor={HomeColors.greenDark} />
                  ) : (
                    <View style={stop.state === 'current' ? styles.stopCore : styles.stopHollow} />
                  )}
                </View>
                <Text style={styles.stopName}>{stop.name}</Text>
                <Text style={styles.stopTime}>{stop.time}</Text>
                <View style={[styles.stopPill, stop.state === 'current' && styles.stopPillCurrent]}>
                  <Text style={styles.stopPillText}>{stop.label}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.tripFooter}>
            <View style={styles.metric}>
              <SymbolView name="clock" resizeMode="scaleAspectFit" style={styles.metricIcon} tintColor="#D7EBE6" />
              <View>
                <Text style={styles.metricLabel}>ETA</Text>
                <Text style={styles.metricValue}>12:45 PM</Text>
              </View>
            </View>
            <View style={styles.metricRule} />
            <View style={styles.metric}>
              <SymbolView name="map" resizeMode="scaleAspectFit" style={styles.metricIcon} tintColor="#D7EBE6" />
              <View>
                <Text style={styles.metricLabel}>Distance</Text>
                <Text style={styles.metricValue}>18 mi</Text>
              </View>
            </View>
            <Pressable accessibilityRole="button" onPress={() => router.push('/navigate')} style={styles.navigate}>
              <SymbolView name="location.fill" resizeMode="scaleAspectFit" style={styles.navigateIcon} tintColor={HomeColors.greenDark} />
              <Text style={styles.navigateText}>Navigate</Text>
            </Pressable>
          </View>
        </View>

        <Image
          accessibilityLabel="Route map from the warehouse to Fort Worth Hub"
          contentFit="cover"
          source={require('@/assets/images/home-map.png')}
          style={styles.map}
        />

        <View style={styles.actions}>
          {ACTIONS.map((action) => {
            const card = (
              <>
                <View style={[styles.actionIcon, { backgroundColor: action.wash }]}>
                  <SymbolView name={action.icon as SFSymbol} resizeMode="scaleAspectFit" style={styles.actionGlyph} tintColor={action.tint} />
                </View>
                <Text style={styles.actionTitle}>
                  {action.title} <Text style={styles.actionChevron}>›</Text>
                </Text>
                <Text style={styles.actionDetail}>{action.detail}</Text>
              </>
            );
            const href =
              action.title === 'View Stops'
                ? '/stops'
                : action.title === 'Contact Support'
                  ? '/support'
                  : action.title === 'Report Issue'
                    ? '/report'
                    : null;
            if (href) {
              return (
                <Pressable key={action.title} accessibilityRole="button" onPress={() => router.push(href)} style={styles.action}>
                  {card}
                </Pressable>
              );
            }
            return (
              <View key={action.title} style={styles.action}>
                {card}
              </View>
            );
          })}
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <View style={styles.statHead}>
              <View style={[styles.statIcon, { backgroundColor: HomeColors.mint }]}>
                <SymbolView name="fuelpump.fill" resizeMode="scaleAspectFit" style={styles.statGlyph} tintColor={HomeColors.fuel} />
              </View>
              <Text style={styles.statLabel}>Fuel Level</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
            <Text style={styles.statValue}>68%</Text>
            <View style={styles.bar}>
              <View style={[styles.barFill, { width: '68%', backgroundColor: HomeColors.fuel }]} />
            </View>
            <Text style={styles.statDetail}>~ 260 mi remaining</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statHead}>
              <View style={[styles.statIcon, { backgroundColor: HomeColors.purpleSoft }]}>
                <SymbolView name="map" resizeMode="scaleAspectFit" style={styles.statGlyph} tintColor={HomeColors.purple} />
              </View>
              <Text style={styles.statLabel}>Today&apos;s Trips</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
            <Text style={styles.statValue}>1 / 3</Text>
            <View style={styles.bar}>
              <View style={[styles.barFill, { width: '33%', backgroundColor: HomeColors.purple }]} />
            </View>
            <Text style={styles.statDetail}>2 trips remaining</Text>
          </View>
        </View>

        <View style={styles.earnings}>
          <View style={[styles.statIcon, { backgroundColor: HomeColors.mint }]}>
            <SymbolView name="banknote" resizeMode="scaleAspectFit" style={styles.statGlyph} tintColor={HomeColors.green} />
          </View>
          <View style={styles.earningsCopy}>
            <Text style={styles.statLabel}>Today&apos;s Earnings</Text>
            <Text style={styles.statValue}>$185</Text>
          </View>
          <View style={styles.delta}>
            <Text style={styles.deltaValue}>↑ 12%</Text>
            <Text style={styles.deltaLabel}>vs. last week</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Upcoming Stops</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          {UPCOMING.map((stop, index) => (
            <View key={stop.index} style={[styles.stopRow, index > 0 && styles.stopRowBorder]}>
              <View style={styles.stopIndex}>
                <Text style={styles.stopIndexText}>{stop.index}</Text>
              </View>
              <View style={styles.stopCopy}>
                <Text style={styles.stopTitle}>{stop.title}</Text>
                <Text style={styles.stopAddress}>{stop.address}</Text>
              </View>
              <View style={styles.stopMeta}>
                <Text style={styles.stopMetaTime}>{stop.time}</Text>
                <Text style={styles.stopMetaDistance}>{stop.distance}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <View style={[styles.statIcon, { backgroundColor: HomeColors.green }]}>
              <SymbolView name="doc.text" resizeMode="scaleAspectFit" style={styles.statGlyph} tintColor="#FFFFFF" />
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoTitle}>Vehicle Documents</Text>
              <Text style={styles.infoDetail}>RC, Insurance, Pollution</Text>
              <View style={styles.validPill}>
                <Text style={styles.validText}>Valid</Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={[styles.statIcon, { backgroundColor: HomeColors.mint }]}>
              <SymbolView name="chart.bar.fill" resizeMode="scaleAspectFit" style={styles.statGlyph} tintColor={HomeColors.green} />
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoTitle}>Performance</Text>
              <Text style={styles.score}>
                4.8 <Text style={styles.star}>★</Text> <Text style={styles.scoreLabel}>Good</Text>
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>

        <View style={styles.safeBanner}>
          <View style={[styles.statIcon, { backgroundColor: HomeColors.green }]}>
            <SymbolView name="shield.fill" resizeMode="scaleAspectFit" style={styles.statGlyph} tintColor="#FFFFFF" />
          </View>
          <View style={styles.safeCopy}>
            <Text style={styles.safeTitle}>Drive Safe</Text>
            <Text style={styles.safeDetail}>Follow traffic rules and ensure safe delivery.</Text>
          </View>
          <Image contentFit="contain" source={require('@/assets/images/home-drive-safe.png')} style={styles.safeArt} />
          <Text style={styles.chevron}>›</Text>
        </View>
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
    paddingBottom: 20,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: HomeColors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  greeting: {
    flex: 1,
    gap: 2,
  },
  hello: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    color: HomeColors.body,
  },
  name: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
    color: HomeColors.title,
  },
  tagline: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.muted,
  },
  headerSide: {
    alignItems: 'flex-end',
    gap: 8,
  },
  bell: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: 20,
    height: 20,
  },
  bellDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: HomeColors.dot,
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: HomeColors.card,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 10,
    paddingVertical: 8,
    boxShadow: '0 4px 12px rgba(27, 42, 51, 0.05)',
  },
  dateIcon: {
    width: 14,
    height: 14,
  },
  dateText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: HomeColors.title,
  },
  tripCard: {
    backgroundColor: HomeColors.greenDark,
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 16,
    gap: 8,
  },
  tripTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripKicker: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: '#D5E8E3',
  },
  progressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F7F2',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  progressDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: HomeColors.green,
  },
  progressText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: HomeColors.greenDark,
  },
  tripTitle: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tripAddress: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: '#D7EBE6',
  },
  track: {
    flexDirection: 'row',
    marginTop: 10,
  },
  trackLine: {
    position: 'absolute',
    top: 10,
    left: '12%',
    right: '12%',
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  stop: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  stopDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  stopDotDone: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  stopDotCurrent: {
    backgroundColor: '#FFFFFF',
  },
  stopCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HomeColors.greenDark,
  },
  stopHollow: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  check: {
    width: 12,
    height: 12,
  },
  stopName: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  stopTime: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    color: '#D7EBE6',
    textAlign: 'center',
  },
  stopPill: {
    marginTop: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  stopPillCurrent: {
    backgroundColor: '#1F8A68',
  },
  stopPillText: {
    fontFamily: Fonts.sans,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tripFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricIcon: {
    width: 18,
    height: 18,
  },
  metricLabel: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    color: '#D7EBE6',
  },
  metricValue: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  metricRule: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  navigate: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  navigateIcon: {
    width: 16,
    height: 16,
  },
  navigateText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.greenDark,
  },
  map: {
    width: '100%',
    aspectRatio: MAP_ASPECT_RATIO,
    borderRadius: 18,
    borderCurve: 'continuous',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  action: {
    flex: 1,
    backgroundColor: HomeColors.card,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 10,
    gap: 8,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  actionIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionGlyph: {
    width: 16,
    height: 16,
  },
  actionTitle: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: HomeColors.title,
  },
  actionChevron: {
    color: HomeColors.muted,
    fontWeight: '500',
  },
  actionDetail: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    color: HomeColors.muted,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: HomeColors.card,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 12,
    gap: 8,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  statHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statGlyph: {
    width: 16,
    height: 16,
  },
  statLabel: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  chevron: {
    fontSize: 18,
    lineHeight: 20,
    color: HomeColors.muted,
  },
  statValue: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
    color: HomeColors.title,
  },
  bar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: HomeColors.track,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  statDetail: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    color: HomeColors.muted,
  },
  earnings: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: HomeColors.card,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 12,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  earningsCopy: {
    flex: 1,
    gap: 2,
  },
  delta: {
    backgroundColor: HomeColors.greenSoft,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'flex-end',
  },
  deltaValue: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  deltaLabel: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    color: HomeColors.body,
  },
  section: {
    backgroundColor: HomeColors.card,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 14,
    gap: 4,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  viewAll: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: HomeColors.green,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  stopRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#EEF1F4',
  },
  stopIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E7F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopIndexText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    fontWeight: '700',
    color: '#3B82F6',
  },
  stopCopy: {
    flex: 1,
    gap: 2,
  },
  stopTitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.title,
  },
  stopAddress: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.muted,
  },
  stopMeta: {
    alignItems: 'flex-end',
    gap: 2,
  },
  stopMetaTime: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: HomeColors.title,
  },
  stopMetaDistance: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.muted,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: HomeColors.card,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 10,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.04)',
  },
  infoCopy: {
    flex: 1,
    gap: 2,
  },
  infoTitle: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.title,
  },
  infoDetail: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    color: HomeColors.muted,
  },
  validPill: {
    alignSelf: 'flex-start',
    backgroundColor: HomeColors.greenSoft,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  validText: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
    color: HomeColors.green,
  },
  score: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.title,
  },
  star: {
    color: HomeColors.star,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: HomeColors.body,
  },
  safeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EAF7F2',
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingLeft: 12,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  safeCopy: {
    flex: 1,
    gap: 2,
    zIndex: 1,
  },
  safeTitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  safeDetail: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 15,
    color: HomeColors.body,
  },
  safeArt: {
    width: 120,
    aspectRatio: SAFE_ART_ASPECT_RATIO,
  },
});
