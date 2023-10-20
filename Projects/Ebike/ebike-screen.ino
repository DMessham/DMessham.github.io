#include <LiquidCrystal.h>
/* Pins */
const int rs = 6, en = 8, d4 = 2, d5 = 3, d6 = 4, d7 = 5, pedalPulse = 7;

/* Variables used for calculations */
const float gearRatio = 2.2, motorMaxRpm = 470, pulsePerRot = 1, wheelDia = 660.4, wheelRoll = 4.14941557686, batteryMaxVoltage = 24, BatteryMinVoltage = 12, MotorMaxAmps=18.75;
 /* wheelRoll is used for speed calc - the distance the wheel travels between sensor pulses in meters*/
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

 
void setup()
{
  lcd.begin(16, 2);
  
  lcd.setCursor( 0, 0 );
  lcd.print("--.- kmh  --.--V");
  lcd.setCursor( 0, 1 );
  lcd.print("---.-RPM  --.--A");
} 
 
void loop()
{
/*TODO read other sensors*/
float voltage = 22.75
float motorAmps = 16.25
float motorRPM = 
/*read buttons and act on them (might be moved off the arduino)*/

/* TODO: Measure pulses on pin 7 over the last second */
float pulsePerSec

  /* calculate speed from wheel sensor - 3.6 is used to convert from m/s to kmh 
  1 rotations per second is ~ 4.14941557686m/s or ~ 14.9379 kilometers per hour, 
  this bike should top out at 16.43mph/7.34487 meters per second/26.4415 kilometers per hour under motor power ignoring any resistance or losses*/

int speed = pulsePerSec/pulsePerRot*wheelRoll*3.6;
  
  /* Update screen */
  lcd.setCursor( 0, 0 );
  lcd.print(speed + "KMH, " + voltage + "V");
  lcd.setCursor( 0, 1 );
  lcd.print(motorRPM + "RPM, " + motorAmps +"A");
  delay(2000);
}