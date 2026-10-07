import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

const HUB = '28.6288,77.3772';

const FACTS: { icon: SFSymbol; label: string; value: string }[] = [
  { icon: 'point.topleft.down.to.point.bottomright.curvepath', label: 'Total Distance', value: '2.8 km' },
  { icon: 'clock', label: 'Estimated Time', value: '6 min' },
  { icon: 'point.topleft.down.to.point.bottomright.curvepath', label: 'Stops', value: '1 / 1' },
];

export function TripStopsScreen() {
  const insets = useSafeAreaInsets();

  function openAppleMaps() {
    Linking.openURL(`https://maps.apple.com/?daddr=${HUB}&q=Noida%20Hub&dirflg=d`);
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
            <SymbolView name="chevron.left" resizeMode="scaleAspectFit" style={styles.backIcon} tintColor={HomeColors.green} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Trip Stops</Text>
            <Text style={styles.subtitle}>Follow the route and complete the ride</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryTop}>
            <View style={styles.carIcon}>
              <SymbolView name="car.fill" resizeMode="scaleAspectFit" style={styles.carGlyph} tintColor={HomeColors.green} />
            </View>
            <View style={styles.summaryCopy}>
              <Text style={styles.kicker}>Current Trip</Text>
              <Text style={styles.hub}>Noida Hub</Text>
              <Text style={styles.address}>A-62, Sector 63, Noida, UP</Text>
            </View>
            <View style={styles.ridePill}>
              <View style={styles.rideDot} />
              <Text style={styles.rideText}>On Ride</Text>
            </View>
          </View>
          <View style={styles.facts}>
            {FACTS.map((fact, index) => (
              <View key={fact.label} style={[styles.fact, index > 0 && styles.factDivider]}>
                <View style={styles.factLabelRow}>
                  <SymbolView name={fact.icon} resizeMode="scaleAspectFit" style={styles.factIcon} tintColor={HomeColors.body} />
                  <Text style={styles.factLabel}>{fact.label}</Text>
                </View>
                <Text style={styles.factValue}>{fact.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.timeline}>
          <View style={styles.rail} />

          <View style={styles.stop}>
            <View style={[styles.dot, styles.dotStart]}>
              <SymbolView name="location.fill" resizeMode="scaleAspectFit" style={styles.dotIcon} tintColor="#FFFFFF" />
            </View>
            <View style={styles.stopBody}>
              <View style={styles.stopHead}>
                <View style={styles.stopCopy}>
                  <Text style={styles.kicker}>Start Location</Text>
                  <Text style={styles.stopTitle}>Noida Hub</Text>
                  <Text style={styles.address}>A-62, Sector 63, Noida, UP</Text>
                </View>
                <View style={styles.started}>
                  <SymbolView name="checkmark" resizeMode="scaleAspectFit" style={styles.startedIcon} tintColor={HomeColors.green} />
                  <Text style={styles.startedText}>Started</Text>
                </View>
              </View>
              <View style={styles.way}>
                <SymbolView name="location.fill" resizeMode="scaleAspectFit" style={styles.wayIcon} tintColor={HomeColors.green} />
                <View>
                  <Text style={styles.wayTitle}>You are on the way</Text>
                  <Text style={styles.wayDetail}>Keep going straight for 2.8 km</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.stop}>
            <View style={[styles.dot, styles.dotNext]}>
              <SymbolView name="person.fill" resizeMode="scaleAspectFit" style={styles.dotIcon} tintColor="#FFFFFF" />
            </View>
            <View style={styles.stopBody}>
              <View style={styles.stopHead}>
                <View style={styles.stopCopy}>
                  <Text style={styles.kicker}>Stop 1</Text>
                  <Text style={styles.stopTitle}>Sector 62</Text>
                  <Text style={styles.address}>Noida, UP</Text>
                </View>
                <View style={styles.nextPill}>
                  <View style={styles.nextDot} />
                  <Text style={styles.nextText}>Next Stop</Text>
                </View>
              </View>
              <View style={styles.arrive}>
                <SymbolView name="clock" resizeMode="scaleAspectFit" style={styles.arriveIcon} tintColor={HomeColors.body} />
                <Text style={styles.arriveText}>
                  Arrive in 6 min <Text style={styles.arriveDistance}>(2.8 km)</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.stop}>
            <View style={[styles.dot, styles.dotPending]}>
              <SymbolView name="flag.fill" resizeMode="scaleAspectFit" style={styles.dotIcon} tintColor="#FFFFFF" />
            </View>
            <View style={styles.stopBody}>
              <View style={styles.stopHead}>
                <View style={styles.stopCopy}>
                  <Text style={styles.kicker}>Final Destination</Text>
                  <Text style={styles.stopTitle}>Noida Hub</Text>
                  <Text style={styles.address}>A-62, Sector 63, Noida, UP</Text>
                </View>
                <View style={styles.pending}>
                  <View style={styles.pendingRing} />
                  <Text style={styles.pendingText}>Pending</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable accessibilityRole="button" onPress={openAppleMaps} style={styles.mapsButton}>
          <SymbolView name="location.fill" resizeMode="scaleAspectFit" style={styles.mapsIcon} tintColor="#FFFFFF" />
          <Text style={styles.mapsLabel}>Open in Apple Maps</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  summary: {
    backgroundColor: '#E7F6F1',
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 14,
    gap: 14,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  carIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carGlyph: {
    width: 20,
    height: 20,
  },
  summaryCopy: {
    flex: 1,
    gap: 1,
  },
  kicker: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  hub: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  address: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  ridePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DDF3E8',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  rideDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: HomeColors.green,
  },
  rideText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  facts: {
    flexDirection: 'row',
  },
  fact: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 4,
  },
  factDivider: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#C9DDD4',
  },
  factLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  factIcon: {
    width: 12,
    height: 12,
  },
  factLabel: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    color: HomeColors.body,
  },
  factValue: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    color: HomeColors.title,
  },
  timeline: {
    gap: 18,
  },
  rail: {
    position: 'absolute',
    left: 19,
    top: 22,
    bottom: 22,
    width: 2,
    backgroundColor: '#D5E8DF',
  },
  stop: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dotStart: {
    backgroundColor: HomeColors.green,
  },
  dotNext: {
    backgroundColor: '#3B82F6',
  },
  dotPending: {
    backgroundColor: '#B7BFC6',
  },
  dotIcon: {
    width: 16,
    height: 16,
  },
  stopBody: {
    flex: 1,
    gap: 10,
    paddingTop: 2,
  },
  stopHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  stopCopy: {
    flex: 1,
    gap: 1,
  },
  stopTitle: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
    color: HomeColors.title,
  },
  started: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  startedIcon: {
    width: 12,
    height: 12,
  },
  startedText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  way: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E7F6F1',
    borderRadius: 14,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  wayIcon: {
    width: 14,
    height: 14,
  },
  wayTitle: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '700',
    color: HomeColors.green,
  },
  wayDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  nextPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E7F1FF',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 6,
  },
  nextDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  nextText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#3B82F6',
  },
  arrive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F4F7F8',
    borderRadius: 14,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  arriveIcon: {
    width: 14,
    height: 14,
  },
  arriveText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.title,
  },
  arriveDistance: {
    fontWeight: '500',
    color: HomeColors.body,
  },
  pending: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  pendingRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#C5CDD4',
  },
  pendingText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: HomeColors.muted,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
  mapsButton: {
    height: 52,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: HomeColors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapsIcon: {
    width: 16,
    height: 16,
  },
  mapsLabel: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
