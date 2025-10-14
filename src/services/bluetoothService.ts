// Web Bluetooth API Service para conexión real con pulsera Lumen
export interface BluetoothDevice {
  name: string;
  id: string;
  connected: boolean;
}

export interface BiometricReading {
  heartRate: number;
  hrv: number;
  temperature: number;
  gsr: number;
  stress: number;
  timestamp: Date;
}

// UUIDs de servicio para el dispositivo Lumen (ajustar según especificaciones del hardware)
const LUMEN_SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb'; // Heart Rate Service
const HR_CHARACTERISTIC_UUID = '00002a37-0000-1000-8000-00805f9b34fb'; // Heart Rate Measurement
const HRV_CHARACTERISTIC_UUID = '0000180f-0000-1000-8000-00805f9b34fb'; // Custom HRV
const TEMP_CHARACTERISTIC_UUID = '00001809-0000-1000-8000-00805f9b34fb'; // Temperature
const GSR_CHARACTERISTIC_UUID = '0000181a-0000-1000-8000-00805f9b34fb'; // Custom GSR

class BluetoothService {
  private device: BluetoothDevice | null = null;
  private bluetoothDevice: any = null;
  private server: any = null;
  private characteristics: Map<string, any> = new Map();
  private listeners: Array<(data: BiometricReading) => void> = [];

  /**
   * Verifica si Web Bluetooth API está disponible
   */
  isSupported(): boolean {
    return 'bluetooth' in navigator;
  }

  /**
   * Solicita y conecta con un dispositivo Bluetooth
   */
  async requestDevice(): Promise<BluetoothDevice> {
    if (!this.isSupported()) {
      throw new Error('Web Bluetooth API no soportada en este navegador');
    }

    try {
      // Solicitar dispositivo
      this.bluetoothDevice = await (navigator as any).bluetooth.requestDevice({
        filters: [
          { name: 'Lumen' },
          { namePrefix: 'Lumen' },
          { services: [LUMEN_SERVICE_UUID] }
        ],
        optionalServices: [
          LUMEN_SERVICE_UUID,
          HRV_CHARACTERISTIC_UUID,
          TEMP_CHARACTERISTIC_UUID,
          GSR_CHARACTERISTIC_UUID
        ]
      });

      // Conectar al servidor GATT
      this.server = await this.bluetoothDevice.gatt.connect();

      // Crear objeto de dispositivo
      this.device = {
        name: this.bluetoothDevice.name || 'Pulsera Lumen',
        id: this.bluetoothDevice.id,
        connected: true
      };

      // Configurar características
      await this.setupCharacteristics();

      // Manejar desconexión
      this.bluetoothDevice.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));

      return this.device;
    } catch (error) {
      console.error('Error al conectar con el dispositivo:', error);
      throw new Error('No se pudo conectar con el dispositivo Bluetooth');
    }
  }

  /**
   * Configura las características BLE para lectura
   */
  private async setupCharacteristics(): Promise<void> {
    try {
      // Obtener servicio principal
      const service = await this.server.getPrimaryService(LUMEN_SERVICE_UUID);

      // Configurar característica de frecuencia cardíaca
      const hrCharacteristic = await service.getCharacteristic(HR_CHARACTERISTIC_UUID);
      await hrCharacteristic.startNotifications();
      hrCharacteristic.addEventListener('characteristicvaluechanged', this.handleHeartRateChange.bind(this));
      this.characteristics.set('hr', hrCharacteristic);

      // Configurar otras características si están disponibles
      try {
        const hrvCharacteristic = await service.getCharacteristic(HRV_CHARACTERISTIC_UUID);
        await hrvCharacteristic.startNotifications();
        hrvCharacteristic.addEventListener('characteristicvaluechanged', this.handleHRVChange.bind(this));
        this.characteristics.set('hrv', hrvCharacteristic);
      } catch (e) {
        console.warn('HRV characteristic no disponible');
      }

      // Temperatura
      try {
        const tempCharacteristic = await service.getCharacteristic(TEMP_CHARACTERISTIC_UUID);
        await tempCharacteristic.startNotifications();
        tempCharacteristic.addEventListener('characteristicvaluechanged', this.handleTempChange.bind(this));
        this.characteristics.set('temp', tempCharacteristic);
      } catch (e) {
        console.warn('Temperature characteristic no disponible');
      }

      // GSR
      try {
        const gsrCharacteristic = await service.getCharacteristic(GSR_CHARACTERISTIC_UUID);
        await gsrCharacteristic.startNotifications();
        gsrCharacteristic.addEventListener('characteristicvaluechanged', this.handleGSRChange.bind(this));
        this.characteristics.set('gsr', gsrCharacteristic);
      } catch (e) {
        console.warn('GSR characteristic no disponible');
      }

    } catch (error) {
      console.error('Error configurando características:', error);
    }
  }

  /**
   * Manejadores de cambios en características
   */
  private currentReading: Partial<BiometricReading> = {};

  private handleHeartRateChange(event: any): void {
    const value = event.target.value;
    const hr = value.getUint8(1);
    this.currentReading.heartRate = hr;
    this.emitReading();
  }

  private handleHRVChange(event: any): void {
    const value = event.target.value;
    const hrv = value.getUint16(0, true);
    this.currentReading.hrv = hrv;
    this.emitReading();
  }

  private handleTempChange(event: any): void {
    const value = event.target.value;
    const temp = value.getFloat32(0, true);
    this.currentReading.temperature = temp;
    this.emitReading();
  }

  private handleGSRChange(event: any): void {
    const value = event.target.value;
    const gsr = value.getFloat32(0, true);
    this.currentReading.gsr = gsr;
    this.emitReading();
  }

  /**
   * Emite lectura completa cuando todos los valores están disponibles
   */
  private emitReading(): void {
    if (
      this.currentReading.heartRate !== undefined &&
      this.currentReading.hrv !== undefined &&
      this.currentReading.temperature !== undefined &&
      this.currentReading.gsr !== undefined
    ) {
      const reading: BiometricReading = {
        heartRate: this.currentReading.heartRate,
        hrv: this.currentReading.hrv,
        temperature: this.currentReading.temperature,
        gsr: this.currentReading.gsr,
        stress: this.calculateStress(this.currentReading as BiometricReading),
        timestamp: new Date()
      };

      this.listeners.forEach(listener => listener(reading));
    }
  }

  /**
   * Calcula nivel de estrés basado en múltiples parámetros
   */
  private calculateStress(reading: BiometricReading): number {
    // Algoritmo simplificado de cálculo de estrés
    let stress = 50; // Base

    // HR elevada aumenta estrés
    if (reading.heartRate > 100) stress += 10;
    if (reading.heartRate > 120) stress += 10;

    // HRV baja aumenta estrés
    if (reading.hrv < 30) stress += 15;
    if (reading.hrv < 20) stress += 10;

    // GSR alta aumenta estrés
    if (reading.gsr > 5) stress += 10;
    if (reading.gsr > 8) stress += 5;

    // Temperatura elevada puede indicar estrés
    if (reading.temperature > 37.2) stress += 5;

    return Math.min(100, Math.max(0, stress));
  }

  /**
   * Suscribirse a lecturas biométricas
   */
  onReading(callback: (data: BiometricReading) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Desconectar dispositivo
   */
  async disconnect(): Promise<void> {
    if (this.bluetoothDevice && this.bluetoothDevice.gatt.connected) {
      await this.bluetoothDevice.gatt.disconnect();
    }
    this.device = null;
    this.server = null;
    this.characteristics.clear();
    this.listeners = [];
  }

  /**
   * Manejador de desconexión
   */
  private onDisconnected(): void {
    console.log('Dispositivo desconectado');
    if (this.device) {
      this.device.connected = false;
    }
  }

  /**
   * Obtener dispositivo actual
   */
  getDevice(): BluetoothDevice | null {
    return this.device;
  }

  /**
   * Verificar si está conectado
   */
  isConnected(): boolean {
    return this.device?.connected ?? false;
  }
}

export const bluetoothService = new BluetoothService();
