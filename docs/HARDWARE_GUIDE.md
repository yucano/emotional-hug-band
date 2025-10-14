# Guía de Hardware - Pulsera Lumen

## Diseño del Circuito

### Diagrama de Conexiones

```
ESP32-WROOM-32
├── MAX30102 (I2C)
│   ├── SDA → GPIO 21
│   ├── SCL → GPIO 22
│   ├── VCC → 3.3V
│   └── GND → GND
│
├── MLX90614 (I2C)
│   ├── SDA → GPIO 21 (compartido)
│   ├── SCL → GPIO 22 (compartido)
│   ├── VCC → 3.3V
│   └── GND → GND
│
├── GSR Grove Sensor
│   ├── Analog Out → GPIO 34 (ADC1_CH6)
│   ├── VCC → 3.3V
│   └── GND → GND
│
├── Motor Vibrador
│   ├── (+) → GPIO 26 (PWM)
│   └── (-) → GND (con transistor NPN)
│
├── LEDs RGBY (4x LED SMD 2835)
│   ├── LED R → GPIO 25 (PWM)
│   ├── LED G → GPIO 33 (PWM)
│   ├── LED B → GPIO 32 (PWM)
│   ├── LED Y → GPIO 27 (PWM)
│   └── Resistencias 220Ω cada LED
│
└── Sistema de Alimentación
    ├── Batería 702035 500mAh (3.7V)
    ├── TP4056 (Carga USB-C)
    ├── AMS1117-3.3V (Regulador)
    └── Capacitores 10µF + 100nF
```

### Lista de Componentes

| Componente | Cantidad | Especificaciones |
|------------|----------|------------------|
| ESP32-WROOM-32 | 1 | Bluetooth BLE 5.0 |
| MAX30102 | 1 | Sensor HR + SpO2 |
| MLX90614 GY-906 | 1 | Sensor temperatura IR |
| GSR Grove Sensor | 1 | Conductancia de piel |
| Batería 702035 | 1 | 500mAh 3.7V |
| TP4056 | 1 | Módulo carga USB-C |
| AMS1117-3.3V | 1 | Regulador voltaje |
| LEDs SMD 2835 | 4 | Rojo, Verde, Azul, Amarillo |
| Motor Vibrador | 1 | 3V DC |
| Transistor 2N2222 | 1 | Para motor |
| Resistencias 220Ω | 4 | Para LEDs |
| Resistencia 1kΩ | 1 | Base transistor |
| Capacitor 10µF | 2 | Estabilización |
| Capacitor 100nF | 2 | Filtrado |

---

## Código Arduino para ESP32

### Configuración del Proyecto

**Plataforma**: Arduino IDE 2.0+ o PlatformIO  
**Placa**: ESP32 Dev Module  
**Velocidad Upload**: 115200

### Librerías Necesarias

```cpp
// Agregar en Arduino IDE: Sketch > Include Library > Manage Libraries
#include <Wire.h>                  // I2C (incluida)
#include <BLEDevice.h>             // Bluetooth (incluida)
#include <BLEServer.h>             // Bluetooth (incluida)
#include <BLEUtils.h>              // Bluetooth (incluida)
#include <BLE2902.h>               // Bluetooth (incluida)
#include "MAX30105.h"              // SparkFun MAX3010x
#include "heartRate.h"             // SparkFun MAX3010x
#include <Adafruit_MLX90614.h>     // Adafruit MLX90614
```

### Código Principal

```cpp
#include <Wire.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <Adafruit_MLX90614.h>

// UUIDs del Servicio BLE (deben coincidir con la app web)
#define SERVICE_UUID        "12345678-1234-1234-1234-123456789012"
#define HR_CHAR_UUID        "12345678-1234-1234-1234-123456789013"
#define HRV_CHAR_UUID       "12345678-1234-1234-1234-123456789014"
#define TEMP_CHAR_UUID      "12345678-1234-1234-1234-123456789015"
#define GSR_CHAR_UUID       "12345678-1234-1234-1234-123456789016"

// Pines
#define GSR_PIN 34
#define MOTOR_PIN 26
#define LED_R 25
#define LED_G 33
#define LED_B 32
#define LED_Y 27

// Objetos de sensores
MAX30105 particleSensor;
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

// Variables BLE
BLEServer* pServer = NULL;
BLECharacteristic* pHRCharacteristic = NULL;
BLECharacteristic* pHRVCharacteristic = NULL;
BLECharacteristic* pTempCharacteristic = NULL;
BLECharacteristic* pGSRCharacteristic = NULL;
bool deviceConnected = false;

// Variables de medición
const byte RATE_SIZE = 4;
byte rates[RATE_SIZE];
byte rateSpot = 0;
long lastBeat = 0;
float beatsPerMinute;
int beatAvg;
unsigned long lastHRVCalc = 0;
int hrvValue = 0;

// Callback de conexión BLE
class ServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
        deviceConnected = true;
        digitalWrite(LED_B, HIGH); // LED azul = conectado
    };
    void onDisconnect(BLEServer* pServer) {
        deviceConnected = false;
        digitalWrite(LED_B, LOW);
        BLEDevice::startAdvertising(); // Reiniciar advertising
    }
};

void setup() {
    Serial.begin(115200);
    Serial.println("Iniciando Pulsera Lumen...");

    // Configurar pines
    pinMode(GSR_PIN, INPUT);
    pinMode(MOTOR_PIN, OUTPUT);
    pinMode(LED_R, OUTPUT);
    pinMode(LED_G, OUTPUT);
    pinMode(LED_B, OUTPUT);
    pinMode(LED_Y, OUTPUT);

    // Test de LEDs
    digitalWrite(LED_R, HIGH); delay(200); digitalWrite(LED_R, LOW);
    digitalWrite(LED_G, HIGH); delay(200); digitalWrite(LED_G, LOW);
    digitalWrite(LED_B, HIGH); delay(200); digitalWrite(LED_B, LOW);
    digitalWrite(LED_Y, HIGH); delay(200); digitalWrite(LED_Y, LOW);

    // Inicializar I2C
    Wire.begin(21, 22);

    // Inicializar MAX30102
    if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
        Serial.println("MAX30102 no encontrado");
        while (1) { digitalWrite(LED_R, !digitalRead(LED_R)); delay(500); }
    }
    particleSensor.setup();
    particleSensor.setPulseAmplitudeRed(0x0A);
    particleSensor.setPulseAmplitudeGreen(0);

    // Inicializar MLX90614
    if (!mlx.begin()) {
        Serial.println("MLX90614 no encontrado");
        while (1) { digitalWrite(LED_R, !digitalRead(LED_R)); delay(500); }
    }

    // Inicializar BLE
    BLEDevice::init("Lumen Bracelet");
    pServer = BLEDevice::createServer();
    pServer->setCallbacks(new ServerCallbacks());

    BLEService *pService = pServer->createService(SERVICE_UUID);

    // Crear características
    pHRCharacteristic = pService->createCharacteristic(
        HR_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
    );
    pHRCharacteristic->addDescriptor(new BLE2902());

    pHRVCharacteristic = pService->createCharacteristic(
        HRV_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
    );
    pHRVCharacteristic->addDescriptor(new BLE2902());

    pTempCharacteristic = pService->createCharacteristic(
        TEMP_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
    );
    pTempCharacteristic->addDescriptor(new BLE2902());

    pGSRCharacteristic = pService->createCharacteristic(
        GSR_CHAR_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
    );
    pGSRCharacteristic->addDescriptor(new BLE2902());

    pService->start();

    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();

    Serial.println("Lumen BLE activo. Esperando conexión...");
    digitalWrite(LED_G, HIGH); // LED verde = listo
}

void loop() {
    if (deviceConnected) {
        // Leer MAX30102 (HR)
        long irValue = particleSensor.getIR();
        
        if (checkForBeat(irValue) == true) {
            long delta = millis() - lastBeat;
            lastBeat = millis();
            
            beatsPerMinute = 60 / (delta / 1000.0);
            
            if (beatsPerMinute < 255 && beatsPerMinute > 20) {
                rates[rateSpot++] = (byte)beatsPerMinute;
                rateSpot %= RATE_SIZE;
                
                beatAvg = 0;
                for (byte x = 0; x < RATE_SIZE; x++)
                    beatAvg += rates[x];
                beatAvg /= RATE_SIZE;
                
                // Enviar HR por BLE
                pHRCharacteristic->setValue((uint8_t*)&beatAvg, 1);
                pHRCharacteristic->notify();
                
                digitalWrite(LED_Y, HIGH); // Pulso de LED
                delay(50);
                digitalWrite(LED_Y, LOW);
            }
        }

        // Calcular HRV cada 5 segundos
        if (millis() - lastHRVCalc > 5000) {
            hrvValue = random(30, 100); // Simplificado, implementar RMSSD real
            pHRVCharacteristic->setValue((uint8_t*)&hrvValue, 1);
            pHRVCharacteristic->notify();
            lastHRVCalc = millis();
        }

        // Leer MLX90614 (Temperatura)
        float temp = mlx.readObjectTempC();
        int tempInt = (int)(temp * 10); // Enviar como entero (ej: 36.5 = 365)
        pTempCharacteristic->setValue((uint8_t*)&tempInt, 2);
        pTempCharacteristic->notify();

        // Leer GSR
        int gsrRaw = analogRead(GSR_PIN);
        int gsrValue = map(gsrRaw, 0, 4095, 0, 100);
        pGSRCharacteristic->setValue((uint8_t*)&gsrValue, 1);
        pGSRCharacteristic->notify();

        Serial.printf("HR:%d HRV:%d Temp:%.1f GSR:%d\n", 
            beatAvg, hrvValue, temp, gsrValue);
    }

    delay(100); // Actualizar cada 100ms
}
```

---

## Optimización de Energía

### Configuración de Bajo Consumo

```cpp
// Agregar en setup()
esp_sleep_enable_timer_wakeup(1000000); // 1 segundo
particleSensor.setPulseAmplitudeRed(0x05); // Reducir intensidad LED

// En loop(), cuando no hay conexión:
if (!deviceConnected) {
    esp_light_sleep_start(); // Dormir ESP32
}
```

### Estimación de Autonomía

- **Modo activo continuo**: ~8 horas
- **Modo bajo consumo** (lectura cada 30s): ~20 horas

---

## Montaje y Ensamblaje

### PCB Recomendado
- **Tamaño**: 30mm x 40mm máximo
- **Diseño**: 2 capas
- **Software**: EasyEDA, KiCad o Fritzing

### Tips de Soldadura
1. Soldar primero los componentes SMD más pequeños
2. Usar flux para los LEDs SMD
3. Verificar continuidad con multímetro
4. Proteger circuito con barniz acrílico

### Carcasa
- **Material**: Resina flexible (TPU) impresa en 3D
- **Dimensiones**: 45mm x 35mm x 12mm
- **Sello**: O-ring para resistencia al agua (IP54)

---

## Calibración

### MAX30102
```cpp
particleSensor.setup(60, 4, 2, 100, 411, 4096);
// brightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange
```

### GSR
Calibrar con valores conocidos:
- **Reposo**: 200-400 (bajo estrés)
- **Activo**: 600-900 (estrés moderado)
- **Alta ansiedad**: >1000

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| MAX30102 no responde | Verificar VCC = 3.3V, revisar soldadura I2C |
| Lecturas erráticas HR | Ajustar presión del sensor, limpiar lente |
| BLE no conecta | Verificar nombre "Lumen Bracelet", reiniciar ESP32 |
| Batería dura poco | Reducir brillo LEDs, implementar deep sleep |
| GSR siempre en 0 | Verificar contacto de electrodos con piel |

---

## Próximos Pasos

1. ✅ Comprar componentes
2. ⚙️ Diseñar PCB en EasyEDA
3. 🔧 Soldar prototipo en protoboard
4. 💻 Cargar código y probar sensores
5. 📱 Conectar con app web
6. 🏗️ Diseñar carcasa 3D
7. 🚀 Ensamblaje final

---

**Última actualización**: Diciembre 2025  
**Versión**: 1.0
