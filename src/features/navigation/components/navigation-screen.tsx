import { AppleMaps } from 'expo-maps';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, HomeColors } from '@/constants/theme';

const CAMERA = { latitude: 32.7476, longitude: -97.341 };
const ZOOM = 13.6;

const ROUTE = [
  { latitude: 32.748916, longitude: -97.35214 },
  { latitude: 32.748838, longitude: -97.351928 },
  { latitude: 32.749392, longitude: -97.351615 },
  { latitude: 32.749961, longitude: -97.351331 },
  { latitude: 32.750322, longitude: -97.351198 },
  { latitude: 32.750372, longitude: -97.35118 },
  { latitude: 32.750428, longitude: -97.35116 },
  { latitude: 32.750601, longitude: -97.351087 },
  { latitude: 32.750692, longitude: -97.350933 },
  { latitude: 32.750859, longitude: -97.350813 },
  { latitude: 32.750921, longitude: -97.350804 },
  { latitude: 32.751006, longitude: -97.350783 },
  { latitude: 32.750988, longitude: -97.349634 },
  { latitude: 32.750978, longitude: -97.349091 },
  { latitude: 32.750976, longitude: -97.348968 },
  { latitude: 32.750972, longitude: -97.348817 },
  { latitude: 32.750967, longitude: -97.348469 },
  { latitude: 32.75096, longitude: -97.347878 },
  { latitude: 32.750945, longitude: -97.344626 },
  { latitude: 32.750988, longitude: -97.344141 },
  { latitude: 32.75099, longitude: -97.343825 },
  { latitude: 32.750995, longitude: -97.343071 },
  { latitude: 32.750997, longitude: -97.342688 },
  { latitude: 32.750998, longitude: -97.342592 },
  { latitude: 32.750999, longitude: -97.342467 },
  { latitude: 32.750999, longitude: -97.342406 },
  { latitude: 32.751, longitude: -97.34221 },
  { latitude: 32.751001, longitude: -97.342093 },
  { latitude: 32.751001, longitude: -97.34198 },
  { latitude: 32.751002, longitude: -97.34172 },
  { latitude: 32.751003, longitude: -97.34158 },
  { latitude: 32.751003, longitude: -97.34148 },
  { latitude: 32.751003, longitude: -97.341235 },
  { latitude: 32.751003, longitude: -97.34086 },
  { latitude: 32.751004, longitude: -97.340783 },
  { latitude: 32.751003, longitude: -97.340583 },
  { latitude: 32.751001, longitude: -97.340319 },
  { latitude: 32.751001, longitude: -97.34018 },
  { latitude: 32.750999, longitude: -97.33993 },
  { latitude: 32.750997, longitude: -97.339484 },
  { latitude: 32.750996, longitude: -97.339268 },
  { latitude: 32.750993, longitude: -97.338575 },
  { latitude: 32.750991, longitude: -97.338195 },
  { latitude: 32.750992, longitude: -97.337916 },
  { latitude: 32.750993, longitude: -97.33753 },
  { latitude: 32.750993, longitude: -97.337399 },
  { latitude: 32.751098, longitude: -97.337399 },
  { latitude: 32.751406, longitude: -97.337398 },
  { latitude: 32.751613, longitude: -97.337397 },
  { latitude: 32.751697, longitude: -97.3374 },
  { latitude: 32.751725, longitude: -97.337403 },
  { latitude: 32.75182, longitude: -97.337413 },
  { latitude: 32.75182, longitude: -97.337278 },
  { latitude: 32.751819, longitude: -97.337006 },
  { latitude: 32.751818, longitude: -97.336818 },
  { latitude: 32.751817, longitude: -97.336544 },
  { latitude: 32.751815, longitude: -97.336334 },
  { latitude: 32.751814, longitude: -97.336022 },
  { latitude: 32.751813, longitude: -97.335786 },
  { latitude: 32.751813, longitude: -97.335704 },
  { latitude: 32.751813, longitude: -97.335618 },
  { latitude: 32.751812, longitude: -97.335176 },
  { latitude: 32.75182, longitude: -97.335055 },
  { latitude: 32.751837, longitude: -97.334997 },
  { latitude: 32.751839, longitude: -97.334993 },
  { latitude: 32.751897, longitude: -97.334873 },
  { latitude: 32.752027, longitude: -97.334634 },
  { latitude: 32.752064, longitude: -97.334567 },
  { latitude: 32.75238, longitude: -97.333908 },
  { latitude: 32.752412, longitude: -97.333841 },
  { latitude: 32.752441, longitude: -97.333782 },
  { latitude: 32.752735, longitude: -97.333169 },
  { latitude: 32.752771, longitude: -97.333094 },
  { latitude: 32.752801, longitude: -97.333031 },
  { latitude: 32.752958, longitude: -97.332703 },
  { latitude: 32.753095, longitude: -97.332417 },
  { latitude: 32.753132, longitude: -97.332339 },
  { latitude: 32.753167, longitude: -97.332267 },
  { latitude: 32.75325, longitude: -97.332094 },
  { latitude: 32.75327, longitude: -97.332051 },
  { latitude: 32.753475, longitude: -97.331623 },
  { latitude: 32.753521, longitude: -97.331527 },
  { latitude: 32.753549, longitude: -97.331471 },
  { latitude: 32.753853, longitude: -97.330835 },
  { latitude: 32.753899, longitude: -97.33074 },
  { latitude: 32.753929, longitude: -97.330676 },
  { latitude: 32.754226, longitude: -97.330057 },
  { latitude: 32.754279, longitude: -97.329947 },
  { latitude: 32.754352, longitude: -97.329998 },
  { latitude: 32.754849, longitude: -97.330341 },
  { latitude: 32.754898, longitude: -97.330374 },
  { latitude: 32.754945, longitude: -97.330406 },
  { latitude: 32.755478, longitude: -97.330774 },
  { latitude: 32.755504, longitude: -97.330792 },
];

const VEHICLE = ROUTE[0];
const DESTINATION = ROUTE[ROUTE.length - 1];

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
            <SymbolView name="arrow.turn.up.left" resizeMode="scaleAspectFit" style={styles.turnIcon} tintColor="#FFFFFF" />
            <View style={styles.instructionCopy}>
              <Text style={styles.distance}>0.2 mi</Text>
              <Text style={styles.street}>Turn left onto Museum Way</Text>
              <View style={styles.thenRow}>
                <Text style={styles.then}>Then</Text>
                <SymbolView name="arrow.turn.up.right" resizeMode="scaleAspectFit" style={styles.thenIcon} tintColor="#C5CDD4" />
                <Text style={styles.then}>W 7th St</Text>
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

          <View style={styles.rideActions}>
            <Pressable accessibilityLabel="Back" accessibilityRole="button" onPress={() => router.back()} style={styles.backRide}>
              <SymbolView name="chevron.left" resizeMode="scaleAspectFit" style={styles.backRideIcon} tintColor={HomeColors.title} />
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.end}>
              <SymbolView name="phone.fill" resizeMode="scaleAspectFit" style={styles.endIcon} tintColor="#FFFFFF" />
              <Text style={styles.endLabel}>End Ride</Text>
            </Pressable>
          </View>
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
    alignSelf: 'flex-end',
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
  rideActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backRide: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderCurve: 'continuous',
    backgroundColor: '#F4F7F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backRideIcon: {
    width: 16,
    height: 16,
  },
  end: {
    flex: 1,
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
