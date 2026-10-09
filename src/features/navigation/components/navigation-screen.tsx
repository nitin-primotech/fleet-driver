import { AppleMaps } from 'expo-maps';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

const CAMERA = { latitude: 32.7462, longitude: -97.346 };
const ZOOM = 13.8;

const VEHICLE = { latitude: 32.7488, longitude: -97.3522 };
const DESTINATION = { latitude: 32.7555, longitude: -97.3308 };

const ROUTE = [
  VEHICLE,
  { latitude: 32.7505, longitude: -97.348 },
  { latitude: 32.752, longitude: -97.3435 },
  { latitude: 32.7532, longitude: -97.3388 },
  { latitude: 32.7544, longitude: -97.3345 },
  DESTINATION,
];

const METRICS: { icon: SFSymbol; label: string; value: string }[] = [
  { icon: 'mappin', label: 'Distance remaining', value: '1.7 mi' },
  { icon: 'clock', label: 'ETA', value: '6 min' },
  { icon: 'point.topleft.down.to.point.bottomright.curvepath', label: 'Trip progress', value: '65%' },
];

export function NavigationScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<AppleMaps.MapView>(null);
  const [mapType, setMapType] = useState<AppleMaps.MapType>(AppleMaps.MapType.STANDARD);

  function recenter() {
    mapRef.current?.setCameraPosition({ coordinates: CAMERA, zoom: ZOOM });
  }

  function toggleMapType() {
    setMapType((current) => (current === AppleMaps.MapType.STANDARD ? AppleMaps.MapType.HYBRID : AppleMaps.MapType.STANDARD));
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      {Platform.OS === 'ios' ? (
        <AppleMaps.View
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          cameraPosition={{ coordinates: CAMERA, zoom: ZOOM }}
          colorScheme={AppleMaps.MapColorScheme.LIGHT}
          properties={{ mapType, isMyLocationEnabled: false, selectionEnabled: false }}
          uiSettings={{ compassEnabled: false, myLocationButtonEnabled: false, scaleBarEnabled: false }}
          polylines={[
            {
              id: 'route',
              color: '#1A73E8',
              width: 7,
              contourStyle: AppleMaps.ContourStyle.GEODESIC,
              coordinates: ROUTE,
            },
          ]}
          circles={[
            {
              id: 'vehicle-halo',
              center: VEHICLE,
              radius: 90,
              color: 'rgba(26, 115, 232, 0.22)',
              lineColor: 'rgba(26, 115, 232, 0.45)',
              lineWidth: 2,
            },
          ]}
          markers={[
            {
              id: 'vehicle',
              coordinates: VEHICLE,
              systemImage: 'car.fill',
              tintColor: '#1B2A33',
            },
            {
              id: 'destination',
              coordinates: DESTINATION,
              systemImage: 'mappin',
              tintColor: '#1B2A33',
              title: 'Fort Worth Hub',
            },
          ]}
        />
      ) : (
        <View style={styles.mapFallback} />
      )}

      <View pointerEvents="box-none" style={styles.overlay}>
        <View pointerEvents="box-none" style={[styles.top, { paddingTop: insets.top + 8 }]}>
          <View style={styles.instruction}>
            <SymbolView name="arrow.turn.up.right" resizeMode="scaleAspectFit" style={styles.turnIcon} tintColor="#FFFFFF" />
            <View style={styles.instructionCopy}>
              <Text style={styles.distance}>0.4 mi</Text>
              <Text style={styles.street}>Turn right onto Commerce St</Text>
              <View style={styles.thenRow}>
                <Text style={styles.then}>Then</Text>
                <SymbolView name="arrow.turn.up.right" resizeMode="scaleAspectFit" style={styles.thenIcon} tintColor="#C5CDD4" />
                <Text style={styles.then}>0.2 mi</Text>
              </View>
            </View>
          </View>
          <View style={styles.ridePill}>
            <View style={styles.rideDot} />
            <Text style={styles.rideText}>On Ride</Text>
          </View>
        </View>

        <View pointerEvents="box-none" style={styles.controls}>
          <MapButton icon="location" label="Recenter map" onPress={recenter} />
          <MapButton icon="square.3.layers.3d" label="Change map type" onPress={toggleMapType} />
        </View>

        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={styles.destination}>
            <View style={styles.destIcon}>
              <SymbolView name="person.fill" resizeMode="scaleAspectFit" style={styles.destGlyph} tintColor="#FFFFFF" />
            </View>
            <View style={styles.destCopy}>
              <Text style={styles.ridingTo}>Riding to</Text>
              <Text style={styles.destTitle}>Fort Worth Hub</Text>
              <Text style={styles.destAddress}>500 Main St, Fort Worth, TX</Text>
            </View>
            <View style={styles.sheetRide}>
              <View style={styles.rideDot} />
              <Text style={styles.sheetRideText}>On Ride</Text>
            </View>
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

          <Pressable accessibilityRole="button" onPress={recenter} style={styles.live}>
            <SymbolView name="location.fill" resizeMode="scaleAspectFit" style={styles.liveIcon} tintColor={HomeColors.green} />
            <View style={styles.liveCopy}>
              <Text style={styles.liveTitle}>Live navigation</Text>
              <Text style={styles.liveDetail}>Follow the route to reach the destination</Text>
            </View>
            <SymbolView name="chevron.right" resizeMode="scaleAspectFit" style={styles.liveChevron} tintColor={HomeColors.muted} />
          </Pressable>

          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.end}>
            <SymbolView name="phone.fill" resizeMode="scaleAspectFit" style={styles.endIcon} tintColor="#FFFFFF" />
            <Text style={styles.endLabel}>End Ride</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function MapButton({ icon, label, onPress }: { icon: SFSymbol; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityLabel={label} accessibilityRole="button" onPress={onPress} style={styles.mapButton}>
      <SymbolView name={icon} resizeMode="scaleAspectFit" style={styles.mapButtonIcon} tintColor={HomeColors.title} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E7EEF2',
  },
  mapFallback: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#E7EEF2',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top: {
    paddingHorizontal: 16,
    gap: 10,
    alignItems: 'flex-end',
  },
  instruction: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1C2833',
    borderRadius: 22,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  turnIcon: {
    width: 28,
    height: 28,
  },
  instructionCopy: {
    flex: 1,
    gap: 2,
  },
  distance: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  street: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  thenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  then: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 17,
    color: '#C5CDD4',
  },
  thenIcon: {
    width: 12,
    height: 12,
  },
  ridePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.12)',
  },
  rideDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HomeColors.green,
  },
  rideText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.title,
  },
  controls: {
    position: 'absolute',
    right: 16,
    top: '42%',
    gap: 10,
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 16px rgba(27, 42, 51, 0.12)',
  },
  mapButtonIcon: {
    width: 20,
    height: 20,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
    boxShadow: '0 -8px 24px rgba(27, 42, 51, 0.08)',
  },
  destination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  destIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: HomeColors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destGlyph: {
    width: 18,
    height: 18,
  },
  destCopy: {
    flex: 1,
    gap: 1,
  },
  ridingTo: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  destTitle: {
    fontFamily: Fonts.sans,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    color: HomeColors.title,
  },
  destAddress: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  sheetRide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sheetRideText: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700',
    color: HomeColors.green,
  },
  metrics: {
    flexDirection: 'row',
    backgroundColor: '#F4F7F8',
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  metricIcon: {
    width: 16,
    height: 16,
  },
  metricLabel: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    lineHeight: 14,
    color: HomeColors.body,
    textAlign: 'center',
  },
  metricValue: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '700',
    color: HomeColors.title,
    textAlign: 'center',
  },
  live: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F4F7F8',
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  liveIcon: {
    width: 16,
    height: 16,
  },
  liveCopy: {
    flex: 1,
    gap: 1,
  },
  liveTitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: HomeColors.title,
  },
  liveDetail: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: HomeColors.body,
  },
  liveChevron: {
    width: 12,
    height: 12,
  },
  end: {
    height: 52,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: HomeColors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  endIcon: {
    width: 16,
    height: 16,
  },
  endLabel: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
