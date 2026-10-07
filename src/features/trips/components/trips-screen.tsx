import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

const HERO_ASPECT_RATIO = 1720 / 752;

type Filter = 'active' | 'upcoming' | 'completed';

const FILTERS: { key: Filter; label: string; count?: string }[] = [
  { key: 'active', label: 'Active', count: '1' },
  { key: 'upcoming', label: 'Upcoming', count: '3' },
  { key: 'completed', label: 'Completed', count: '12' },
];

const METRICS: { icon: SFSymbol; label: string; value: string }[] = [
  { icon: 'clock', label: 'ETA', value: '5:45 PM' },
  { icon: 'map', label: 'Distance Left', value: '240 km' },
  { icon: 'mappin', label: 'Next Stop', value: 'Kanpur' },
  { icon: 'doc.text', label: 'Stops', value: '2 remaining' },
];

const STOPS = [
  {
    title: 'Noida Warehouse',
    address: 'Sector 62, Noida, UP',
    status: 'Completed',
    time: '08:15 AM',
    state: 'done',
  },
  {
    title: 'Kanpur Distribution Center',
    address: 'Transport Nagar, Kanpur, UP',
    status: 'Next Stop',
    time: '~ 2h 15m',
    state: 'next',
  },
  {
    title: 'Lucknow Hub',
    address: 'Gomti Nagar, Lucknow, UP',
    status: 'Upcoming',
    time: '--:--',
    state: 'upcoming',
  },
] as const;

export function TripsScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>('active');

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Trips</Text>
            <Text style={styles.subtitle}>Your assigned trips and stops</Text>
          </View>
          <View style={styles.today}>
            <SymbolView name="calendar" resizeMode="scaleAspectFit" style={styles.todayIcon} tintColor={HomeColors.green} />
            <Text style={styles.todayText}>{rangeLabel(filter)}</Text>
            <Text style={styles.todayChevron}>▾</Text>
          </View>
        </View>

        <View style={styles.filters}>
          {FILTERS.map((item) => {
            const selected = filter === item.key;
            return (
              <Pressable
                key={item.key}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setFilter(item.key)}
                style={[styles.filter, selected && styles.filterSelected]}>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  numberOfLines={1}
                  style={[styles.filterLabel, selected && styles.filterLabelSelected]}>
                  {item.label}
                </Text>
                {item.count ? (
                  <View style={[styles.count, selected && styles.countSelected]}>
                    <Text style={[styles.countText, selected && styles.countTextSelected]}>{item.count}</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {filter === 'active' ? <ActiveTrip /> : filter === 'upcoming' ? <UpcomingTrips /> : <CompletedTrips />}
      </ScrollView>
    </View>
  );
}

function ActiveTrip() {
  return (
    <>
      <View style={styles.card}>
        <Image
          accessibilityLabel="Noida to Lucknow trip"
          contentFit="cover"
          source={require('@/assets/images/trip-hero.png')}
          style={styles.hero}
        />

        <View style={styles.progress}>
          <View style={styles.progressDone} />
          <View style={styles.progressTodo} />
          <ProgressStep label="Started" detail="08:15 AM" state="done" />
          <ProgressStep label="En Route" detail="240 km left" state="current" />
          <ProgressStep label="Complete" detail="--:--" state="upcoming" />
        </View>

        <View style={styles.metrics}>
          {METRICS.map((metric) => (
            <View key={metric.label} style={styles.metric}>
              <SymbolView name={metric.icon} resizeMode="scaleAspectFit" style={styles.metricIcon} tintColor={HomeColors.body} />
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
            </View>
          ))}
        </View>

        <Pressable accessibilityRole="button" style={styles.continueButton}>
          <SymbolView name="location.fill" resizeMode="scaleAspectFit" style={styles.continueIcon} tintColor="#FFFFFF" />
          <Text style={styles.continueLabel}>Continue Trip</Text>
          <Text style={styles.continueChevron}>›</Text>
        </Pressable>
      </View>

      <View style={styles.stopsCard}>
        <View style={styles.stopsHead}>
          <Text style={styles.stopsTitle}>Stops (3)</Text>
          <View style={styles.viewRoute}>
            <SymbolView name="map" resizeMode="scaleAspectFit" style={styles.viewRouteIcon} tintColor={HomeColors.green} />
            <Text style={styles.viewRouteText}>View Route ›</Text>
          </View>
        </View>
        <View style={styles.stopList}>
          <View style={styles.stopLine} />
          {STOPS.map((stop) => (
            <View key={stop.title} style={styles.stopRow}>
              <View
                style={[
                  styles.stopDot,
                  stop.state === 'done' && styles.stopDotDone,
                  stop.state === 'next' && styles.stopDotNext,
                ]}>
                {stop.state === 'done' ? (
                  <SymbolView name="checkmark" resizeMode="scaleAspectFit" style={styles.stopCheck} tintColor="#FFFFFF" />
                ) : (
                  <View style={stop.state === 'next' ? styles.stopCore : styles.stopHollow} />
                )}
              </View>
              <View style={styles.stopBody}>
                <View style={styles.stopTop}>
                  <View style={styles.stopCopy}>
                    <Text style={styles.stopKicker}>{stop.state === 'done' ? 'Stop 1' : stop.state === 'next' ? 'Stop 2' : 'Stop 3'}</Text>
                    <Text style={styles.stopTitle}>{stop.title}</Text>
                    <Text style={styles.stopAddress}>{stop.address}</Text>
                  </View>
                  <View style={styles.stopMeta}>
                    <View
                      style={[
                        styles.statusPill,
                        stop.state === 'done' && styles.statusDone,
                        stop.state === 'next' && styles.statusNext,
                      ]}>
                      <Text
                        style={[
                          styles.statusText,
                          stop.state === 'done' && styles.statusTextDone,
                          stop.state === 'next' && styles.statusTextNext,
                        ]}>
                        {stop.status}
                      </Text>
                    </View>
                    <Text style={styles.stopTime}>{stop.time}</Text>
                  </View>
                  <Text style={styles.rowChevron}>›</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

function ProgressStep({
  label,
  detail,
  state,
}: {
  label: string;
  detail: string;
  state: 'done' | 'current' | 'upcoming';
}) {
  return (
    <View style={styles.step}>
      <View style={[styles.stepDot, state === 'done' && styles.stepDotDone, state === 'current' && styles.stepDotCurrent]}>
        {state === 'done' ? (
          <SymbolView name="checkmark" resizeMode="scaleAspectFit" style={styles.stepCheck} tintColor="#FFFFFF" />
        ) : null}
      </View>
      <Text style={styles.stepLabel}>{label}</Text>
      <Text style={styles.stepDetail}>{detail}</Text>
    </View>
  );
}

const UPCOMING_TRIPS = [
  {
    id: 'TRP-1290',
    from: 'Anand Vihar',
    to: 'Kanpur',
    source: require('@/assets/images/upcoming-kanpur.png'),
    aspectRatio: 864 / 296,
    stopsLabel: '5 stops',
    distance: '420 km',
    duration: 'Estimated 7h 20m',
    date: 'Mon, 29 Sep',
    time: '06:00 AM',
    stops: [
      { title: 'Anand Vihar Warehouse', address: 'Sector 62, Noida, UP', time: '06:00 AM' },
      { title: 'Kanpur Distribution Center', address: 'Transport Nagar, Kanpur, UP', time: '10:00 AM' },
      { title: 'Lucknow Hub', address: 'Gomti Nagar, Lucknow, UP', time: '03:00 PM' },
    ],
  },
  {
    id: 'TRP-1291',
    from: 'Delhi',
    to: 'Jaipur',
    source: require('@/assets/images/upcoming-jaipur.png'),
    aspectRatio: 864 / 182,
    stopsLabel: '3 stops',
    distance: '320 km',
    duration: 'Estimated 6h 10m',
    date: 'Tue, 30 Sep',
    time: '08:30 AM',
  },
  {
    id: 'TRP-1292',
    from: 'Agra',
    to: 'Gwalior',
    source: require('@/assets/images/upcoming-gwalior.png'),
    aspectRatio: 864 / 96,
    stopsLabel: '4 stops',
    distance: '260 km',
    duration: 'Estimated 5h 45m',
    date: 'Wed, 1 Oct',
    time: '07:00 AM',
  },
] as const;

function UpcomingTrips() {
  return (
    <View style={styles.upcomingList}>
      {UPCOMING_TRIPS.map((trip) => (
        <View key={trip.id} style={styles.upcomingCard}>
          <Image
            accessibilityLabel={`${trip.from} to ${trip.to}`}
            contentFit="cover"
            source={trip.source}
            style={[styles.upcomingHero, { aspectRatio: trip.aspectRatio }]}
          />
          <View style={styles.upcomingBody}>
            <View style={styles.upcomingHead}>
              <Text
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                numberOfLines={1}
                style={styles.upcomingTitle}>
                {trip.from} → {trip.to}
              </Text>
              <View style={styles.dateBox}>
                <View style={styles.dateRow}>
                  <SymbolView name="calendar" resizeMode="scaleAspectFit" style={styles.dateIcon} tintColor={HomeColors.green} />
                  <Text style={styles.dateText}>{trip.date}</Text>
                </View>
                <Text style={styles.dateTime}>{trip.time}</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <TripStat icon="shippingbox" label={trip.stopsLabel} />
              <TripStat icon="point.topleft.down.to.point.bottomright.curvepath" label={trip.distance} />
              <TripStat icon="clock" label={trip.duration} />
            </View>
            {'stops' in trip ? <UpcomingStops stops={trip.stops} /> : null}
            <View style={styles.tripActions}>
              <Pressable accessibilityRole="button" style={styles.detailsButton}>
                <SymbolView name="doc.text" resizeMode="scaleAspectFit" style={styles.actionIcon} tintColor={HomeColors.green} />
                <Text style={styles.detailsLabel}>View Details</Text>
              </Pressable>
              <Pressable accessibilityRole="button" style={styles.startButton}>
                <SymbolView name="paperplane.fill" resizeMode="scaleAspectFit" style={styles.actionIcon} tintColor="#FFFFFF" />
                <Text style={styles.startLabel}>Start Trip Later</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function TripStat({ icon, label }: { icon: SFSymbol; label: string }) {
  return (
    <View style={styles.stat}>
      <SymbolView name={icon} resizeMode="scaleAspectFit" style={styles.statIcon} tintColor={HomeColors.body} />
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function UpcomingStops({ stops }: { stops: readonly { title: string; address: string; time: string }[] }) {
  return (
    <View style={styles.timeline}>
      <View style={styles.timelineLine} />
      {stops.map((stop, index) => (
        <View key={stop.title} style={styles.timelineRow}>
          <View style={[styles.timelineDot, index === 0 && styles.timelineDotStart]} />
          <View style={styles.timelineCopy}>
            <Text style={styles.timelineTitle}>{stop.title}</Text>
            <Text style={styles.timelineAddress}>{stop.address}</Text>
          </View>
          <Text style={styles.timelineTime}>{stop.time}</Text>
          {index > 0 ? <Text style={styles.timelineChevron}>›</Text> : <View style={styles.timelineChevronGap} />}
        </View>
      ))}
    </View>
  );
}

function rangeLabel(filter: Filter) {
  if (filter === 'upcoming') return 'This Week';
  if (filter === 'completed') return 'Last 30 Days';
  return 'Today';
}

const COMPLETED_TRIPS = [
  {
    id: 'TRP-1256',
    from: 'Noida',
    to: 'Lucknow',
    source: require('@/assets/images/completed-lucknow.png'),
    aspectRatio: 864 / 194,
    stopsLabel: '3 stops',
    distance: '520 km',
    duration: '8h 20m',
    date: 'Tue, 24 Sep',
    time: '06:10 AM – 02:30 PM',
  },
  {
    id: 'TRP-1248',
    from: 'Delhi',
    to: 'Jaipur',
    source: require('@/assets/images/completed-jaipur.png'),
    aspectRatio: 864 / 184,
    stopsLabel: '4 stops',
    distance: '320 km',
    duration: '6h 45m',
    date: 'Fri, 20 Sep',
    time: '07:15 AM – 02:00 PM',
  },
  {
    id: 'TRP-1210',
    from: 'Agra',
    to: 'Gwalior',
    source: require('@/assets/images/completed-gwalior.png'),
    aspectRatio: 864 / 154,
    stopsLabel: '2 stops',
    distance: '260 km',
    duration: '5h 10m',
    date: 'Mon, 16 Sep',
    time: '08:00 AM – 01:10 PM',
  },
  {
    id: 'TRP-1198',
    from: 'Kanpur',
    to: 'Varanasi',
    source: require('@/assets/images/completed-varanasi.png'),
    aspectRatio: 864 / 138,
    stopsLabel: '3 stops',
    distance: '410 km',
    duration: '7h 35m',
    date: 'Wed, 11 Sep',
    time: '06:30 AM – 02:05 PM',
  },
] as const;

function CompletedTrips() {
  return (
    <View style={styles.upcomingList}>
      {COMPLETED_TRIPS.map((trip) => (
        <View key={trip.id} style={styles.upcomingCard}>
          <Image
            accessibilityLabel={`${trip.from} to ${trip.to}`}
            contentFit="cover"
            source={trip.source}
            style={[styles.upcomingHero, { aspectRatio: trip.aspectRatio }]}
          />
          <View style={styles.upcomingBody}>
            <View style={styles.upcomingHead}>
              <Text adjustsFontSizeToFit minimumFontScale={0.8} numberOfLines={1} style={styles.upcomingTitle}>
                {trip.from} → {trip.to}
              </Text>
              <View style={styles.dateBox}>
                <View style={styles.dateRow}>
                  <SymbolView name="calendar" resizeMode="scaleAspectFit" style={styles.dateIcon} tintColor={HomeColors.green} />
                  <Text style={styles.dateText}>{trip.date}</Text>
                </View>
                <Text style={styles.completedTime}>{trip.time}</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <TripStat icon="shippingbox" label={trip.stopsLabel} />
              <TripStat icon="point.topleft.down.to.point.bottomright.curvepath" label={trip.distance} />
              <TripStat icon="clock" label={trip.duration} />
            </View>
            <View style={styles.completedFoot}>
              <View style={styles.completedStatus}>
                <SymbolView
                  name="checkmark.circle.fill"
                  resizeMode="scaleAspectFit"
                  style={styles.completedCheck}
                  tintColor={HomeColors.green}
                />
                <Text style={styles.completedStatusText}>All stops completed</Text>
              </View>
              <Pressable accessibilityRole="button" style={styles.completedDetails}>
                <SymbolView name="doc.text" resizeMode="scaleAspectFit" style={styles.completedDoc} tintColor={HomeColors.green} />
                <Text style={styles.completedDetailsText}>View Details</Text>
                <Text style={styles.completedChevron}>›</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
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
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: HomeColors.title,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    color: HomeColors.body,
  },
  today: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: HomeColors.greenSoft,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  todayIcon: {
    width: 16,
    height: 16,
  },
  todayText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.green,
  },
  todayChevron: {
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.green,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filter: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF1F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  filterSelected: {
    backgroundColor: HomeColors.greenDark,
  },
  filterLabel: {
    flexShrink: 1,
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: '#5E6770',
  },
  filterLabelSelected: {
    color: '#FFFFFF',
  },
  count: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: '#E1E5E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countSelected: {
    backgroundColor: '#FFFFFF',
  },
  countText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#5E6770',
  },
  countTextSelected: {
    color: HomeColors.greenDark,
  },
  card: {
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 10,
    gap: 12,
    boxShadow: '0 8px 20px rgba(27, 42, 51, 0.05)',
  },
  hero: {
    width: '100%',
    aspectRatio: HERO_ASPECT_RATIO,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  progress: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingTop: 4,
  },
  progressDone: {
    position: 'absolute',
    top: 14,
    left: '16%',
    width: '34%',
    height: 3,
    borderRadius: 2,
    backgroundColor: HomeColors.green,
  },
  progressTodo: {
    position: 'absolute',
    top: 14,
    left: '50%',
    width: '34%',
    height: 2,
    borderStyle: 'dashed',
    borderTopWidth: 2,
    borderColor: '#D5DBE0',
  },
  step: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D5DBE0',
    backgroundColor: HomeColors.card,
  },
  stepDotDone: {
    backgroundColor: HomeColors.green,
    borderColor: HomeColors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotCurrent: {
    borderColor: HomeColors.green,
    borderWidth: 3,
  },
  stepCheck: {
    width: 12,
    height: 12,
  },
  stepLabel: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.title,
    textAlign: 'center',
  },
  stepDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
    textAlign: 'center',
  },
  metrics: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 2,
  },
  metric: {
    flex: 1,
    backgroundColor: '#F4F7F8',
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 4,
  },
  metricIcon: {
    width: 16,
    height: 16,
  },
  metricLabel: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 13,
    color: HomeColors.muted,
    textAlign: 'center',
  },
  metricValue: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.title,
    textAlign: 'center',
  },
  continueButton: {
    height: 52,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: HomeColors.green,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 2,
    marginBottom: 2,
  },
  continueIcon: {
    width: 18,
    height: 18,
  },
  continueLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  continueChevron: {
    fontSize: 22,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  stopsCard: {
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 14,
    gap: 12,
    boxShadow: '0 8px 20px rgba(27, 42, 51, 0.05)',
  },
  stopsHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stopsTitle: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: HomeColors.title,
  },
  viewRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewRouteIcon: {
    width: 16,
    height: 16,
  },
  viewRouteText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: HomeColors.green,
  },
  stopList: {
    gap: 10,
  },
  stopLine: {
    position: 'absolute',
    left: 13,
    top: 18,
    bottom: 18,
    width: 2,
    backgroundColor: '#E3E8EC',
  },
  stopRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stopDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D5DBE0',
    backgroundColor: HomeColors.card,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stopDotDone: {
    backgroundColor: HomeColors.green,
    borderColor: HomeColors.green,
  },
  stopDotNext: {
    borderColor: HomeColors.green,
    borderWidth: 3,
  },
  stopCheck: {
    width: 14,
    height: 14,
  },
  stopCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HomeColors.green,
  },
  stopHollow: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D5DBE0',
  },
  stopBody: {
    flex: 1,
    backgroundColor: '#F7F9FA',
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 12,
  },
  stopTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stopCopy: {
    flex: 1,
    gap: 2,
  },
  stopKicker: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.muted,
  },
  stopTitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  stopAddress: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  stopMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusPill: {
    borderRadius: 10,
    backgroundColor: '#EEF1F3',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusDone: {
    backgroundColor: HomeColors.greenSoft,
  },
  statusNext: {
    backgroundColor: '#E7F1FF',
  },
  statusText: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: HomeColors.body,
  },
  statusTextDone: {
    color: HomeColors.green,
  },
  statusTextNext: {
    color: '#3B82F6',
  },
  stopTime: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  rowChevron: {
    fontSize: 20,
    lineHeight: 22,
    color: HomeColors.muted,
  },
  upcomingList: {
    gap: 14,
  },
  upcomingCard: {
    backgroundColor: HomeColors.card,
    borderRadius: 22,
    borderCurve: 'continuous',
    padding: 10,
    gap: 12,
    boxShadow: '0 8px 20px rgba(27, 42, 51, 0.05)',
  },
  upcomingHero: {
    width: '100%',
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  upcomingBody: {
    paddingHorizontal: 6,
    paddingBottom: 4,
    gap: 12,
  },
  upcomingHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  upcomingTitle: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: HomeColors.title,
  },
  dateBox: {
    alignItems: 'flex-end',
    backgroundColor: '#F4F7F8',
    borderRadius: 14,
    borderCurve: 'continuous',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateIcon: {
    width: 14,
    height: 14,
  },
  dateText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.title,
  },
  dateTime: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    width: 14,
    height: 14,
  },
  statLabel: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  timeline: {
    gap: 14,
    paddingTop: 2,
  },
  timelineLine: {
    position: 'absolute',
    left: 6,
    top: 16,
    bottom: 16,
    width: 1,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D5DBE0',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#C5CDD4',
    backgroundColor: HomeColors.card,
    marginTop: 3,
    zIndex: 1,
  },
  timelineDotStart: {
    backgroundColor: HomeColors.green,
    borderColor: HomeColors.green,
  },
  timelineCopy: {
    flex: 1,
    gap: 2,
  },
  timelineTitle: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: HomeColors.title,
  },
  timelineAddress: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  timelineTime: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: HomeColors.title,
    marginTop: 1,
  },
  timelineChevron: {
    fontSize: 18,
    lineHeight: 20,
    color: HomeColors.muted,
    marginTop: -1,
  },
  timelineChevronGap: {
    width: 8,
  },
  tripActions: {
    flexDirection: 'row',
    gap: 10,
  },
  detailsButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderCurve: 'continuous',
    backgroundColor: '#F2F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButton: {
    flex: 1.15,
    height: 48,
    borderRadius: 14,
    borderCurve: 'continuous',
    backgroundColor: HomeColors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 16,
    height: 16,
  },
  detailsLabel: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.title,
  },
  startLabel: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  completedTime: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    color: HomeColors.body,
  },
  completedFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  completedStatus: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completedCheck: {
    width: 16,
    height: 16,
  },
  completedStatusText: {
    flexShrink: 1,
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  completedDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F2F4F6',
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  completedDoc: {
    width: 14,
    height: 14,
  },
  completedDetailsText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.title,
  },
  completedChevron: {
    fontSize: 16,
    lineHeight: 18,
    color: HomeColors.muted,
  },
});
