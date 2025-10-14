import { useState, useEffect, useCallback } from 'react';
import { bluetoothService, BiometricReading } from '@/services/bluetoothService';
import { toast } from 'sonner';

export const useBluetoothConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState<string>('');
  const [isSupported, setIsSupported] = useState(false);
  const [currentReading, setCurrentReading] = useState<BiometricReading | null>(null);

  useEffect(() => {
    setIsSupported(bluetoothService.isSupported());
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = bluetoothService.onReading((reading: BiometricReading) => {
      setCurrentReading(reading);
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const connect = useCallback(async () => {
    if (!isSupported) {
      toast.error('Bluetooth no soportado', {
        description: 'Tu navegador no soporta Web Bluetooth API. Usa Chrome, Edge o Opera.'
      });
      return;
    }

    try {
      toast.loading('Conectando con pulsera Lumen...', { id: 'bluetooth-connect' });
      
      const device = await bluetoothService.requestDevice();
      
      setIsConnected(true);
      setDeviceName(device.name);
      
      toast.success('Pulsera conectada', {
        id: 'bluetooth-connect',
        description: `Conectado a ${device.name}`
      });
    } catch (error: any) {
      console.error('Error al conectar:', error);
      
      if (error.message.includes('User cancelled')) {
        toast.dismiss('bluetooth-connect');
      } else {
        toast.error('Error de conexión', {
          id: 'bluetooth-connect',
          description: error.message || 'No se pudo conectar con el dispositivo'
        });
      }
    }
  }, [isSupported]);

  const disconnect = useCallback(async () => {
    try {
      await bluetoothService.disconnect();
      setIsConnected(false);
      setDeviceName('');
      setCurrentReading(null);
      
      toast.info('Pulsera desconectada', {
        description: 'La conexión con la pulsera ha sido cerrada'
      });
    } catch (error: any) {
      console.error('Error al desconectar:', error);
      toast.error('Error al desconectar', {
        description: error.message || 'Error desconocido'
      });
    }
  }, []);

  return {
    isConnected,
    deviceName,
    isSupported,
    currentReading,
    connect,
    disconnect
  };
};
