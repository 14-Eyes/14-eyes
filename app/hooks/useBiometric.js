import { useState, useEffect } from 'react';
import * as LocalAuth from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BIOMETRIC_ENABLED = 'biometric_enabled';

export function useBiometrics() {

    const [isAvailable, setIsAvailable] = useState(false);
    const [biometricType, setBiometricType] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        checkAvailability();
    }, []);

    const checkAvailability = async () => {
        try{
            setIsChecking(true);

            //does user device have biometric hardware?
            const hasHardware = await LocalAuthentication.hasHardwareAsync();

            //has the user enrolled their biometrics? (face id, fingerprint)
            const isEnrolled = await LocalAuthentication.isEnrolled();

            //has the user enabled biometric login in the app settings?
            const enabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED);

            setIsAvailable(hasHardware&&isEnrolled);
            setIsEnabled(enabled === 'true');

            if (hasHardware && isEnrolled) { //if biometrics are available on the device, then get the biometric type name
                const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
                setBiometricType(getBiometricTypeName(types));
            }
        } catch (error) {
            console.error('Error checking biometric availability:', error);
            setIsAvailable(false);
        } finally {
            setIsChecking(false);
        }
    };

    const getBiometricTypeName = (types) => { //function to get the device's biometric type name
        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)){
            return 'Face ID';
        }
        if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)){
            return 'Fingerprint';
        }
        if (types.includes(LocalAuthentication.AuthenticationType.IRIS)){
            return 'Iris Scan';
        }
        return 'Biometric';
    };

    const authenticate = async () => { //function to authenticate via biometrics
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Sign in to ELTR',
                cancelLabel: 'Cancel',
                fallbackLabel: 'Use Password',
                disableDeviceFallback: false,
            });
            return result.success;
        } catch (error) {
            console.error('Biometric authentication error:', error);
            return false;
        }
    };

    const enableBiometric = async () => { //enable and disable biometric login feature
        await AsyncStorage.setItem(BIOMETRIC_ENABLED, 'true');
        setIsEnabled(true);
    };

    const disableBiometric = async () => {
        await AsyncStorage.setItem(BIOMETRIC_ENABLED, 'false');
        setIsEnabled(false);
    };

    return {
        isAvailable,
        isEnabled,
        biometricType,
        isChecking,
        checkAvailability,
        authenticate,
        enableBiometric,
        disableBiometric,
    };
}