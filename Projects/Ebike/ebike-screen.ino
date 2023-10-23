#include <LiquidCrystal.h>
/* Pins */
const int rs = 3, en = 8, d4 = 4, d5 = 5, d6 = 6, d7 = 7, pedalPulse = 13;

/* Variables used for calculations */
const float gearRatio = 2.2, motorMaxRpm = 470, pulsePerRot = 1, wheelDia = 660.4, wheelRoll = 4.14941557686, batteryMaxVoltage = 24, BatteryMinVoltage = 12, MotorMaxAmps=18.75;
 /* wheelRoll is used for speed calc - the distance the wheel travels between sensor pulses*/
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

 
void setup()
{
  lcd.begin(16, 2);
  
  lcd.setCursor( 0, 0 );
  lcd.print("--.- kmh");
  delay(2000);
  lcd.setCursor( 0, 1 );
  lcd.print("batt: ---%");
  delay(2000);
} 
 
void loop()
{

/* TODO: Measure pulses on pin 6 over the last second */
int PulsePerSec

  /* calculate speed from wheel sensor - 0.6 is used to convert m/s to kmh*/

int speed = PulsePerSec/pulsePerRot*wheelRoll*0.6;
  
  /* Update screen */
  lcd.setCursor( 0, 0 );
  lcd.print(Speed+"kmh");
  lcd.setCursor( 0, 1 );
  lcd.print("batt: ---%");
  delay(2000);
}